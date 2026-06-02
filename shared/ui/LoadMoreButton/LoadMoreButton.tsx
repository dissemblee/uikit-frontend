import { Button } from "@shared/ui/Button";
import styles from "./LoadMoreButton.module.scss";

interface LoadMoreButtonProps {
  itemsLeft: number;
  isFetching: boolean;
  onClick: () => void;
  loadingLabel?: string;
  label?: (itemsLeft: number) => string;
}

export const LoadMoreButton = ({
  itemsLeft,
  isFetching,
  onClick,
  loadingLabel = "Загрузка...",
  label = (n) => `Показать еще (осталось ${n})`,
}: LoadMoreButtonProps) => {
  if (itemsLeft <= 0) return null;

  return (
    <div className={styles.LoadMoreButton}>
      <Button onClick={onClick} disabled={isFetching} variant="secondary">
        {isFetching ? loadingLabel : label(itemsLeft)}
      </Button>
    </div>
  );
};
