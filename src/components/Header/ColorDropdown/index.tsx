import { useTheme } from "@services/contexts/themeContext";
import styles from "./styles.module.css";
import { setStateToFalse } from "@/utils/setState";

interface ColorDropdownProps {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ColorDropdown({ setState }: ColorDropdownProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <ul
      role="menu"
      className={styles.container}
      onBlur={setStateToFalse(setState)}
    >
      <li
        role="none"
        className={`${styles.item} ${styles.default} ${
          theme === "default" ? styles.active : ""
        }`}
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
        role="none"
        className={`${styles.item} ${styles.cyberpunk} ${
          theme === "cyberpunk" ? styles.active : ""
        }`}
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
        role="none"
        className={`${styles.item} ${styles.forest} ${
          theme === "forest" ? styles.active : ""
        }`}
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
        role="none"
        className={`${styles.item} ${styles.desert} ${
          theme === "desert" ? styles.active : ""
        }`}
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
