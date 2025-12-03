import { useTheme } from "@services/contexts/themeContext";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";

interface ColorDropdownProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ColorDropdown({ state, setState }: ColorDropdownProps) {
  const { theme, toggleTheme } = useTheme();
  const menuRef = useRef<HTMLUListElement | null>(null); // Identificação de menu por DOM

  useEffect(() => {
    if (state && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { scale: 0, transformOrigin: "top right" },
        { scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [state]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Verifica se houve um clique fora do elemento
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        gsap.fromTo(
          menuRef.current,
          { scale: 1, transformOrigin: "top right" },
          {
            scale: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => setState(false),
          }
        );
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
  }, [state, setState]);

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
