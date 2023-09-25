
import React, { useState, useEffect, useCallback } from 'react';
import { calculateWinner, findWinningMove, randomMove, bestMove } from './utils';
import { SquareValue } from '../Square/models';
import Square from '../Square';
import styles from './board.module.scss';

const Board: React.FC = () => {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState(calculateWinner(squares));
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (winner || !squares.includes(null)) {
      console.log('inside of condition');
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

  const renderSquare = (index: number) => (
    <Square value={squares[index]} onClick={() => handleClick(index)} />
  );

  // const getTgButton = useCallback(() => {
  //   console.log(window.Telegram.WebApp.MainButton.isProgressVisible)
  // },[window]);
  

  // const closeTgButton = () => {
  //   window.Telegram.WebApp.MainButton.hide();
  // }

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
      {/* <button onClick={getTgButton}>get telegram button state</button>
      <button onClick={closeTgButton}>close Tg button</button> */}
      {/* {(winner || !squares.includes(null)) && (
        <button onClick={restartGame} className="restart-button">Restart Game</button>
      )} */}
    </div>
  );
};

export default Board;