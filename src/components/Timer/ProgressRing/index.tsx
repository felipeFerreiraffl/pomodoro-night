import styles from "./styles.module.css";

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export default function ProgressRing({
  progress,
  size = 320,
  strokeWidth = 2,
  color = "rgb(var(--color-primary))",
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Progresso baseado no offset (0 = 100%)
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg className={styles.progressRing} width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgb(var(--color-black))"
        strokeWidth={strokeWidth}
      />
      <circle
        className={styles.progressRingCircle}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}
