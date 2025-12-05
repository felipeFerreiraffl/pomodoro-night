import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import gsap from "gsap";

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
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (modalRef.current && isOpen) {
      gsap.fromTo(
        modalRef.current,
        {
          scale: 0,
          transformOrigin: "center center",
        },
        {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.container}>
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
