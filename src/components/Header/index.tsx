import styles from "./styles.module.css";
import Logo from "@assets/svgs/pomodoro-night.svg?react";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Header() {
  const colors = useThemeColor();

  return (
    <header className={styles}>
      <Logo width={48} height={48} />
      <nav className={styles}>
        <div className={styles}>
          <span className={styles}></span>
          <p className={styles}></p>
        </div>
        <div className={styles}>
          <span className={styles}></span>
          <p className={styles}></p>
        </div>
        <div className={styles}>
          <span className={styles}></span>
          <p className={styles}></p>
        </div>
      </nav>
      <div className={styles}>
        <button className={styles}></button>
        <button className={styles}></button>
      </div>
    </header>
  );
}
