import type { Icon } from "@phosphor-icons/react";
import CustomIcon from "../Icon";
import styles from "./styles.module.css";

interface ButtonProps {
  type: "default" | "delete" | "save";
  label: string;
  icon?: Icon;
  //   onClick: () => void;
}

export default function Button({ type, label, icon }: ButtonProps) {
  const styleByType =
    type === "delete"
      ? styles.delete
      : type === "save"
      ? styles.save
      : styles.default;

  return (
    <button className={`${styles.button} ${styleByType}`}>
      {icon && <CustomIcon icon={icon} size={20} weight="regular" />}
      <span className={styles.label}>{label}</span>
    </button>
  );
}
