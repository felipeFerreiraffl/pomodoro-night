import styles from "./styles.module.css";

export default function Stats() {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.mainTitle}>Suas estatísticas</h1>

        <div className={styles.statsContainer}>
          <section className={styles.mainStats}>
            <div className={styles.countingStat}>
              <h2 className={styles.countingTitle}>Total de pomodoros</h2>

              <div className={styles.numberContainer}>
                <p className={styles.number}>20</p>
                <span className={styles.increment}>+2</span>
              </div>
            </div>
            <div className={styles.countingStat}>
              <h2 className={styles.countingTitle}>Tarefas concluídas</h2>

              <div className={styles.numberContainer}>
                <p className={styles.number}>5</p>
                <span className={styles.increment}>+1</span>
              </div>
            </div>
            <div className={styles.countingStat}>
              <h2 className={styles.countingTitle}>Tempo focado</h2>

              <div className={styles.numberContainer}>
                <p className={styles.number}>1h 20 min</p>
                <span className={styles.increment}>+4 min</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
