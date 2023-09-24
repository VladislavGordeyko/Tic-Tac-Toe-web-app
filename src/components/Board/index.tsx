
import React, { useState, useEffect } from 'react';
import { calculateWinner, findWinningMove, randomMove } from './utils';
import { SquareValue } from '../Square/models';
import Square from '../Square';
import styles from './board.module.scss';

const Board: React.FC = () => {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);

  useEffect(() => {
    if (!isXNext && !calculateWinner(squares) && !squares.includes(null)) {
      return;  // If it's a draw, don't let the computer make a move
    }

    if (!isXNext && !calculateWinner(squares)) {
      const move = findWinningMove(squares, 'O') || findWinningMove(squares, 'X') || randomMove(squares);
      if (move !== null) makeMove(move);
    }
  }, [squares, isXNext]);

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const makeMove = (index: number) => {
    const squaresCopy = squares.slice();
    squaresCopy[index] = 'O';
    setSquares(squaresCopy);
    setIsXNext(true);
  };

  const handleClick = (index: number) => {
    if (squares[index] || calculateWinner(squares)) return;
    const squaresCopy = squares.slice();
    squaresCopy[index] = 'X';
    setSquares(squaresCopy);
    setIsXNext(false);
  };

  const renderSquare = (index: number) => (
    <Square value={squares[index]} onClick={() => handleClick(index)} />
  );

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (!squares.includes(null)) {
    status = 'Draw!';
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className={styles.board}>
      <div className={styles['board__status']}>{status}</div>
      <div className={`${styles['board__board-row']} ${styles['board__board-row--top']}`}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className={styles['board__board-row']}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className={`${styles['board__board-row']} ${styles['board__board-row--bottom']}`}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {(winner || !squares.includes(null)) && (
        <button onClick={restartGame} className={styles['board__restart-button']}>Restart Game</button>
      )}
    </div>
  );
};

export default Board;