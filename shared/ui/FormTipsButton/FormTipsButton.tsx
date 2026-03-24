import { FiInfo } from "react-icons/fi";
import styled from "./FormTipsButton.module.scss"

interface FormTipsButtonProps {
  onClick: () => void;
  className?: string;
}

export const FormTipsButton = ({ onClick }: FormTipsButtonProps) => {
  return (
    <button className={styled.FormTipsButton} onClick={onClick}>
      <FiInfo />
    </button>
  )
}
