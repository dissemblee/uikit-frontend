import styled from "./FormTipsPanel.module.scss"
import { FaLightbulb } from "react-icons/fa";

interface FormTipsPanelProps {
  show: boolean;
  title: string;
  tips: string[];
}

export const FormTipsPanel = ({ show, title, tips }: FormTipsPanelProps) => {
  return (
    <div className={`${styled.FormTipsPanel} ${show ? styled["FormTipsPanel--show"] : styled["FormTipsPanel--hide"]}`}>
      <div className={styled.FormTipsPanel__Title}>
        <FaLightbulb className={styled.FormTipsPanel__Icon} />
        {title}
      </div>
      <ul className={styled.FormTipsPanel__List}>
        {tips.map((tip, index) => (
          <li key={index} className={styled.FormTipsPanel__Item}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
