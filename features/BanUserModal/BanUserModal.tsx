import { useState } from "react";
import { Button } from "@shared/ui/Button";
import { Select } from "@shared/ui/Inputs";
import styles from "./BanUserModal.module.scss";
import { useBanUserMutation, UserBanReason } from "@entities/auth";

interface BanUserModalProps {
  userId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const banReasonOptions = Object.entries(UserBanReason).map(([, value]) => ({
  value,
  label: value,
}));

export const BanUserModal = ({ userId, onClose, onSuccess }: BanUserModalProps) => {
  const [banReason, setBanReason] = useState<UserBanReason | "">("");
  const [error, setError] = useState("");
  const [banUser, { isLoading }] = useBanUserMutation();

  const handleSubmit = async () => {
    if (!banReason) {
      setError("Выберите причину бана");
      return;
    }
    try {
      await banUser({ userId, banReason: banReason as UserBanReason }).unwrap();
      onSuccess?.();
      onClose();
    } catch {
      setError("Не удалось забанить пользователя");
    }
  };

  return (
    <div className={styles.BanUserModal__Overlay} onClick={onClose}>
      <div className={styles.BanUserModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.BanUserModal__Header}>
          <code className={styles.BanUserModal__Title}>
            <span className={styles.BanUserModal__Comment}>//</span> бан пользователя{" "}
            <span className={styles.BanUserModal__UserId}>{userId}</span>
          </code>
        </div>

        <div className={styles.BanUserModal__Body}>
          <Select
            label="причина бана"
            value={banReason}
            onChange={(e) => {
              setBanReason(e.target.value as UserBanReason);
              setError("");
            }}
            options={banReasonOptions}
          />
          {error && <div className={styles.BanUserModal__Error}>{error}</div>}
        </div>

        <div className={styles.BanUserModal__Actions}>
          <Button variant="cancel" nonBlock onClick={onClose}>
            отмена
          </Button>
          <Button variant="primary" nonBlock onClick={handleSubmit} loading={isLoading} loadingText="Баним...">
            забанить
          </Button>
        </div>
      </div>
    </div>
  );
};
