import React, { type ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'cancel' | 'danger';
type ButtonSize    = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  nonBlock?: boolean;
  loading?: boolean;
  loadingText?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
}

export const Button = ({
  children,
  onClick,
  variant  = 'primary',
  size     = 'md',
  nonBlock = false,
  loading  = false,
  loadingText = 'Загрузка...',
  iconLeft,
  iconRight,
  className = '',
  ...props
}: ButtonProps) => {
  const classes = [
    styles.Button,
    styles[`Button--${variant}`],
    styles[`Button--${size}`],
    loading && styles['Button--loading'],
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      style={nonBlock ? undefined : { width: '100%' }}
      onClick={onClick}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className={styles.Button__inner}>
          <span className={styles.Button__spinner} />
          <span>{loadingText}</span>
        </span>
      ) : (
        <span className={styles.Button__inner}>
          {iconLeft  && <span className={styles.Button__icon}>{iconLeft}</span>}
          {children}
          {iconRight && <span className={styles.Button__icon}>{iconRight}</span>}
        </span>
      )}
    </button>
  );
};
