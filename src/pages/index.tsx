// import { Inter } from 'next/font/google'
import React, { useEffect } from 'react';
import Board from '@/components/Board'
import styles from './home.module.scss';

// const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  useEffect(() => {
      console.log(window.Telegram.WebApp.initData);
      console.log('unsafe', window.Telegram.WebApp.initDataUnsafe);
      // const initData = JSON.parse(window.Telegram.WebApp.initData);
      // const initDataUnsafe = JSON.parse(window.Telegram.WebApp.initDataUnsafe);

      // console.log(initData);
      // console.log(initDataUnsafe);
     },[]);


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
    </main>
  )
}

export default Home;
