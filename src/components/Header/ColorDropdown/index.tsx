import { useTheme } from "@services/contexts/themeContext";
import { useEffect, useRef } from "react";
import styles from "./styles.module.css";

interface ColorDropdownProps {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ColorDropdown({ setState }: ColorDropdownProps) {
  const { theme, toggleTheme } = useTheme();
  const menuRef = useRef<HTMLUListElement>(null); // Identificação de menu por DOM

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Verifica se houve um clique fora do elemento
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setState(false);
      }
    };

    // Delay para evitar um clique que feche o elemento insperadamente
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setState]);

  return (
    <ul ref={menuRef} role="menu" className={styles.container}>
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
