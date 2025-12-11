import type React from "react";

export interface Task {
  id: string;
  title: string;
  description?: string;
  estimatedPomodoros: number;
  completedPomodoros: number;
  completed: boolean;
  active: boolean;
  priority?: "high" | "medium" | "low";
  createdAt: Date;
  completedAt?: Date;
}

export type TaskAction =
  | {
      type: "ADD_TASK";
      payload: Omit<
        Task,
        "id" | "createdAt" | "completedPomodoros" | "active" | "completed"
      >;
    }
  | {
      type: "EDIT_TASK";
      payload: { id: string; updates: Partial<Task> };
    }
  | {
      type: "DELETE_TASK";
      payload: string;
    }
  | {
      type: "COMPLETE_TASK";
      payload: string;
    }
  | {
      type: "SET_ACTIVE_TASK";
      payload: string | null;
    }
  | {
      type: "INCREMENT_TASK";
      payload: string;
    }
  | {
      type: "LOAD_TASKS";
      payload: Task[];
    };

export interface TaskContextType {
  tasks: Task[];
  activeTask: Task | null;
  dispatch: React.Dispatch<TaskAction>;

  // Funções
  addTask: (
    task: Omit<
      Task,
      "id" | "createdAt" | "completedPomodoros" | "active" | "completed"
    >
  ) => void;
  editTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  setActiveTask: (id: string | null) => void;
  incrementPomodoro: (id: string) => void;
}
