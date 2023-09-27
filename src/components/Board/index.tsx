
import React, { useState, useEffect } from 'react';
import { calculateWinner, bestMove } from './utils';
import { SquareValue } from '../Square/models';
import Rows from '../Rows';
import styles from './board.module.scss';
import { IBoard } from './models';

const Board: React.FC<IBoard> = ({ squares, onClick, status }) => {
  return (
    <div className={styles.board}>
      <div className={styles['board__status']}>{status}</div>
      <Rows squares={squares} onClick={onClick} />
    </div>
  );
};

export default Board;