// Enums para status e fases do pomodoro
export type TimerStatus = "IDLE" | "RUNNING" | "PAUSED";
export type TimerPhase = "POMODORO" | "SHORT_BREAK" | "LONG_BREAK";

// Tipagem para timer global
export interface TimerContextType {
  timeLeft: number;
  status: TimerStatus;
  phase: TimerPhase;
  pomodoroCount: number;
  progress: number;
  formattedTime: string;

  // Funções para os botões
  startTimer: () => void;
  pauseTimer: () => void;
  skipTimer: () => void;
  resetTimer: () => void;
}
