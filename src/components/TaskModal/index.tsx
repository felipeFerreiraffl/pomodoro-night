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
          <input type="text" id="title" required className={styles.input} />
        </div>

        <div className={styles.field}>
          <label htmlFor="text" className={styles.label}>
            Descrição
          </label>
          <input type="text" className={styles.input} />
        </div>

        <div className={styles.otherFieldContainer}>
          <div className={styles.priorityContainer}>
            <h3 className={styles.otherTitle}>Prioridade</h3>
            <div className={styles.priorityOptions}>
              <div className={styles.priority}>
                <div className={styles.priorityIndicator}></div>
                <span className={styles.priorityLabel}>Baixa</span>
              </div>
              <div className={styles.priority}>
                <div className={styles.priorityIndicator}></div>
                <span className={styles.priorityLabel}>Média</span>
              </div>
              <div className={styles.priority}>
                <div className={styles.priorityIndicator}></div>
                <span className={styles.priorityLabel}>Alta</span>
              </div>
            </div>
          </div>

          <div className={styles.pomodorosContainer}>
            <label htmlFor="" className={styles.otherTitle}>
              Número de pomodoros
            </label>
            <input type="number" className={styles.pomodoroInput} />
          </div>
        </div>

        <button className={styles.button}>Confirmar</button>
      </div>
    </form>
  );
}
