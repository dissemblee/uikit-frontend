import { Button } from "@shared/ui/Button";
import styles from "./ConfirmModal.module.scss";

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  loadingText?: string;
  variant?: "primary" | "cancel";
}

export const ConfirmModal = ({
  title,
  message,
  onConfirm,
  onClose,
  confirmText = "подтвердить",
  cancelText = "отмена",
  isLoading = false,
  loadingText = "...",
  variant = "primary",
}: ConfirmModalProps) => {
  return (
    <div className={styles.ConfirmModal__Overlay} onClick={onClose}>
      <div className={styles.ConfirmModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.ConfirmModal__Header}>
          <code className={styles.ConfirmModal__Title}>
            <span className={styles.ConfirmModal__Comment}>//</span> {title}
          </code>
        </div>

        <div className={styles.ConfirmModal__Body}>
          <p className={styles.ConfirmModal__Message}>{message}</p>
        </div>

        <div className={styles.ConfirmModal__Actions}>
          <Button variant="cancel" nonBlock onClick={onClose}>
            {cancelText}
          </Button>
          <Button
            variant={variant}
            nonBlock
            onClick={onConfirm}
            loading={isLoading}
            loadingText={loadingText}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
