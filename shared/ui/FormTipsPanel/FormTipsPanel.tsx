import styled from "./FormTipsPanel.module.scss"
import { FaLightbulb } from "react-icons/fa";

interface FormTipsPanelProps {
  show: boolean;
  title: string;
  tips: string[];
  variant?: 'default' | 'warning' | 'success' | 'info';
  icon?: React.ReactNode;
}

export const FormTipsPanel = ({ 
  show, 
  title, 
  tips,
  variant = 'default',
}: FormTipsPanelProps) => {
  return (
    <div className={`${styled.FormTipsPanel} ${styled[variant]} ${show ? styled.FormTipsPanel__Show : styled.FormTipsPanel__Hide}`}>
      <span>
        <FaLightbulb style={{color: "#7F77DD"}}/> {title}
      </span>
      <ul className={styled.FormTipsPanel__List}>
        {tips.map((tip, index) => (
          <li key={index} className={styled.FormTipsPanel__Item}>{tip}</li>
        ))}
      </ul>
    </div>
  )
}
