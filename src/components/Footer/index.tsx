import { NavLink } from "react-router";
import styles from "./styles.module.css";
import { links } from "@/utils/links";
import Icon from "../Icon";
import { icons } from "@/utils/icons";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav>
        <ul className={styles.navigation}>
          <li>
            <NavLink to={links.pages.home} className={styles.page}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={links.pages.stats} className={styles.page}>
              Estatísticas
            </NavLink>
          </li>
          <li>
            <NavLink to={links.pages.settings} className={styles.page}>
              Configurações
            </NavLink>
          </li>
          <li>
            <NavLink to={links.pages.about} className={styles.page}>
              Sobre
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.socialContainer}>
        <a
          href={links.social.github}
          rel="noopener noreferer"
          className={styles.social}
        >
          <Icon icon={icons.brand.github_logo} size={20} weight="fill" />
        </a>
        <a
          href={links.social.linkedin}
          rel="noopener noreferer"
          className={styles.social}
        >
          <Icon icon={icons.brand.linkedin_logo} size={20} weight="fill" />
        </a>
      </div>

      <span className={styles.copyright}>&copy; Pomodoro Night 2025</span>
    </footer>
  );
}
