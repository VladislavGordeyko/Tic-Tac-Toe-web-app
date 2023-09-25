import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ISquare } from './models';
import styles from './square.module.scss';

const Square: React.FC<ISquare> = ({ value, onClick }) => {
  const squareRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (value === 'X' && squareRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(squareRef.current.children[0], 
        { scaleX: 0 }, 
        { 
          scaleX: 1, 
          duration: 0.5,  
          ease: "power2.in"
         }
        )
        .fromTo(squareRef.current.children[1], 
          { scaleX: 0 }, 
          { 
            scaleX: 1, 
            duration: 0.5,  
            ease: "power2.inOut" 
          }
          );
    } else if (value === 'O' && circleRef.current) {
      const circumference = 2 * Math.PI * 40;
      gsap.fromTo(circleRef.current, 
        { 
          strokeDasharray: `${circumference} ${circumference}`,
          strokeDashoffset: circumference 
        },
        { 
          strokeDashoffset: 0, 
          duration: 1,
          ease: "power4.inOut",
        }
      );
    }
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
          <circle ref={circleRef} cx="50" cy="50" r="40" fill="none" stroke="var(--tg-theme-link-color, black)" strokeWidth="2" />
        </svg>
      }
    </button>
  );
};

export default Square;