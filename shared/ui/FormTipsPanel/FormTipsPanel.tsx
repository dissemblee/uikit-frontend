import styles from "./FormTipsPanel.module.scss"
import { FaLightbulb } from "react-icons/fa";

interface FormTipsPanelProps {
  show: boolean;
  title: string;
  tips: string[];
}

export const FormTipsPanel = ({ show, title, tips }: FormTipsPanelProps) => {
  return (
    <div className={`${styles.FormTipsPanel} ${show ? styles["FormTipsPanel--show"] : styles["FormTipsPanel--hide"]}`}>
      <div className={styles.FormTipsPanel__Title}>
        <FaLightbulb className={styles.FormTipsPanel__Icon} />
        {title}
      </div>
      <ul className={styles.FormTipsPanel__List}>
        {tips.map((tip, index) => (
          <li key={index} className={styles.FormTipsPanel__Item}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
