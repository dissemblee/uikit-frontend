import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "transparent";
  isLoading?: boolean;
  nonBlock?: boolean
}

export const Button = ({
  children,
  variant = "primary",
  className,
  isLoading,
  nonBlock = false,
  ...props
}: ButtonProps) => {
  const classNames = `${styles.Button} ${styles[`Button--${variant}`] || ""} ${className || ""} ${nonBlock ? "" : styles[`Button--block`]}`;
  return (
    <button className={classNames} {...props}>
      {isLoading ? "..." : children}
    </button>
  );
};
