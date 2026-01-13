import type {
  DailyStats,
  PomodoroSession,
  StatsContextType,
} from "@/types/stats.types";
import { createContext, useContext, type ReactNode } from "react";
import { useTasks } from "./taskContext";
import { formatDuration } from "date-fns";
import { getDateKey } from "@/utils/helpers";

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const StatsProvider = ({ children }: { children: ReactNode }) => {
  const { tasks } = useTasks();

  const sessions: PomodoroSession[] = [];

  const getStatsForDate = (date: string): DailyStats | null => {
    const sessionsOfDay = sessions.filter((s) => s.date === date);

    if (sessionsOfDay.length === 0) return null;

    const completedPomodoros = sessionsOfDay.filter(
      (s) => s.phase === "POMODORO"
    ).length;

    const focusTime = sessionsOfDay
      .filter((s) => s.phase === "POMODORO")
      .reduce((acc, s) => acc + s.duration, 0);

    const tasksCompleted = tasks.filter(
      (t) => t.completedAt && getDateKey(t.completedAt) === date
    ).length;

    return {
      date,
      completedPomodoros,
      focusTime,
      tasksCompleted,
      sessions: sessionsOfDay,
    };
  };

  const getStatsForRange = (
    startTime: string,
    endTime: string
  ): DailyStats[] => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const stats: DailyStats[] = [];

    for (let i = new Date(start); i <= end; i.setDate(i.getDate() + 1)) {
      const dateKey = getDateKey(i);
      const dayStats = getStatsForDate(dateKey);

      stats.push(
        dayStats || {
          date: dateKey,
          completedPomodoros: 0,
          focusTime: 0,
          tasksCompleted: 0,
          sessions: [],
        }
      );
    }

    return stats;
  };

  const totalPomodoros = sessions.filter((s) => s.phase === "POMODORO").length;
  const totalTasksCompleted = tasks.filter((t) => t.completed).length;
  const focusTime = sessions
    .filter((s) => s.phase === "POMODORO")
    .reduce((acc, s) => acc + s.duration, 0);

  const hours = Math.floor(focusTime / 3600);
  const minutes = Math.floor((focusTime % 3600) / 3600);
  const totalFocusTime = formatDuration({
    hours,
    minutes,
  });

  const calculateStreak = (sessions: PomodoroSession[]) => {
    const dates = [
      ...new Set(
        sessions.filter((s) => s.phase === "POMODORO").map((s) => s.date)
      ),
    ].sort();

    if (dates.length === 0) {
      return { current: 0, longest: 0 };
    }

    const today = getDateKey();
    const yesterday = getDateKey(new Date(Date.now() - 86400000));

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 1;

    if (dates.includes(today) || dates.includes(yesterday)) {
      for (let i = dates.length - 1; i >= 0; i--) {
        const currentDate = new Date(dates[i]);
        const previousDate = i > 0 ? new Date(dates[i - 1]) : null;

        if (i === dates.length - 1) {
          currentStreak = 1;
        } else if (previousDate) {
          const diffMs = currentDate.getTime() - previousDate.getTime();
          const diffDays = Math.floor(diffMs / 86400000);

          if (diffDays === 1) {
            currentStreak++;
          } else {
            break;
          }
        }
      }
    }

    for (let i = 1; i < dates.length; i++) {
      const currentDate = new Date(dates[i]);
      const previousDate = new Date(dates[i - 1]);

      const diffMs = currentDate.getTime() - previousDate.getTime();
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffDays === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
    }

    // Considera o primeiro dia ao menos
    longestStreak = Math.max(longestStreak, 1);

    return {
      current: currentStreak,
      longest: Math.max(longestStreak, currentStreak),
    };
  };

  const { current, longest } = calculateStreak(sessions);

  const mostProductivePeriod = () => {
    const periods = sessions
      .filter((s) => s.phase === "POMODORO")
      .reduce((acc, s) => {
        acc[s.periodOfDay] = (acc[s.periodOfDay] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(periods).sort(([, a], [, b]) => b - a)[0][0];
  };

  const value: Partial<StatsContextType> = {
    totalPomodoros,
    totalTasksCompleted,
    totalFocusTime,
    currentStreak: current,
    longestStreak: longest,
    mostProductivePeriod,
  };

  return (
    <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
  );
};

export const useStats = () => {
  const context = useContext(StatsContext);

  if (!context) {
    throw new Error("useStats deve ser utilizado dentro de StatsProvider");
  }

  return context;
};
