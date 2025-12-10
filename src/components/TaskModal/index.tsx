import Button from "../Button";
import styles from "./styles.module.css";

export default function TaskModal() {
  return (
    <form className={styles.modal}>
      <h2 className={styles.title}>Tarefa</h2>

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
          />
        </div>

        <div className={styles.otherFieldContainer}>
          <div className={styles.priorityContainer}>
            <h3 className={styles.otherTitle}>Prioridade</h3>

            <div className={styles.priorityOptions}>
              <div className={styles.priority}>
                <div
                  className={`${styles.priorityIndicator} ${styles.low}`}
                ></div>
                <span className={styles.priorityLabel}>Baixa</span>
              </div>
              <div className={styles.priority}>
                <div
                  className={`${styles.priorityIndicator} ${styles.medium}`}
                ></div>
                <span className={styles.priorityLabel}>Média</span>
              </div>
              <div className={styles.priority}>
                <div
                  className={`${styles.priorityIndicator} ${styles.high}`}
                ></div>
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
            />
          </div>
        </div>

        <Button type="default" label="Confirmar" />
      </div>
    </form>
  );
}
