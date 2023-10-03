import React, { useEffect, useState } from 'react';
import { ILobby } from './models';
import Game from '../Game';
import { useWebSocketContext } from '@/context/WebSocketContext';
import { SESSIONNOTEXISTTEXT } from './constants';
import {  IBaseClient, IGameStatus, IPlayer } from '@/entities/game';
import { TelegramService } from '@/services/TelegramService';
import Spinner from '../Spinner';
import styles from './lobby.module.scss';

const Lobby: React.FC<ILobby> = ({ chatId, session }) => {
  const [isSessionExist, setIsSessionExist] = useState<boolean | undefined>();
  const [sessionId, setSessionId] = useState(session);
  const [players, setPlayers] = useState<IPlayer[]>();
  const [isSpectator, setIsSpectator] = useState<boolean | undefined>();
  const [clientId, setClientId] = useState('');
  const [gameStatus, setGameStatus] = useState<IGameStatus>();
  const [spectators, setSpectators] = useState<IBaseClient[]>();

  const { lastMessage, isLoading, error } = useWebSocketContext();

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
        const spectators : IBaseClient[] = data.spectators;
        const isCurrentClientSpectator = spectators.some(i=> i.clientId === clientId);
        setIsSpectator(isCurrentClientSpectator);
        
        setPlayers(players);
        setSpectators(spectators);
        setGameStatus(gameStatus);
        setSessionId(data.sessionId);
        console.log({chatId});
        if (!clientId) {
          setClientId(data.clientId);
        }
                   
        break;

      case 'SESSION_CREATED':
        console.log(data);
       
        setIsSessionExist(true);
        setPlayers(data.players);
        setClientId(data.clientId);
        setGameStatus(data.gameStatus);

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

  const getComponentInitComponent = () => {
    switch (isSessionExist) {
    case true: return <Game 
      clientId={clientId}
      gameStatusUpdate={gameStatus} 
      sessionId={sessionId} 
      players={players} 
      isSpectator={isSpectator}
    />;
    case false : return <h1 className={styles['lobby__text']}>{SESSIONNOTEXISTTEXT}</h1>;
    case undefined: return <Spinner />;
    }
  };

  return (
    <>
      {isLoading ? <Spinner /> : error ? <span>Connection Error</span> :  getComponentInitComponent()}
    </>
    
  );
};

export default Lobby;