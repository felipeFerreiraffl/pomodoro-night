import type {
  TimerContextType,
  TimerPhase,
  TimerState,
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

  // Código antes para utilizar depois
  const loadTimerState = (): TimerState | null => {
    const savedState = localStorage.getItem("pomodoroTimer");

    if (!savedState) {
      console.log(`Nenhum timer salvo foi encontrado`);
      return null;
    }

    try {
      const state: TimerState = JSON.parse(savedState);

      // Valida se é no mesmo dia
      const today = new Date().toISOString().split("T")[0];
      if (state.date !== today) {
        console.log("Timer é de outro dia. Resetando contador...");
        return null; // Reseta o timer
      }

      // Calcula tempo passado se estiver rodando
      if (state.status === "RUNNING" && state.startedAt) {
        const now = Date.now();
        const elapsedMs = now - state.startedAt;
        const elapsedSeconds = Math.floor(elapsedMs / 1000);

        state.timeLeft = Math.max(0, state.timeLeft - elapsedSeconds);

        console.log(`
          • Timer estava rodando. Passaram-se ${elapsedSeconds}s
          • Tempo restante atualizado: ${state.timeLeft}s
        `);

        if (state.timeLeft === 0) {
          console.log("Timer acabou. Resetando timer");
          return null;
        }
      }

      return state;
    } catch (error) {
      console.error(`Erro ao carregar timer salvo: ${error}`);
      return null;
    }
  };

  const initialState = loadTimerState();

  const [timeLeft, setTimeLeft] = useState<number>(
    initialState?.timeLeft ?? WORK_TIME
  );
  const [status, setStatus] = useState<TimerStatus>(
    initialState?.status ?? "IDLE"
  );
  const [phase, setPhase] = useState<TimerPhase>(
    initialState?.phase ?? "POMODORO"
  );
  const [pomodoroCount, setPomodoroCount] = useState<number>(
    initialState?.pomodoroCount ?? 0
  );

  const timerRef = useRef<number | null>(null);

  // Refs para drift do timeout
  const startTimeRef = useRef<number | null>(null);
  const expectedTimeRef = useRef<number | null>(null);

  // Salva o timer para o localStorage
  const saveTimerState = () => {
    const state: TimerState = {
      timeLeft,
      totalTime: getTotalTime(),
      status,
      phase,
      pomodoroCount,
      startedAt: startTimeRef.current,
      pausedAt: status === "PAUSED" ? Date.now() : null,
      lastUpdated: Date.now(),
      date: new Date().toISOString().split("T")[0],
    };

    localStorage.setItem("pomodoroTimer", JSON.stringify(state));
  };

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
    saveTimerState();

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

    saveTimerState();

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
    saveTimerState();
  };

  const skipTimer = () => {
    clearTimer();
    handleTimerCompleted();
    saveTimerState();
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

  useEffect(() => {
    if (initialState?.status === "RUNNING") {
      console.log("Timer rodando, reiniciando");
      // startTimer();
      pauseTimer();
      saveTimerState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "RUNNING") {
      const saveInterval = setInterval(() => {
        saveTimerState();
      }, 5000);

      return () => clearInterval(saveInterval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, timeLeft, phase, pomodoroCount]);

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
