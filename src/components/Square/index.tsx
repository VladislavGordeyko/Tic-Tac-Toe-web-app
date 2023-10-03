import React, { useEffect, useRef } from 'react';
import { ISquare } from './models';
import { animateXorO } from './animations';
import styles from './square.module.scss';

const Square: React.FC<ISquare> = ({ value, onClick }) => {
  const squareRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    animateXorO(value, squareRef, circleRef);
  }, [value]);

  return (
    <button 
      className={`${styles.square} ${value ? value === 'X' ? 'X' : 'O' : ''}`}
      onClick={onClick}
    >
      {value === 'X' && 
        <div 
          ref={squareRef} 
          className={styles['square__container']}
        >
          <div className={`${styles.line} ${styles.line1}`}/>
          <div className={`${styles.line} ${styles.line2}`}/>
        </div>
      }
      {value === 'O' && 
          <svg className={styles.circle} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle 
              ref={circleRef} 
              cx="50" 
              cy="50" 
              r="40" 
              fill="none" 
              stroke="var(--tg-theme-link-color, black)" 
              strokeWidth="2"
            />
          </svg>
      }
    </button>
  );
};

export default Square;