import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "transparent";
}

export const Button = ({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  const classNames = `${styles.Button} ${styles[`Button--${variant}`] || ""} ${className || ""}`;

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
};
