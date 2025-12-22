import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Timer from "@/components/Timer";
import { icons } from "@/utils/icons";
import styles from "./styles.module.css";
import { setStateToFalse, setStateToTrue } from "@/utils/setState";
import { useState } from "react";
import TaskModal from "@/components/TaskModal";
import { useTasks } from "@/services/contexts/taskContext";
import Task from "@/components/Task";
import ConfirmModal from "@/components/ConfirmModal";
import { useDrop } from "react-dnd";
import { ItemTypes } from "@/types/drag.types";
import type { Task as TaskType } from "@/types/task.type";

export default function Home() {
  const { tasks, deleteAllTasks, setActiveTask, activeTask } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  const [{ isOver }, dropRef] = useDrop<
    { task: TaskType },
    void,
    { isOver: boolean }
  >(
    () => ({
      accept: ItemTypes.CARD,
      drop: (item) => {
        setActiveTask(item.task.id);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [setActiveTask]
  );

  console.log(`O Drag está foi colocado em cima do Drop: ${isOver}`);
  console.log(
    `Tarefa que está ativa: ${activeTask?.title || "Nenhuma tarefa ativa"}`
  );

  const allTasks = tasks.map((task, i) => <Task key={i} task={task} />);

  const openConfirmModal = () => {
    if (allTasks.length > 0) {
      setIsConfirmOpen(true);
    }
  };

  const handleDeleteAllTasks = () => {
    deleteAllTasks();
    setIsConfirmOpen(false);
  };

  return (
    <>
      <main className={styles.main}>
        <aside className={styles.hero}>
          <Timer />

          {activeTask ? (
            <Task task={activeTask} />
          ) : (
            <div ref={dropRef} className={styles.dropArea}>
              <Icon
                icon={icons.common.cursor_click}
                className={styles.dropIcon}
              />
              <span className={styles.dropLabel}>Selecionar tarefa</span>
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
