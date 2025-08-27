import { ReactNode } from "react";
import styles from "./Button.module.scss"

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "transparent";
}

export const Button = ({ children, onClick, type = "button", variant = "primary"}: ButtonProps) => {
  const classNames = `${styles.Button} ${styles[`Button--${variant}`] || ""}`;

  return (
    <button type={type} onClick={onClick} className={classNames}>
      {children}
    </button>
  );
};
