import { useTimer } from "@/services/contexts/timerContext";
import { icons } from "@/utils/icons";
import Icon from "../Icon";
import ProgressRing from "./ProgressRing";
import styles from "./styles.module.css";
import { useState } from "react";
import { setStateToFalse, setStateToTrue } from "@/utils/setState";
import ConfirmModal from "../ConfirmModal";

export default function Timer() {
  const {
    formattedTime,
    pauseTimer,
    phase,
    progress,
    resetTimer,
    skipTimer,
    startTimer,
    status,
  } = useTimer();

  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const handleResetTimer = () => {
    resetTimer();
    setShowConfirm(false);
  };

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
        <button
          className={styles.button}
          onClick={setStateToTrue(setShowConfirm)}
        >
          <Icon
            icon={icons.function.arrows_clockwise}
            size={40}
            weight="fill"
          />
        </button>
        <button className={styles.button} onClick={skipTimer}>
          <Icon
            icon={icons.function.arrow_fat_line_right}
            size={40}
            weight="fill"
          />
        </button>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        message="Resetar timer?"
        onConfirm={handleResetTimer}
        onCancel={setStateToFalse(setShowConfirm)}
      />
    </div>
  );
}
