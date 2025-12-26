import { useTasks } from "@/services/contexts/taskContext";
import type { Task } from "@/types/task.type";
import { icons } from "@/utils/icons";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import Icon from "../Icon";
import styles from "./styles.module.css";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  task?: Task;
}

export default function TaskModal({
  isOpen,
  onClose,
  mode,
  task,
}: TaskModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { addTask, editTask } = useTasks();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [pomodoros, setPomodoros] = useState<number>(1);
  const [priority, setPriority] = useState<
    "low" | "medium" | "high" | undefined
  >("medium");

  useEffect(() => {
    if (isOpen && mode === "edit" && task) {
      setTitle(task.title);
      setDescription(task.description);
      setPomodoros(task.estimatedPomodoros);
      setPriority(task.priority);
    } else if (isOpen && mode === "add") {
      setTitle("");
      setDescription("");
      setPomodoros(1);
      setPriority("medium");
    }
  }, [isOpen, mode, task]);

  useEffect(() => {
    if (formRef.current && isOpen) {
      gsap.fromTo(
        formRef.current,
        { scale: 0, transformOrigin: "center center" },
        { scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setPomodoros(1);
    setPriority("medium");

    onClose();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handlePomodorosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPomodoros(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Título é obrigatório");
      return;
    }

    if (pomodoros <= 0) {
      alert("O número de pomodoros deve ser maior que 0");
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description?.trim() || undefined,
      priority,
      estimatedPomodoros: pomodoros,
    };

    if (mode === "add") {
      addTask(taskData);
    } else if (mode === "edit" && task) {
      editTask(task.id, taskData);
    }

    handleClose();
  };

  return (
    <div className={styles.overlay}>
      <form ref={formRef} className={styles.modal} onSubmit={handleSubmit}>
        <button className={styles.closeIcon} onClick={handleClose}>
          <Icon icon={icons.function.x} weight="regular" />
        </button>

        <h2 className={styles.title}>{`${
          mode === "add" ? "Criação" : "Edição"
        } de tarefa`}</h2>

        <div className={styles.modalContent}>
          <div className={styles.field}>
            <label htmlFor="title" className={styles.label}>
              Título
            </label>
            <input
              type="text"
              id="title"
              className={styles.input}
              placeholder="Insira seu título"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="description" className={styles.label}>
              Descrição
            </label>
            <input
              type="text"
              id="description"
              className={styles.input}
              placeholder="Insira a descrição (Opcional)"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>

          <div className={styles.otherFieldContainer}>
            <div className={styles.priorityContainer}>
              <h3 className={styles.otherTitle}>Prioridade</h3>

              <div className={styles.priorityOptions}>
                <div className={styles.priority}>
                  <button
                    type="button"
                    className={`${styles.priorityIndicator} ${styles.low} ${
                      priority === "low" ? styles.active : ""
                    }`}
                    onClick={() => setPriority("low")}></button>
                  <span className={styles.priorityLabel}>Baixa</span>
                </div>
                <div className={styles.priority}>
                  <button
                    type="button"
                    className={`${styles.priorityIndicator} ${styles.medium} ${
                      priority === "medium" ? styles.active : ""
                    }`}
                    onClick={() => setPriority("medium")}></button>
                  <span className={styles.priorityLabel}>Média</span>
                </div>
                <div className={styles.priority}>
                  <button
                    type="button"
                    className={`${styles.priorityIndicator} ${styles.high} ${
                      priority === "high" ? styles.active : ""
                    }`}
                    onClick={() => setPriority("high")}></button>
                  <span className={styles.priorityLabel}>Alta</span>
                </div>
              </div>
            </div>

            <div className={styles.pomodorosContainer}>
              <label htmlFor="" className={styles.otherTitle}>
                Número de pomodoros
              </label>
              <input
                type="number"
                inputMode="numeric"
                className={styles.pomodoroInput}
                placeholder="N"
                min={1}
                value={pomodoros}
                onChange={handlePomodorosChange}
                required
              />
            </div>
          </div>

          <Button type="default" rawType="submit" label="Confirmar" />
        </div>
      </form>
    </div>
  );
}
