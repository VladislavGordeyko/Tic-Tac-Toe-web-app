import React from 'react';
import { ISquare } from './models';
import styles from './square.module.scss';

const Square: React.FC<ISquare> = ({ value, onClick }) => (
  <button className={styles.square} onClick={onClick}>
    {value}
  </button>
);

export default Square;