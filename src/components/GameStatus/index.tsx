import React from 'react';
import { IPlayersLabel } from './models';
import { IPlayer } from '@/entities/game';
import styles from './gameStatus.module.scss';
import Image from 'next/image';

const GameStatus: React.FC<IPlayersLabel> = ({ players, status, currentMoveClientId }) => {
  const playerCardComponent = (player: IPlayer) => {
    return <div className={styles['player-card']}>
      <div className={`${styles['player-image-container']} ${player.clientId === currentMoveClientId && styles['player-image-container--active']}`}>
        {player.avatar !== '' ?
          <>
            <Image 
              className={styles['player-image-container__image']} 
              alt='player-avatar'
              height={50}
              width={50}
              src={player.avatar}
            />
            {player.score > 0 && <div className={styles['player-image-container__score']}>
              {player.score}
            </div>}
            
          </>
          : <div 
            className={`${styles['player-image-container']}  ${player.clientId === currentMoveClientId && styles['player-image-container--active']}`}>
            <div className={`${styles['player-image-container--mock']}`}><Image 
              className={styles['player-image-container__image-mock']} 
              alt='player-avatar-mock'
              height={25}
              width={25}
              src='/assets/smile.svg'
            /> 
            </div>
            {player.score > 0 && <div className={styles['player-image-container__score']}>
              {player.score}
            </div>}
          </div> 
        } 
        
      </div>   
      <span className={styles['player-card__name']}>{player.userName}</span>
    </div>;
  }; 

  const emptyPlayerComponent = () => 
    <div className={styles['player-card']}>
      <picture>
        <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f914/512.webp" type="image/webp"/>
        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f914/512.gif" alt="🤔" width="32" height="32"/>
      </picture>
    </div>;

  return (
    <div className={styles['game-status']}>
      <div className={styles['game-status__text']}>{status}</div>
      <div className={styles['game-status__cards']}>
        {players && <>
          {playerCardComponent(players[0])}
            VS
          {players[1] !== undefined ? 
            playerCardComponent(players[1]) : 
            emptyPlayerComponent()
          }
        </>}
      </div>  
    </div>
  );
};

export default GameStatus;