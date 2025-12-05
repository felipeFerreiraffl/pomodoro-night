import styles from "./styles.module.css";

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonsContainer}>
          <button
            className={`${styles.button} ${styles.confirm}`}
            onClick={onConfirm}
            aria-label="confirmar"
          >
            Confirmar
          </button>
          <button
            className={`${styles.button} ${styles.cancel}`}
            onClick={onCancel}
            aria-label="cancelar"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
