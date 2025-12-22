import type { Task, TaskAction, TaskContextType } from "@/types/task.type";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";

/* eslint-disable react-refresh/only-export-components */
const TaskContext = createContext<TaskContextType | undefined>(undefined);

const tasksReducer = (state: Task[], action: TaskAction) => {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask: Task = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        completedPomodoros: 0,
        completed: false,
        active: false,
      };
      return [...state, newTask];
    }

    case "EDIT_TASK": {
      return state.map((task) =>
        task?.id === action?.payload.id
          ? { ...task, ...action?.payload.updates }
          : task
      );
    }

    case "DELETE_TASK": {
      return state.filter((task) => task?.id !== action?.payload);
    }

    case "DELETE_ALL_TASKS": {
      return (state = []);
    }

    case "COMPLETE_TASK": {
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: true, active: false, completedAt: new Date() }
          : task
      );
    }

    case "SET_ACTIVE_TASK": {
      return state.map((task) => ({
        ...task,
        active: task?.id === action?.payload,
      }));
    }

    case "INCREMENT_TASK": {
      return state.map((task) => {
        if (task.id === action.payload) {
          const newCompletedPomodoros = task?.completedPomodoros + 1;

          const autoComplete =
            newCompletedPomodoros >= task?.estimatedPomodoros;

          return {
            ...task,
            completedPomodoros: newCompletedPomodoros,
            completed: autoComplete || task.completed,
            completedAt:
              autoComplete && !task?.completed ? new Date() : task?.completedAt,
          };
        }

        return task;
      });
    }

    case "LOAD_TASKS": {
      return action?.payload;
    }

    default:
      return state;
  }
};

// Funções de localStorage
const STORAGE_KEY = "pomodoroTasks";

const loadTasks = (): Task[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const tasks: Task[] = JSON.parse(saved);

    return tasks.map((task) => ({
      ...task,
      createdAt: new Date(task?.createdAt),
      completedAt: task?.completedAt ? new Date(task.completedAt) : undefined,
    }));
  } catch (error) {
    console.error(`Erro ao carregar tarefas: ${error}`);
    return [];
  }
};

const saveTasks = (tasks: Task[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error(`Erro ao salvar tarefas: ${error}`);
  }
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, dispatch] = useReducer(tasksReducer, [], loadTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const activeTask = tasks.find((task) => task.active) || null;

  const addTask = (
    task: Omit<
      Task,
      "id" | "createdAt" | "completedPomodoros" | "active" | "completed"
    >
  ) => {
    dispatch({ type: "ADD_TASK", payload: task });
  };

  const editTask = (id: string, updates: Partial<Task>) => {
    dispatch({ type: "EDIT_TASK", payload: { id, updates } });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const deleteAllTasks = () => {
    dispatch({ type: "DELETE_ALL_TASKS", payload: undefined });
  };

  const completeTask = (id: string) => {
    dispatch({ type: "COMPLETE_TASK", payload: id });
  };

  const setActiveTask = (id: string | null) => {
    dispatch({ type: "SET_ACTIVE_TASK", payload: id });
  };

  const incrementPomodoro = (id: string) => {
    dispatch({ type: "INCREMENT_TASK", payload: id });
  };

  const value: TaskContextType = {
    tasks,
    activeTask,
    dispatch,
    addTask,
    editTask,
    deleteTask,
    deleteAllTasks,
    completeTask,
    setActiveTask,
    incrementPomodoro,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTask deve ser utilizado dentro de TaskProvider");
  }

  return context;
};
