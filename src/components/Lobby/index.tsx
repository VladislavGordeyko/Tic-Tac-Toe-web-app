import React, { useEffect, useState } from 'react';
import { ILobby } from './models';
import Game from '../Game';
import styles from './lobby.module.scss';
import { useWebSocketContext } from '@/context/WebSocketContext';
import { SESSIONNOTEXISTTEXT } from './constants';
import { IGameStatus, IPlayer } from '@/entities/game';
import { TelegramService } from '@/services/TelegramService';

const Lobby: React.FC<ILobby> = ({ chatId, session }) => {
  const [isSessionExist, setIsSessionExist] = useState(false);
  const [sessionId, setSessionId] = useState(session);
  const [players, setPlayers] = useState<IPlayer[]>();
  const [clientId, setClientId] = useState('');
  const [gameStatus, setGameStatus] = useState<IGameStatus>();

  const [spectators, setSpectators] = useState<IPlayer[]>();

  const { sendMessage, lastMessage, readyState } = useWebSocketContext();

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      const tgService = new TelegramService;
      switch (data.type) {
      case 'SESSION_JOINED':
        setIsSessionExist(true);
        console.log('SESSION_JOINED', {data});
        
        const gameStatus : IGameStatus = data.gameStatus;
        const players: IPlayer[] = data.players;
        const spectators = players.filter(i => i.isSpectator);
        
        setPlayers(players);
        setSpectators(spectators);
        setGameStatus(gameStatus);
        setSessionId(data.sessionId);
        console.log({chatId});
        if (chatId) {
          tgService.sendGameInviteToChat('Test', chatId, data.sessionId);
        }
        if (!clientId) {
          setClientId(data.clientId);
        }
                   
        break;

      case 'SESSION_CREATED':
        console.log(data);
       
        setIsSessionExist(true);
        setPlayers(data.players);
        setClientId(data.clientId);

        if (chatId) {
          tgService.sendGameInviteToChat('Test', chatId, data.sessionId);
        }
        
        break;
      
      case 'SESSION_ERROR': 
        setIsSessionExist(false);
        break;
      }
    }
  }, [lastMessage]);

  // useEffect(() => {  
  //   const userId = window.Telegram.WebApp.initDataUnsafe.user?.id || 73630328;
  // },[]);

  // useEffect(() => {  
  //   console.log(lastMessage);
  // },[lastMessage]);

  // const onSendData = () => {
  //   window.Telegram.WebApp.sendData(JSON.stringify({data: 'Some data'}));
  // };

  // const onChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   setMessage(e.currentTarget.value);
  // };

  return (
    <>
      {isSessionExist ? 
        <Game 
          clientId={clientId}
          gameStatusUpdate={gameStatus} 
          sessionId={sessionId} 
          players={players} 
        />
        : 
        <h1 className={styles['lobby__text']}>{SESSIONNOTEXISTTEXT}</h1>
      }
    </>
    
  );
};

export default Lobby;