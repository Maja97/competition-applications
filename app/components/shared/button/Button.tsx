import React from 'react';
import styles from './button.module.scss';

type Variant = 'primary' | 'secondary';

interface Props {
  text: string;
  variant?: Variant;
  icon?: JSX.Element;
  disabled?: boolean;
}

const Button = ({ text, variant = 'primary', icon, disabled = false }: Props) => {
  return (
    <button disabled={disabled} className={`${styles[variant]} ${styles.base}`}>
      {icon && <div>{icon}</div>}
      <p>{text}</p>
    </button>
  );
};

export default Button;
