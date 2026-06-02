import { FiInfo } from "react-icons/fi";
import styled from "./FormTipsButton.module.scss"

interface FormTipsButtonProps {
  onClick: () => void;
  active?: boolean;
  className?: string;
}

export const FormTipsButton = ({ onClick, active }: FormTipsButtonProps) => {
  return (
    <button
      className={`${styled.FormTipsButton} ${active ? styled["FormTipsButton--active"] : ""}`}
      onClick={onClick}
      title={active ? "Скрыть подсказки" : "Показать подсказки"}
    >
      <FiInfo />
    </button>
  )
}
