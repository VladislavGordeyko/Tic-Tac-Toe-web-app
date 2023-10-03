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
  const [, setSpectators] = useState<IBaseClient[]>();
  const { lastMessage, isLoading, error } = useWebSocketContext();

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      const tgService = new TelegramService;
      switch (data.type) {
      case 'SESSION_JOINED':
        setIsSessionExist(true);
        const gameStatus : IGameStatus = data.gameStatus;
        const players: IPlayer[] = data.players;
        const spectators : IBaseClient[] = data.spectators;
        
        if (!clientId) {
          const isCurrentClientSpectator = spectators.some(i=> i.clientId === data.clientId);
          setIsSpectator(isCurrentClientSpectator);
          setClientId(data.clientId);
        }

        setPlayers(players);
        setSpectators(spectators);
        setGameStatus(gameStatus);
        setSessionId(data.sessionId);
        break;

      case 'SESSION_CREATED':
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