import { RefObject }from 'react';
import { gsap } from 'gsap';
import { SquareValue } from './models';

export const animateXorO = (value:SquareValue, squareRef: RefObject<HTMLDivElement>, circleRef:RefObject<SVGCircleElement> ) => {
  if (value === 'X' && squareRef.current) {
    const tl = gsap.timeline();
    tl
      .fromTo(squareRef.current.children[0], 
        { scaleX: 0 }, 
        { 
          scaleX: 1, 
          duration: 0.5,  
          ease: 'power2.in'
        }
      )
      .fromTo(squareRef.current.children[1], 
        { scaleX: 0 }, 
        { 
          scaleX: 1, 
          duration: 0.5,  
          ease: 'power2.inOut' 
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
        ease: 'power4.inOut',
      }
    );
  }
};