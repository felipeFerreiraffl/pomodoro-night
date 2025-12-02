import styles from "./styles.module.css";

export default function ColorDropdown() {
  return (
    <ul className={styles.container} role="menu">
      <li className={`${styles.item} ${styles.default}`} role="none">
        <button role="menuitem" className={`${styles.card}`}>
          Padrão
        </button>
      </li>
      <li className={`${styles.item} ${styles.cyberpunk}`} role="none">
        <button role="menuitem" className={styles.card}>
          Cyberpunk
        </button>
      </li>
      <li className={`${styles.item} ${styles.florest}`} role="none">
        <button role="menuitem" className={styles.card}>
          Floresta
        </button>
      </li>
      <li className={`${styles.item} ${styles.desert}`} role="none">
        <button role="menuitem" className={styles.card}>
          Deserto
        </button>
      </li>
    </ul>
  );
}
