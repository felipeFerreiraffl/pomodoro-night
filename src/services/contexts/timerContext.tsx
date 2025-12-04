import type {
  TimerContextType,
  TimerPhase,
  TimerStatus,
} from "@/types/timer.types";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* eslint-disable react-refresh/only-export-components */
const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const WORK_TIME = 25 * 60;
  const SHORT_BREAK_TIME = 5 * 60;
  const LONG_BREAK_TIME = 15 * 60;
  const POMODOROS_FOR_LONG_BREAK = 4;

  const [timeLeft, setTimeLeft] = useState<number>(WORK_TIME);
  const [status, setStatus] = useState<TimerStatus>("IDLE");
  const [phase, setPhase] = useState<TimerPhase>("POMODORO");
  const [pomodoroCount, setPomodoroCount] = useState<number>(0);

  const timerRef = useRef<number | null>(null);

  // Refs para drift do timeout
  const startTimeRef = useRef<number | null>(null);
  const expectedTimeRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Gera um tempo para o intervalo correto
  const getTotalTime = (): number => {
    switch (phase) {
      case "POMODORO":
        return WORK_TIME;
      case "SHORT_BREAK":
        return SHORT_BREAK_TIME;
      case "LONG_BREAK":
        return LONG_BREAK_TIME;
    }
  };

  // Progresso total (%)
  const progress = (timeLeft / getTotalTime()) * 100;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const handleTimerCompleted = () => {
    setStatus("IDLE");

    if (phase === "POMODORO") {
      const cycleCount = pomodoroCount + 1;
      setPomodoroCount(cycleCount);

      // Decide qual pausa vêm a seguir
      if (cycleCount % POMODOROS_FOR_LONG_BREAK === 0) {
        setPhase("LONG_BREAK");
        setTimeLeft(LONG_BREAK_TIME);
      } else {
        setPhase("SHORT_BREAK");
        setTimeLeft(SHORT_BREAK_TIME);
      }
    } else {
      setPhase("POMODORO");
      setTimeLeft(WORK_TIME);
    }

    // Adicionar notificação e autostart depois
  };

  // Recursão do timeout com compensação de drift (evitar imprecisão)
  const tickTimeout = () => {
    setTimeLeft((curr) => {
      if (curr <= 1) {
        clearTimer();
        handleTimerCompleted();
        return 0;
      }
      return curr - 1;
    });

    if (startTimeRef.current !== null && expectedTimeRef.current !== null) {
      expectedTimeRef.current += 1000; // Espera 1000ms de interval

      // Compensa o drift futuro
      timerRef.current = setTimeout(() => {
        const drift =
          Date.now() - startTimeRef.current! - expectedTimeRef.current!;
        const delay = Math.max(0, 1000 - drift);

        // Define o timeout recursivo com compensação de drift
        timerRef.current = setTimeout(tickTimeout, delay);
      }, 1000);
    }
  };

  const startTimer = () => {
    if (status === "RUNNING") return;

    setStatus("RUNNING");
    startTimeRef.current = Date.now();
    expectedTimeRef.current = 0;

    // Inicia o primeiro "tick"
    timerRef.current = setTimeout(tickTimeout, 1000);
  };

  const pauseTimer = () => {
    clearTimer();
    setStatus("PAUSED");
    startTimeRef.current = null; // Altera o início do timer
  };

  const skipTimer = () => {
    clearTimer();
    handleTimerCompleted();
  };

  const resetTimer = () => {
    clearTimer();
    setStatus("IDLE");
    setTimeLeft(getTotalTime()); // Gera um novo tempo baseado no período que está
  };

  // Limpa o timer ao desmontar
  useEffect(() => {
    return () => clearTimer();
  }, []);

  const value: TimerContextType = {
    timeLeft,
    status,
    phase,
    pomodoroCount,
    progress,
    formattedTime,
    startTimer,
    pauseTimer,
    skipTimer,
    resetTimer,
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);

  if (!context) {
    throw new Error("useTimer deve ser utilizado dentro de TimerProvider");
  }

  return context;
};
