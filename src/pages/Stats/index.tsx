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

          <section className={styles.productionContainer}>
            <div className={styles.productionComparison}>
              <h2 className={styles.productionComparisonTitle}>
                Comparativo com ontem
              </h2>

              <div className={styles.productionComparisonContainer}>
                <div className={styles.productionDayCount}>
                  <span className={styles.productionDay}>Ontem</span>
                  <p className={styles.productionNumber}>2</p>
                </div>

                <div className={styles.productionIncrementContainer}>
                  <span className={styles.productionIncrement}>+3</span>
                  <Icon
                    className={styles.productionIcon}
                    icon={icons.common.arrow_right}
                    weight="fill"
                  />
                </div>

                <div className={styles.productionDayCount}>
                  <span className={styles.productionDay}>Hoje</span>
                  <p className={styles.productionNumber}>5</p>
                </div>
              </div>
            </div>

            <div className={styles.productivityDays}>
              <h2 className={styles.productivityDaysTitle}>
                Dias de produtividade
              </h2>

              <div className={styles.productivityDaysContent}>
                <div className={styles.productivityDaysMetrics}>
                  <div className={styles.productivityDayStat}>
                    <span className={styles.productivityLabel}>
                      Dia mais produtivo
                    </span>

                    <div className={styles.productivityDayContainer}>
                      <p
                        className={`${styles.productivityDayWeekDay} ${styles.positiveDay}`}>
                        Sexta
                      </p>
                      <span className={styles.productivityDayMean}>
                        4.4 pomodoros
                      </span>
                    </div>
                  </div>

                  <div className={styles.productivityDayStat}>
                    <span className={styles.productivityLabel}>
                      Dia menos produtivo
                    </span>

                    <div className={styles.productivityDayContainer}>
                      <p
                        className={`${styles.productivityDayWeekDay} ${styles.negativeDay}`}>
                        Terça
                      </p>
                      <span className={styles.productivityDayMean}>
                        1.2 pomodoros
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.productivityTipContainer}>
                  <Icon
                    className={styles.productivityTipIcon}
                    icon={icons.common.lightbulb}
                    weight="fill"
                  />
                  <span className={styles.productivityTipLabel}>
                    Marque suas tarefas para sexta!
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
