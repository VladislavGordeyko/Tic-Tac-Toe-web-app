import React, { useEffect, useState } from 'react';
import styles from './home.module.scss';
import Button from '@/components/Button';
import Lobby from '@/components/Lobby';
import { GameType } from '@/entities/game';
import BOTGame from '@/components/Game/BOTGame';
import { WebSocketProvider } from '@/context/WebSocketContext';

const Home = () => {
  const [session, setSession] = useState<string>();
  const [chatId, setChatId] = useState<string>();
  const [gameType, setGameType] = useState<GameType>('Unnasigned');

  useEffect(() => {  
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
    console.log('unsafe', window.Telegram.WebApp.initDataUnsafe);

    const data = window.Telegram.WebApp.initDataUnsafe.start_param  || 'chatId__-1001828521159';
    if (data) {
      console.log({data});
      if (data.includes('chatId')) {
        setChatId(data.split('__')[1]);
        console.log('setting the chatId', data.split('__')[1]);
      } else if (data.includes('sessionId')) {
        setSession(data.split('__')[1]);
        setGameType('Player');
        console.log('setting the sessionId', data.split('__')[1]);
      }
    }
  }, []);

  // Animation
  // useEffect(() => {
  //   let intervalId: NodeJS.Timeout;
  //   intervalId = startRandomGeneration();
  //   return(() => clearInterval(intervalId))
  // }, []);

  const renderMainComponent = () => {
    switch (gameType) {
    case 'BOT': return <BOTGame />;
    case 'Player': return(
      <WebSocketProvider sessionId={session}>
        <Lobby chatId={chatId} session={session} />
      </WebSocketProvider>
    );
    default:
    case 'Unnasigned': return <>
      <span className={styles['home__title']}>Tic Tac Toe</span>
      <div className={styles['home__buttons']}>
        <Button onClick={() => setGameType('Player')} text='Play vs friend'/>
        <Button onClick={() => setGameType('BOT')} text='Play vs Bot'/>
      </div>
    </>;
    }
  };

  return (
    <main className={styles.home}>
      {renderMainComponent()}
    </main>
  );
};

export default Home;
