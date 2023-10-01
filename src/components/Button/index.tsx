import React from 'react';
import { IButton } from './models';
import styles from './button.module.scss';

const Button: React.FC<IButton> = ({ onClick, text }) => {
  return (
    <button 
      className={styles.button}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;