import { icons } from "@/utils/icons";
import Logo from "@assets/svgs/pomodoro-night.svg?react";
import { NavLink } from "react-router";
import Icon from "../Icon";
import styles from "./styles.module.css";

export default function Header() {
  return (
    <header className={styles.container}>
      <Logo className={styles.logo} width={40} height={40} />

      <nav>
        <ul className={styles.navigation}>
          <li>
            <NavLink to={"#"} className={styles.page}>
              <Icon
                icon={icons.common.chart_bar}
                className={styles.pageIcon}
                size={20}
              />
              <p className={styles.pageName}>Estatísticas</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={"#"} className={styles.page}>
              <Icon
                icon={icons.common.gear}
                className={styles.pageIcon}
                size={20}
              />
              <p className={styles.pageName}>Configurações</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={"#"} className={styles.page}>
              <Icon
                icon={icons.common.info}
                className={styles.pageIcon}
                size={20}
              />
              <p className={styles.pageName}>Sobre</p>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.functionsContainer}>
        <button className={styles.function}>
          <Icon icon={icons.common.palette} size={16} weight="fill" />
        </button>
        <button className={styles.function}>
          <Icon icon={icons.common.music_notes} size={16} weight="fill" />
        </button>
      </div>
    </header>
  );
}
