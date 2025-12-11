import type { Icon } from "@phosphor-icons/react";
import CustomIcon from "../Icon";
import styles from "./styles.module.css";
import type React from "react";

interface ButtonProps {
  type: "default" | "delete" | "save";
  rawType?: "submit" | "reset" | "button" | undefined;
  label: string;
  icon?: Icon;
  onClick?: () => void;
}

export default function Button({
  type,
  rawType,
  label,
  icon,
  onClick,
}: ButtonProps) {
  const styleByType =
    type === "delete"
      ? styles.delete
      : type === "save"
      ? styles.save
      : styles.default;

  return (
    <button
      type={rawType}
      className={`${styles.button} ${styleByType}`}
      onClick={onClick}
    >
      {icon && <CustomIcon icon={icon} size={20} weight="regular" />}
      <span className={styles.label}>{label}</span>
    </button>
  );
}
