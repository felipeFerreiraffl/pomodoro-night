import type { Icon } from "@phosphor-icons/react";
import CustomIcon from "../Icon";
import styles from "./styles.module.css";

interface ButtonProps {
  type: "default" | "delete" | "save";
  label: string;
  icon?: Icon;
}

export default function Button({ type, label, icon }: ButtonProps) {
  return (
    <button className={styles.button}>
      {icon && <CustomIcon icon={icon} size={20} weight="regular" />}
      <span className={styles.label}>{label}</span>
    </button>
  );
}
