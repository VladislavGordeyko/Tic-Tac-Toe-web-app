
import React, { useState, useEffect } from 'react';
import { calculateWinner, bestMove } from './utils';
import { SquareValue } from '../Square/models';
import Rows from '../Row';
import styles from './board.module.scss';

const Board: React.FC = () => {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState(calculateWinner(squares));
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (winner || !squares.includes(null)) {
      window.Telegram.WebApp.MainButton.text = 'Restart Game';
      window.Telegram.WebApp.MainButton.show();
      window.Telegram.WebApp.MainButton.onClick(restartGame);
    }
  },[winner, squares]);

  useEffect(() => {
    if (winner) {
      setStatus(`Winner: ${winner}`);
    } else if (!squares.includes(null)) {
      setStatus('Draw!');
    } else {
      setStatus(`Next player: ${isXNext ? 'X' : 'O'}`);
    }
  }, [squares, winner]);

  useEffect(() => {
    setWinner(calculateWinner(squares))
  }, [squares]);

  const makeMove = (index: number) => {
    const squaresCopy = squares.slice();
    squaresCopy[index] = 'O';
    setSquares(squaresCopy);
    setIsXNext(true);
  };

  useEffect(() => {
    if (!isXNext && !calculateWinner(squares)) {
      const move = bestMove(squares, 'O');
      if (move !== -1) makeMove(move);
    }
  }, [squares, isXNext]);

  const restartGame = ()  => {
    window.Telegram.WebApp.MainButton.hide();
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const handleClick = (index: number) => {
    if (squares[index] || calculateWinner(squares)) return;
    const squaresCopy = squares.slice();
    squaresCopy[index] = 'X';
    setSquares(squaresCopy);
    setIsXNext(false);
  };

  return (
    <div className={styles.board}>
      <div className={styles['board__status']}>{status}</div>
      <Rows squares={squares} onClick={handleClick} />
    </div>
  );
};

export default Board;