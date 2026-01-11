import React, { type ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  nonBlock?: boolean;
  loading?: boolean;
}

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  nonBlock = false,
  loading,
  ...props
}: ButtonProps) => {
  return (
    <button 
      className={`${styles.Button} ${styles[`Button--${variant}`]} ${className}`}
      style={nonBlock ? undefined : { width: "100%" }}
      onClick={onClick}
      {...props}
    >
      {loading ? "Загрузка..." : children}
    </button>
  );
};