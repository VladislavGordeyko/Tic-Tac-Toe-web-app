
// import React, { useState, useEffect } from 'react';
// import Board from '../Board';
// import { IGame } from './models';
// import { bestMove, calculateWinner } from '../Board/utils';
// import { SquareValue } from '../Square/models';
// // import { connectSocket } from '@/utils/sockets';
// // import ReconnectingWebSocket from 'reconnecting-websocket';


// const Game: React.FC<IGame> = ({ type, sessionId }) => {
//     const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
//     const [isXNext, setIsXNext] = useState<boolean>(true);
//     const [winner, setWinner] = useState(calculateWinner(squares));
//     const [status, setStatus] = useState('');
//     const [session, setSession] = useState(sessionId);

//     // const [socket, setSocket] = useState<WebSocket | null>(null);
//     // const [ws, setWs] = useState<ReconnectingWebSocket | null>(null);
//     const [ws, setWs] = useState<WebSocket | null>(null);

//     useEffect(() => {

//         // const socket = new ReconnectingWebSocket('ws://localhost:3000');
//         if (type === 'BOT') return;

//         const newWs = new WebSocket('ws://localhost:3000');
//         if (session) {
//             newWs.onopen = () => {
//               newWs.send(JSON.stringify({
//                 type: 'JOIN',
//                 sessionId: session
//               }));
//             };
//           } else {
//             // If no sessionId prop is provided, we want to create a new session.
//             newWs.onopen = () => {
//               newWs.send(JSON.stringify({
//                 type: 'CREATE'
//               }));
//             };
//           }
    
//           newWs.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             switch (data.type) {
//                 case 'SESSION_CREATED':
//                     console.log('SESSION_CREATED', data);
//                     setSession(data.sessionId);
//                     const onSendDataDirectly = () => {
//                         const postData = {
//                           sessionId: data.sessionId
//                         };
//                         fetch('http://localhost:3000', {
//                         method: 'POST',
//                         headers: {
//                           'Content-Type': 'application/json'
//                         },
//                         body: JSON.stringify(postData)
//                       })
//                       .then(response => response.json())
//                       .catch(error => {
//                         console.error("There was an error with the POST request:", error);
//                       });
//                      }
//                      onSendDataDirectly();
//                     // Handle the creation of a new session
//                     break;
                
//                 case 'SESSION_JOINED': 
//                     console.log('SESSION_JOINED');
//                     // Handle joining an existing session
//                     break;
                
//                 case 'MOVE':
//                     console.log('MOVE', data);
//                     setSquares(data.squares);
//                     setIsXNext(!isXNext); // Toggle the player
//                     break;
                
//                 case 'ERROR':
//                     console.log('ERROR');
//                     break;
                
//                 default:
//                     break;
//             }
//         };
        
    
//         setWs(newWs);

//         return () => {
//           if (newWs) {
//             newWs.close();
//           }
//         };
//       }, []);

//     useEffect(() => {
//       if (winner || !squares.includes(null)) {
//         window.Telegram.WebApp.MainButton.text = 'Restart Game';
//         window.Telegram.WebApp.MainButton.show();
//         window.Telegram.WebApp.MainButton.onClick(restartGame);
//       }
//     },[winner, squares]);
  
//     useEffect(() => {
//       if (winner) {
//         setStatus(`Winner: ${winner}`);
//       } else if (!squares.includes(null)) {
//         setStatus('Draw!');
//       } else {
//         setStatus(`Next player: ${isXNext ? 'X' : 'O'}`);
//       }
//     }, [squares, winner]);
  
//     useEffect(() => {
//         setWinner(calculateWinner(squares))
//     }, [squares]);
  
//     const makeMove = (index: number) => {
//         const squaresCopy = squares.slice();
//         squaresCopy[index] = 'O';
//         setSquares(squaresCopy);
//         setIsXNext(true);
//     };
  
//     useEffect(() => {
//         if (!isXNext && !calculateWinner(squares) && type === 'BOT') {
//             const move = bestMove(squares, 'O');
//             if (move !== -1) makeMove(move);
//         }
//     }, [squares, isXNext]);
  
//     const restartGame = ()  => {
//         window.Telegram.WebApp.MainButton.hide();
//         setSquares(Array(9).fill(null));
//         setIsXNext(true);
//         setWinner(null);
//     };
  
//     const handleClick = (index: number) => {
//         if (squares[index] || calculateWinner(squares)) return;
//     const squaresCopy = squares.slice();
//     squaresCopy[index] = isXNext ? 'X' : 'O';
//     setSquares(squaresCopy);
//     setIsXNext(!isXNext);

//     if (ws && ws.readyState === WebSocket.OPEN) {
//         ws.send(JSON.stringify({ 
//             type: 'MOVE',
//             sessionId: session,
//             index
//         }));
//     }
//     };

//   return (
//     <Board squares={squares} onClick={handleClick} status={status} />
//   );
// };

// export default Game;