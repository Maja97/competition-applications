import React from 'react';
import styles from './index.module.scss';

type Variant = 'primary' | 'secondary' | 'highlight';

interface Props {
  children: JSX.Element | string;
  variant?: Variant;
  icon?: JSX.Element;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button = ({
  onClick,
  children,
  variant = 'primary',
  icon,
  disabled = false,
  className
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles[variant]} ${styles.base} ${className}`}>
      {icon && <div>{icon}</div>}
      {typeof children === 'string' ? <p>{children}</p> : children}
    </button>
  );
};

export default Button;
