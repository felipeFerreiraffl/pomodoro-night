import { icons } from "@/utils/icons";
import Icon from "../Icon";
import styles from "./styles.module.css";
import type { Task as TaskType } from "@/types/task.type";
import { useTasks } from "@/services/contexts/taskContext";
import { useTimer } from "@/services/contexts/timerContext";
import type React from "react";

interface TaskProps {
  task: TaskType;
}

export default function Task({ task }: TaskProps) {
  const { deleteTask, completeTask, setActiveTask } = useTasks();
  const { startTimer, status } = useTimer();

  const handleSelectTask = () => {
    setActiveTask(task.id);

    if (status === "RUNNING") {
      startTimer();
    }
  };

  const handleComplete = () => {
    completeTask(task.id);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const pomodoroCountText = `${task.completedPomodoros}/${task.estimatedPomodoros}`;

  return (
    <div className={styles.task} onClick={handleSelectTask}>
      <button
        className={`${styles.finishButton} tooltip-absolute`}
        data-tooltip="Definir como finalizada"
        onClick={(e) => {
          e.stopPropagation();
          handleComplete();
        }}
      >
        <Icon icon={icons.common.check_circle} weight="fill" />
      </button>

      <div className={styles.mainContainer}>
        <h3 className={styles.title}>{task?.title}</h3>
        <p className={styles.description}>{task?.description || "..."}</p>
      </div>

      <span className={styles.caption}>{pomodoroCountText} pomodoros</span>

      <div className={styles.functionsContainer}>
        <button className={`${styles.function} ${styles.edit}`}>
          <Icon icon={icons.function.pencil_simple} weight="regular" />
        </button>
        <button
          className={`${styles.function} ${styles.delete}`}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          <Icon icon={icons.function.trash} weight="regular" />
        </button>
      </div>

      <div className={styles.priority}></div>
    </div>
  );
}
