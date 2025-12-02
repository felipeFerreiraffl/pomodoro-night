import { useTheme } from "@services/contexts/themeContext";
import styles from "./styles.module.css";

export default function ColorDropdown() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ul className={styles.container} role="menu">
      <li
        className={`${styles.item} ${styles.default} ${
          theme === "default" ? styles.active : ""
        }`}
        role="none"
      >
        <button
          role="menuitem"
          className={styles.card}
          onClick={() => toggleTheme("default")}
        >
          Padrão
        </button>
      </li>
      <li
        className={`${styles.item} ${styles.cyberpunk} ${
          theme === "cyberpunk" ? styles.active : ""
        }`}
        role="none"
      >
        <button
          role="menuitem"
          className={styles.card}
          onClick={() => toggleTheme("cyberpunk")}
        >
          Cyberpunk
        </button>
      </li>
      <li
        className={`${styles.item} ${styles.forest} ${
          theme === "forest" ? styles.active : ""
        }`}
        role="none"
      >
        <button
          role="menuitem"
          className={styles.card}
          onClick={() => toggleTheme("forest")}
        >
          Floresta
        </button>
      </li>
      <li
        className={`${styles.item} ${styles.desert} ${
          theme === "desert" ? styles.active : ""
        }`}
        role="none"
      >
        <button
          role="menuitem"
          className={styles.card}
          onClick={() => toggleTheme("desert")}
        >
          Deserto
        </button>
      </li>
    </ul>
  );
}
