import { useTimer } from "@/services/contexts/timerContext";
import { icons } from "@/utils/icons";
import Icon from "../Icon";
import ProgressRing from "./ProgressRing";
import styles from "./styles.module.css";

export default function Timer() {
  const {
    formattedTime,
    pauseTimer,
    phase,
    progress,
    skipTimer,
    startTimer,
    status,
  } = useTimer();

  const playPauseIcon =
    status === "RUNNING" ? icons.function.pause : icons.function.play;

  const phaseLabel = {
    POMODORO: "Pomodoro",
    SHORT_BREAK: "Pequena pausa",
    LONG_BREAK: "Pausa longa",
  }[phase];

  return (
    <div className={styles.container}>
      <div className={styles.timerContainer}>
        <ProgressRing progress={progress} />

        <div className={styles.timerDisplay}>
          <p className={styles.timerLabel}>{phaseLabel}</p>
          <span className={styles.timerTime}>{formattedTime}</span>
        </div>
      </div>

      <div className={styles.buttonsContainer}>
        <button
          className={styles.button}
          onClick={status === "RUNNING" ? pauseTimer : startTimer}
        >
          <Icon icon={playPauseIcon} size={40} weight="fill" />
        </button>
        <button className={styles.button} onClick={skipTimer}>
          <Icon
            icon={icons.function.arrow_fat_line_right}
            size={40}
            weight="fill"
          />
        </button>
      </div>
    </div>
  );
}
