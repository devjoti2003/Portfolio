'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Preloader() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [dnaSeq, setDnaSeq] = useState('ATCG');

  // Total preloader duration will be 2 seconds for counting, then 1.5s for exit
  useEffect(() => {
    let currentProgress = 0;
    const chars = 'ATCG';
    
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 5) + 1;
      if (currentProgress > 100) currentProgress = 100;
      setProgress(currentProgress);

      let seq = '';
      for (let i = 0; i < 8; i++) {
        seq += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setDnaSeq(seq);

      if (currentProgress === 100) {
        clearInterval(interval);
      }
    }, 40); // 40ms * 25-30 ticks = ~1-1.2 seconds to reach 100

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (progress === 100) {
      // Exit animation
      const tl = gsap.timeline();
      
      tl.to('.preloader-content', {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: 'power3.in',
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: 'power4.inOut',
        onComplete: () => {
          // completely remove it from DOM or hide it
          if (containerRef.current) containerRef.current.style.display = 'none';
        }
      });
    }
  }, { dependencies: [progress], scope: containerRef });

  return (
    <div className="preloader-overlay" ref={containerRef}>
      <div className="preloader-content">
        <div className="preloader-dna">{dnaSeq}</div>
        <div className="preloader-counter">{progress}%</div>
        <div className="preloader-bar-container">
          <div className="preloader-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}
