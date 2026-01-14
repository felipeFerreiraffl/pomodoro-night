export interface PomodoroSession {
  id: string;
  taskId: string | null;
  date: string;
  startTime: string;
  endTime: string;
  completedAt: string;
  duration: number;
  phase: "POMODORO" | "SHORT_BREAK" | "LONG_BREAK";
  periodOfDay: "morning" | "afternoon" | "night";
  dayOfWeek: number;
}

export interface DailyStats {
  date: string;
  completedPomodoros: number;
  focusTime: number;
  tasksCompleted: number;
  sessions: PomodoroSession[];
}

export interface StatsHistory {
  sessions: PomodoroSession[];
  dailyStats: Record<string, DailyStats>;
  lastUpdated: string;
}

export interface PeriodStats {
  morning: { count: number; percentage: number };
  afternoon: { count: number; percentage: number };
  night: { count: number; percentage: number };
}

export interface StatsContextType {
  sessions: PomodoroSession[];
  totalPomodoros: number;
  totalTasksCompleted: number;
  totalFocusTime: string;
  currentStreak: number;
  longestStreak: number;
  todayPomodoros: number;
  yesterdayPomodoros: number;
  todayComparison: number;
  weekStats: DailyStats[];
  periodStats: PeriodStats;
  mostProductiveDay: { day: string; avgPomodoros: number };
  leastProductiveDay: { day: string; avgPomodoros: number };

  getStatsForDate: (date: string) => DailyStats | null;
  getStatsForRange: (startTime: string, endTime: string) => DailyStats[];
}
