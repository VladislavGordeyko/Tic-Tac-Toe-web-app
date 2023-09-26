// import { Inter } from 'next/font/google'
import React, { useEffect, useState } from 'react';
import Board from '@/components/Board'
import styles from './home.module.scss';

// const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  const [message, setMessage] = useState('');
  useEffect(() => {
      console.log(window.Telegram.WebApp.initData);
      console.log('unsafe', window.Telegram.WebApp.initDataUnsafe);
      // const initData = JSON.parse(window.Telegram.WebApp.initData);
      // const initDataUnsafe = JSON.parse(window.Telegram.WebApp.initDataUnsafe);

      // console.log(initData);
      // console.log(initDataUnsafe);
     },[]);

     const onSendData = () => {
      window.Telegram.WebApp.sendData(JSON.stringify({data: 'Some data'}));
     }

     const onSendDataDirectly = () => {
      const postData = {
        message
      };
      fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .catch(error => {
      console.error("There was an error with the POST request:", error);
    });
     }

     const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value);
     }


  return (
    <main className={styles.home}>
      <div className={styles.colors}>
        <div className={styles.color} style={{backgroundColor: 'var(--tg-theme-bg-color)'}}/>
        <div className={styles.color} style={{backgroundColor: 'var(--tg-theme-text-color)'}}/>
        <div className={styles.color} style={{backgroundColor: 'var(--tg-theme-hint-color)'}}/>
        <div className={styles.color} style={{backgroundColor: 'var(--tg-theme-link-color)'}}/>
        <div className={styles.color} style={{backgroundColor: 'var(--tg-theme-button-color)'}}/>
        <div className={styles.color} style={{backgroundColor: 'var(--tg-theme-button-text-color)'}}/>
        <div className={styles.color} style={{backgroundColor: 'var(--tg-theme-secondary-bg-color)'}}/>
      </div>
      <Board />
      <button onClick={onSendData}>Send data</button>
      <input value={message} onChange={onChange} />
      <button onClick={onSendDataDirectly}>Send data</button>
    </main>
  )
}

export default Home;
