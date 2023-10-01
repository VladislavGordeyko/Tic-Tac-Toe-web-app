import { gsap } from 'gsap';
import styles from './home.module.scss';

// export function generateFallingItem(): HTMLDivElement {
//     const item = document.createElement('div');
//     item.classList.add(styles['falling-item']);
//     item.textContent = Math.random() > 0.5 ? 'X' : 'O'; // Randomly choose between X and O
//     return item;
// }

// export function generateFallingItem(): SVGSVGElement {
//     const item = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     item.classList.add(styles['falling-item']);
    
//     if (Math.random() > 0.5) {
//         // Generate an "X" shape using two lines
//         const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
//         line1.setAttribute("x1", "0");
//         line1.setAttribute("y1", "0");
//         line1.setAttribute("x2", "100");
//         line1.setAttribute("y2", "100");
//         item.appendChild(line1);

//         const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
//         line2.setAttribute("x1", "100");
//         line2.setAttribute("y1", "0");
//         line2.setAttribute("x2", "0");
//         line2.setAttribute("y2", "100");
//         item.appendChild(line2);
//     } else {
//         // Generate an "O" shape using a circle
//         const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//         circle.setAttribute("cx", "50");
//         circle.setAttribute("cy", "50");
//         circle.setAttribute("r", "48");
//         item.appendChild(circle);
//     }
    
//     return item;
// }

function generateFallingItem(): SVGSVGElement {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttributeNS(null, 'viewBox', '0 0 100 100');
  svg.setAttributeNS(null, 'width', '70');
  svg.setAttributeNS(null, 'height', '70');
  svg.classList.add('falling-item');

  if (Math.random() < 0.5) {
    // Add 'O' circle to SVG
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttributeNS(null, 'cx', '50');
    circle.setAttributeNS(null, 'cy', '50');
    circle.setAttributeNS(null, 'r', '45');
    circle.setAttributeNS(null, 'fill', 'none');
    circle.setAttributeNS(null, 'stroke', 'black');
    circle.setAttributeNS(null, 'stroke-width', '3');
    svg.appendChild(circle);
  } else {
    // Add 'X' lines to SVG
    const line1 = document.createElementNS(svgNS, 'line');
    line1.setAttributeNS(null, 'x1', '10');
    line1.setAttributeNS(null, 'y1', '10');
    line1.setAttributeNS(null, 'x2', '90');
    line1.setAttributeNS(null, 'y2', '90');
    line1.setAttributeNS(null, 'stroke', 'black');
    line1.setAttributeNS(null, 'stroke-width', '3');
    svg.appendChild(line1);

    const line2 = document.createElementNS(svgNS, 'line');
    line2.setAttributeNS(null, 'x1', '90');
    line2.setAttributeNS(null, 'y1', '10');
    line2.setAttributeNS(null, 'x2', '10');
    line2.setAttributeNS(null, 'y2', '90');
    line2.setAttributeNS(null, 'stroke', 'black');
    line2.setAttributeNS(null, 'stroke-width', '3');
    svg.appendChild(line2);
  }

  return svg;
}

export function animateFallingItem(item: SVGSVGElement): void {
  // Add the item to the container
  const container = document.querySelector('#falling-elements');
  if (container) {
    container.appendChild(item);
  }

  // Random starting position
  // const startX = (window.innerWidth - item.offsetWidth) * Math.random();
  // item.style.left = `${startX}px`;

  // const endY = window.innerHeight + item.offsetHeight;

  // gsap.fromTo(item, {
  //     y: -item.offsetHeight,
  //     opacity: 1,
  //     rotation: Math.random() * 360
  // }, {
  //     y: endY,
  //     opacity: 0.5,
  //     rotation: Math.random() * 360 + 360,
  //     ease: 'none',
  //     duration: 5 + Math.random() * 5,
  //     onComplete: () => {
  //         // Remove the item once the animation is done
  //         item.remove();
  //     }
  // });
  // const startX = Math.random() * 800;
  // item.style.left = `${startX}px`;

  // const endY = window.innerHeight + Math.random() * 600;

  const rect = item.getBoundingClientRect(); 
  const startX = (window.innerWidth - rect.width) * Math.random();
  console.log(startX);
  item.style.position = 'absolute'; // Position the SVG element absolutely
  item.style.left = `${startX}px`;
  item.style.top = `-${rect.height}px`; 


  const tl = gsap.timeline({
    onComplete: () => item.remove() // Remove the item once animation is done
  });

  // const govno = ['CS', 'PUBG'];
  // govno[Math.floor(Math.random() * govno.length)];
  const ease = ['power1.in', 'power1.out', 'power1.inOut'];
  tl.fromTo(item, {
    y: -rect.height + Math.random() * -100,
    opacity: 1 * Math.random() ,
    rotation: Math.random() * 360
  },{
    y: window.innerHeight + rect.height,
    opacity: .4 * Math.random(),
    rotation: Math.random() * 180 + 360,
    ease: 'power1.inOut',
    // ease: ease[Math.floor(Math.random() * ease.length)],
    duration: 6 + Math.random() * 2
  });

  // const x = Math.random() * 600
  // tl.fromTo(item, {
  //     left: x,
  //     y: Math.random() * -100,
  //     opacity: 0,
  //     rotation: Math.random() * 360
  // }, {
  //     // y:  endY,
  //     left: x,
  //     opacity: 0.6,
  //     rotation: Math.random() * 360 + 360,
  //     ease: "power1.in",
  //     duration: 5 + Math.random() * 5
  // });
}

export function startRandomGeneration(): NodeJS.Timeout {
  const int = setInterval(() => {
    const item = generateFallingItem();
    animateFallingItem(item);
  }, 1000); // Generate a new item every second; adjust as needed
  return int;
}
