import { useTasks } from "@/services/contexts/taskContext";
import { useTimer } from "@/services/contexts/timerContext";
import { ItemTypes } from "@/types/drag.types";
import type { Task as TaskType } from "@/types/task.type";
import { icons } from "@/utils/icons";
import { setStateToFalse } from "@/utils/setState";
import { id } from "date-fns/locale";
import { useState } from "react";
import { useDrag } from "react-dnd";
import ConfirmModal from "../ConfirmModal";
import Icon from "../Icon";
import TaskModal from "../TaskModal";
import styles from "./styles.module.css";

interface TaskProps {
  task: TaskType;
}

export default function Task({ task }: TaskProps) {
  const { deleteTask, completeTask, setActiveTask } = useTasks();
  const { startTimer, status } = useTimer();

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [taskModal, setTaskModal] = useState<boolean>(false);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: () => ({ task }),
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [task]
  );

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
    setConfirmOpen(false);
  };

  const pomodoroCountText = `${task.completedPomodoros}/${task.estimatedPomodoros}`;

  const handlePriorityColor =
    task?.priority === "low"
      ? styles.low
      : task?.priority === "medium"
      ? styles.medium
      : styles.high;

  return (
    <>
      <div
        ref={drag}
        className={`${styles.task} ${isDragging ? styles.dragging : ""}`}
        onClick={handleSelectTask}>
        <button
          className={`${styles.finishButton} tooltip-absolute`}
          data-tooltip="Definir como finalizada"
          onClick={(e) => {
            e.stopPropagation();
            handleComplete();
          }}>
          <Icon icon={icons.common.check_circle} weight="fill" />
        </button>

        <div className={styles.mainContainer}>
          <h3 className={styles.title}>{task?.title}</h3>
          <p className={styles.description}>{task?.description || "..."}</p>
        </div>

        <span className={styles.caption}>{pomodoroCountText} pomodoros</span>

        <div className={styles.functionsContainer}>
          <button
            className={`${styles.function} ${styles.edit}`}
            onClick={(e) => {
              e.stopPropagation();
              setTaskModal(true);
            }}>
            <Icon icon={icons.function.pencil_simple} weight="regular" />
          </button>
          <button
            className={`${styles.function} ${styles.delete}`}
            onClick={(e) => {
              e.stopPropagation();
              setConfirmOpen(true);
            }}>
            <Icon icon={icons.function.trash} weight="regular" />
          </button>
        </div>

        <div className={`${styles.priority} ${handlePriorityColor}`}></div>
      </div>

      <TaskModal
        isOpen={taskModal}
        mode="edit"
        onClose={setStateToFalse(setTaskModal)}
        task={task}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        message="Deseja deletar a tarefa?"
        onConfirm={handleDelete}
        onCancel={setStateToFalse(setConfirmOpen)}
      />
    </>
  );
}
