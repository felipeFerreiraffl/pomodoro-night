import { useTasks } from "@/services/contexts/taskContext";
import { ItemTypes } from "@/types/drag.types";
import type { Task as TaskType } from "@/types/task.type";
import { icons } from "@/utils/icons";
import { setStateToFalse, setStateToTrue } from "@/utils/setState";
import { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import ConfirmModal from "../ConfirmModal";
import Icon from "../Icon";
import TaskModal from "../TaskModal";
import styles from "./styles.module.css";

interface TaskProps {
  task: TaskType;
  isDropped?: boolean;
  isClickable?: boolean;
}

export default function Task({
  task,
  isDropped = false,
  isClickable = false,
}: TaskProps) {
  const { deleteTask, completeTask, activeTask, setActiveTask } = useTasks();

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmCancel, setConfirmCancel] = useState<boolean>(false);
  const [taskModal, setTaskModal] = useState<boolean>(false);

  const dragTaskRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: () => ({ task }),
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [task]
  );

  const handleComplete = () => {
    completeTask(task.id);
    setActiveTask(null);
  };

  const handleDelete = () => {
    deleteTask(task.id);
    setConfirmOpen(false);
    setActiveTask(null);
  };

  const pomodoroCountText = `${task.completedPomodoros}/${task.estimatedPomodoros}`;

  const handlePriorityColor =
    task?.priority === "low"
      ? styles.low
      : task?.priority === "medium"
      ? styles.medium
      : styles.high;

  const handleCancelTask = () => {
    if (isClickable && activeTask?.id === task.id) {
      setActiveTask(null);
    }
  };

  dragRef(dragTaskRef);

  return (
    <>
      <div
        ref={dragTaskRef}
        className={`${styles.task} ${isDragging ? styles.dragging : ""} ${
          activeTask?.id === task.id && isDropped ? styles.active : ""
        }`}
        style={{ cursor: isClickable ? "pointer" : "grab" }}
        onClick={setStateToTrue(setConfirmCancel)}>
        <button
          className={`${styles.finishButton} ${
            task.completed ? styles.completed : ""
          }`}
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
        isOpen={confirmCancel}
        message="Deseja cancelar a tarefa ativa?"
        onConfirm={handleCancelTask}
        onCancel={setStateToFalse(setConfirmCancel)}
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
