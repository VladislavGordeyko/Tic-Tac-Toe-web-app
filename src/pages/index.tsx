// import { Inter } from 'next/font/google'
import React, { useEffect, useState } from 'react';
import Board from '@/components/Board'
import styles from './home.module.scss';
import Button from '@/components/Button';
import Game from '@/components/Game';
import { WebAppInitData } from '@twa-dev/types';

// const inter = Inter({ subsets: ['latin'] })

interface Data extends WebAppInitData {
  session: string;
}

const Home = () => {
  const [message, setMessage] = useState('');
  const [session, setSession] = useState<string>();
  const [chatId, setChatId] = useState<string>();
  const [type, setType] = useState<'BOT' | 'Player'>()
  useEffect(() => {
      console.log(window.Telegram.WebApp.initData);
      console.log('unsafe', window.Telegram.WebApp.initDataUnsafe);
      const data = window.Telegram.WebApp.initDataUnsafe.start_param;
      if (data) {
        const parsedData: {chatId?: string, sessionId?: string} = JSON.parse(data);
        console.log({parsedData})
        if (parsedData.chatId) {
          setChatId(chatId);
        } else if (parsedData.sessionId) {
          setSession(parsedData.sessionId);
        }
        
        setType('Player')
        console.log('session!', data)
      }

     },[]);

     const onSendData = () => {
      window.Telegram.WebApp.sendData(JSON.stringify({data: 'Some data'}));
     }

    //  const onSendDataDirectly = () => {
    //     const postData = {
    //       sessionId: message
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

     const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value);
     }

     const setPlayersGame = () => {
      setType('Player')
     }

     const setBOTGame = () => {
      setType('BOT')
     }


  return (
    <main className={styles.home}>
      {/* <div className={styles.colors}>
        <div className={styles.color} style={{backgroundColor: 'var(--tg-theme-bg-color)'}}/>
        <div className={styles.color} style={{backgroundColor: 'var(--tg-theme-text-color)'}}/>
        <div className={styles.color} style={{backgroundColor: 'var(--tg-theme-hint-color)'}}/>
        <div className={styles.color} style={{backgroundColor: 'var(--tg-theme-link-color)'}}/>
        <div className={styles.color} style={{backgroundColor: 'var(--tg-theme-button-color)'}}/>
        <div className={styles.color} style={{backgroundColor: 'var(--tg-theme-button-text-color)'}}/>
        <div className={styles.color} style={{backgroundColor: 'var(--tg-theme-secondary-bg-color)'}}/>
      </div> */}
      {!type && <div className={styles['home__buttons']}>
        <Button onClick={setPlayersGame}  text='Play vs friend'/>
        <Button onClick={setBOTGame}  text='Play vs Bot'/>
      </div>}
      {type && <Game type={type} session={session} />}
    </main>
  )
}

export default Home;
