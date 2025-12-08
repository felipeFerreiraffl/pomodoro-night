import { icons } from "@/utils/icons";
import Icon from "../Icon";
import styles from "./styles.module.css";

interface TaskProps {
  title: string;
  description?: string;
  pomodoros: number;
  completed?: boolean;
}

export default function Task() {
  return (
    <div className={styles.task}>
      <button
        className={`${styles.finishButton} tooltip-absolute`}
        data-tooltip="Definir como finalizada"
      >
        <Icon icon={icons.common.check_circle} weight="fill" />
      </button>

      <div className={styles.mainContainer}>
        <h3 className={styles.title}>Título</h3>
        <p className={styles.description}>Descrição</p>
      </div>

      <span className={styles.caption}>Pomodoros</span>

      <div className={styles.functionsContainer}>
        <button className={`${styles.function} ${styles.edit}`}>
          <Icon icon={icons.function.pencil_simple} weight="regular" />
        </button>
        <button className={`${styles.function} ${styles.delete}`}>
          <Icon icon={icons.function.trash} weight="regular" />
        </button>
      </div>

      <div className={styles.priority}></div>
    </div>
  );
}
