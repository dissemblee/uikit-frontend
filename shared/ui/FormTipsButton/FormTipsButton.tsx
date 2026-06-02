import { FiInfo } from "react-icons/fi";
import styles from "./FormTipsButton.module.scss"

interface FormTipsButtonProps {
  onClick: () => void;
  active?: boolean;
  className?: string;
}

export const FormTipsButton = ({ onClick, active }: FormTipsButtonProps) => {
  return (
    <button
      className={`${styles.FormTipsButton} ${active ? styles["FormTipsButton--active"] : ""}`}
      onClick={onClick}
      title={active ? "Скрыть подсказки" : "Показать подсказки"}
    >
      <FiInfo />
    </button>
  )
}
