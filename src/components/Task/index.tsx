import { icons } from "@/utils/icons";
import Icon from "../Icon";
import styles from "./styles.module.css";

export default function Task() {
  return (
    <div className={styles.task}>
      <div className={styles.mainContainer}>
        <h3 className={styles.title}>Título</h3>
        <p className={styles.description}>Descrição</p>
      </div>

      <span className={styles.caption}>Pomodoros</span>

      <div className={styles.functionsContainer}>
        <Icon
          icon={icons.function.pencil_simple}
          className={`${styles.function} ${styles.edit}`}
          weight="regular"
        />
        <Icon
          icon={icons.function.trash}
          className={`${styles.function} ${styles.delete}`}
          weight="regular"
        />
      </div>
    </div>
  );
}
