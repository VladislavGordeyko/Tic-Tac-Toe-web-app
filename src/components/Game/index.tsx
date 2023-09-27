
import React, { useState, useEffect } from 'react';
import Board from '../Board';
import { IGame, IGameStatus } from './models';
import useWebSocket from 'react-use-websocket';
import { TelegramService } from '@/services/TelegramService';

const SOCKET_URL = 'ws://localhost:3000';

// const onSendDataDirectly = (sessionId: string) => {
//     const postData = {
//       sessionId: sessionId
//     };
//     fetch('http://localhost:3000', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(postData)
//   })
//   .then(response => response.json())
//   .catch(error => {
//     console.error("There was an error with the POST request:", error);
//   });
//  }


const Game: React.FC<IGame> = ({ type, session }) => {
    // const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState<boolean>(true);
    const [isCurrentMove, setIsCurrentMove] = useState<boolean>(false);
    // const [winner, setWinner] = useState(calculateWinner(squares));
    const [status, setStatus] = useState('');
    // const [session, setSession] = useState(sessionId);
    const [sessionId, setSessionId] = useState(session);
    const [clientId, setClientId] = useState('');
    const [gameStatus, setGameStatus] = useState<IGameStatus>();

    const { sendMessage, lastMessage, readyState } = useWebSocket(SOCKET_URL, {
        onOpen: () => {
            if (sessionId) {
                sendMessage(JSON.stringify({ type: 'JOIN_SESSION', sessionId, telegramData: window.Telegram.WebApp.initDataUnsafe }));
            } else {
                sendMessage(JSON.stringify({ type: 'CREATE_SESSION', telegramData: window.Telegram.WebApp.initDataUnsafe }));
            }
        },
        shouldReconnect: (closeEvent) => true, // Will attempt to reconnect on all close events, such as server shutting down
    });

    useEffect(() => {
        const chatID = window.Telegram.WebApp.initDataUnsafe.chat_instance;
        const tgService = new TelegramService;
        if (lastMessage) {
            // console.log({lastMessage})
            const data = JSON.parse(lastMessage.data);
            switch (data.type) {
                case 'SESSION_CREATED':
                    console.log('SESSION_CREATED');
                    setSessionId(data.sessionId);
                    setClientId(data.clientId);
                    setGameStatus(data.gameStatus);
                    console.log({data});

                    if (chatID) {
                        tgService.sendGameInviteToChat('Test', parseInt(chatID), data.sessionId);
                    }
                    

                    // onSendDataDirectly(data.sessionId);
                    break;

                case 'SESSION_JOINED':
                    console.log('SESSION_JOINED', {data});
                    setGameStatus(data.gameStatus);
                    if (!clientId) {
                        setClientId(data.clientId);
                    }
                   
                    break;

                case 'MOVE':
                    console.log('MOVE', {data});
                    setGameStatus(data.gameStatus);
                    break;

                case 'ERROR':
                    console.log('ERROR');
                    break;

                default:
                    break;
            }
        }
    }, [lastMessage]);

    // useEffect(() => {
    //   if (winner || !squares.includes(null)) {
    //     window.Telegram.WebApp.MainButton.text = 'Restart Game';
    //     window.Telegram.WebApp.MainButton.show();
    //     window.Telegram.WebApp.MainButton.onClick(restartGame);
    //   }
    // },[winner, squares]);
  
    // useEffect(() => {
    //   if (gameStatus?.winner) {
    //     setStatus(`Winner: ${gameStatus.winner}`);
    //   } else if (!gameStatus?.squares.includes(null)) {
    //     setStatus('Draw!');
    //   } else {
    //     setStatus(`Next player: ${isXNext ? 'X' : 'O'}`);
    //   }
    // }, [gameStatus]);
  
    // useEffect(() => {
    //     setWinner(calculateWinner(squares))
    // }, [squares]);
  
    const makeMove = (index: number) => {
        // const squaresCopy = squares.slice();
        // squaresCopy[index] = 'O';
        // setSquares(squaresCopy);
        setIsXNext(true);
    };
  
    // useEffect(() => {
    //     if (!isXNext && !calculateWinner(squares) && type === 'BOT') {
    //         const move = bestMove(squares, 'O');
    //         if (move !== -1) makeMove(move);
    //     }
    // }, [squares, isXNext]);
  
    // const restartGame = ()  => {
    //     window.Telegram.WebApp.MainButton.hide();
    //     setSquares(Array(9).fill(null));
    //     setIsXNext(true);
    //     setWinner(null);
    // };
  
    const handleClick = (index: number) => {
        if (gameStatus?.squares[index] || gameStatus?.winner) return;
        // const squaresCopy = squares.slice();
        // squaresCopy[index] = isXNext ? 'X' : 'O';
        // setSquares(squaresCopy);
        // setIsXNext(!isXNext);
        // console.log({clientId}, gameStatus?.currentMoveClientId)
        if (clientId === gameStatus?.currentMoveClientId && gameStatus.started) {
            sendMessage(JSON.stringify({ type: 'MOVE', sessionId, clientId, index  }));
        }

    };

  return (
    <Board squares={gameStatus?.squares || Array(9).fill(null)} onClick={handleClick} status={gameStatus?.status || ''} />
  );
};

export default Game;