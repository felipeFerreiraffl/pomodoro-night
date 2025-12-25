import Button from "@/components/Button";
import ConfirmModal from "@/components/ConfirmModal";
import Icon from "@/components/Icon";
import Task from "@/components/Task";
import TaskModal from "@/components/TaskModal";
import Timer from "@/components/Timer";
import { useTasks } from "@/services/contexts/taskContext";
import { ItemTypes } from "@/types/drag.types";
import type { Task as TaskType } from "@/types/task.type";
import { icons } from "@/utils/icons";
import { setStateToFalse, setStateToTrue } from "@/utils/setState";
import { useEffect, useRef, useState } from "react";
import { useDrop, type DropTargetMonitor } from "react-dnd";
import styles from "./styles.module.css";

export default function Home() {
  const { tasks, deleteAllTasks, setActiveTask, activeTask } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  const dropAreaRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: (item: { task: TaskType }) => {
        setActiveTask(item.task.id);
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [setActiveTask]
  );

  const allTasks = tasks.map((task, i) => (
    <Task key={i} task={task} isDropped={activeTask?.id === task.id} />
  ));

  const openConfirmModal = () => {
    if (allTasks.length > 0) {
      setIsConfirmOpen(true);
    }
  };

  const handleDeleteAllTasks = () => {
    deleteAllTasks();
    setIsConfirmOpen(false);
  };

  useEffect(() => {
    if (!activeTask && dropAreaRef.current) {
      dropRef(dropAreaRef);
    }
  }, [activeTask, dropRef]);

  return (
    <>
      <main className={styles.main}>
        <aside className={styles.hero}>
          <Timer />

          {activeTask ? (
            <div data-tooltip="Clique para cancelar tarefa">
              <Task task={activeTask} isClickable />
            </div>
          ) : (
            <div ref={dropAreaRef} className={styles.dropArea}>
              <Icon
                icon={icons.common.cursor_click}
                className={styles.dropIcon}
              />
              <span className={styles.dropLabel}>
                {isOver ? "Solte aqui" : "Selecionar tarefa"}
              </span>
            </div>
          )}
        </aside>

        <section className={styles.mainContent}>
          <h1 className={styles.mainTitle}>Tarefas</h1>

          <div className={styles.tasksContainer}>
            <div className={styles.prioritiesContainer}>
              <h2 className={styles.prioritiesTitle}>Prioridades</h2>

              <div className={styles.priorities}>
                <div className={styles.priority}>
                  <div
                    className={`${styles.priorityIndicator} ${styles.low}`}></div>
                  <span className={styles.priorityLabel}>Baixa</span>
                </div>
                <div className={styles.priority}>
                  <div
                    className={`${styles.priorityIndicator} ${styles.medium}`}></div>
                  <span className={styles.priorityLabel}>Média</span>
                </div>
                <div className={styles.priority}>
                  <div
                    className={`${styles.priorityIndicator} ${styles.high}`}></div>
                  <span className={styles.priorityLabel}>Alta</span>
                </div>
              </div>
            </div>

            <div className={styles.actionsContainer}>
              <Button
                type="default"
                label="Criar tarefa"
                icon={icons.function.plus}
                onClick={setStateToTrue(setIsModalOpen)}
              />
              <Button
                type="delete"
                label="Excluir todos"
                icon={icons.function.trash}
                onClick={openConfirmModal}
              />
            </div>

            <div className={styles.tasks}>{allTasks}</div>
          </div>
        </section>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={setStateToFalse(setIsModalOpen)}
        mode="add"
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        message="Deseja excluir todas as tarefas?"
        onCancel={setStateToFalse(setIsConfirmOpen)}
        onConfirm={handleDeleteAllTasks}
      />
    </>
  );
}
