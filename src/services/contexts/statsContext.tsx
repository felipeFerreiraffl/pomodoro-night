import type { PomodoroSession, StatsContextType } from "@/types/stats.types";
import { createContext, useContext, type ReactNode } from "react";
import { useTasks } from "./taskContext";

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const StatsProvider = ({ children }: { children: ReactNode }) => {
  const { tasks } = useTasks();

  const sessions: PomodoroSession[] = [];

  const totalPomodoros = sessions.filter((s) => s.phase === "POMODORO").length;
  const totalTasksCompleted = tasks.filter((t) => t.completed).length;
  const focusTime = sessions
    .filter((s) => s.phase === "POMODORO")
    .reduce((acc, s) => acc + s.duration, 0);

  const value: Partial<StatsContextType> = {
    totalPomodoros,
    totalTasksCompleted,
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
