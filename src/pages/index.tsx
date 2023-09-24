// import { Inter } from 'next/font/google'
import Board from '@/components/Board'
import styles from './home.module.scss';

// const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
     // <main className={`${styles.home} ${inter.className}`}>
    <main className={styles.home}>
      <Board />
    </main>
  )
}

export default Home;
