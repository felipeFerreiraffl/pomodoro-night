import Icon from "@/components/Icon";
import styles from "./styles.module.css";
import { icons } from "@/utils/icons";

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

          <section className={styles.streakContainer}>
            <div className={styles.streakStats}>
              <div className={styles.streakSequence}>
                <h2 className={styles.streakTitle}>Sequência atual</h2>
                <div className={styles.streakNumberContainer}>
                  <Icon
                    className={styles.streakNumberIcon}
                    icon={icons.common.fire_simple}
                    weight="regular"
                  />
                  <span className={styles.streakNumber}>3</span>
                </div>
              </div>
              <div className={styles.streakSequence}>
                <h2 className={styles.streakTitle}>Maior sequência</h2>
                <div className={styles.streakNumberContainer}>
                  <Icon
                    className={styles.streakNumberIcon}
                    icon={icons.common.fire_simple}
                    weight="regular"
                  />
                  <span className={styles.streakNumber}>8</span>
                </div>
              </div>
            </div>

            <div className={styles.streakWeek}>
              <div className={styles.streakWeekDay}>
                <p className={styles.streakWeekDayText}>Dom</p>
                <Icon
                  className={styles.streakWeekDayIcon}
                  icon={icons.common.check_circle}
                  weight="fill"
                />
              </div>
            </div>
          </section>

          <section className={styles.periodStatsContainer}>
            <div className={styles.periodProductionContainer}>
              <h2 className={styles.periodProductionTitle}>
                Qual período você é mais produtivo?
              </h2>

              <div className={styles.periodProductionTimes}>
                <div className={styles.periodTime}>
                  <h3 className={styles.periodTimeLabel}>Manhã (6h - 12h)</h3>

                  <div className={styles.periodTimeProgressContainer}>
                    <progress
                      value={0.8}
                      className={styles.periodTimeProgress}></progress>
                    <span className={styles.periodTimeProgressNumber}>80%</span>
                  </div>
                </div>

                <div className={styles.periodTime}>
                  <h3 className={styles.periodTimeLabel}>Tarde (12h - 18h)</h3>

                  <div className={styles.periodTimeProgressContainer}>
                    <progress
                      value={0.5}
                      className={styles.periodTimeProgress}></progress>
                    <span className={styles.periodTimeProgressNumber}>50%</span>
                  </div>
                </div>

                <div className={styles.periodTime}>
                  <h3 className={styles.periodTimeLabel}>Noite (18h - 24h)</h3>

                  <div className={styles.periodTimeProgressContainer}>
                    <progress
                      value={0.7}
                      className={styles.periodTimeProgress}></progress>
                    <span className={styles.periodTimeProgressNumber}>70%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
