import { icons } from "@/utils/icons";
import { setStateToTrue } from "@/utils/setState";
import { useState } from "react";
import { NavLink } from "react-router";
import Icon from "../Icon";
import ColorDropdown from "./ColorDropdown";
import PomodoroLogo from "./PomodoroLogo";
import styles from "./styles.module.css";

export default function Header() {
  const [openColorMenu, setOpenColorMenu] = useState<boolean>(false);

  return (
    <header className={styles.container}>
      <NavLink to={"/"}>
        <PomodoroLogo className={styles.logo} />
      </NavLink>

      <nav>
        <ul className={styles.navigation}>
          <li>
            <NavLink to={"/stats"} className={styles.page}>
              <Icon
                icon={icons.common.chart_bar}
                className={styles.pageIcon}
                size={20}
              />
              <p className={styles.pageName}>Estatísticas</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/settings"} className={styles.page}>
              <Icon
                icon={icons.common.gear}
                className={styles.pageIcon}
                size={20}
              />
              <p className={styles.pageName}>Configurações</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/about"} className={styles.page}>
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
        <div className={styles.colorContainer}>
          <button
            role="button"
            aria-label="color"
            className={styles.function}
            onClick={setStateToTrue(setOpenColorMenu)}
          >
            <Icon icon={icons.common.palette} size={16} weight="fill" />
          </button>

          {openColorMenu && (
            <ColorDropdown state={openColorMenu} setState={setOpenColorMenu} />
          )}
        </div>
        <button className={styles.function}>
          <Icon icon={icons.common.music_notes} size={16} weight="fill" />
        </button>
      </div>
    </header>
  );
}
