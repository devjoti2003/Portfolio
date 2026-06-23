'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Preloader() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Wait for just a moment to let the black screen linger, then slide it out
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: 'power4.inOut',
      onComplete: () => {
        // completely remove it from DOM or hide it
        if (containerRef.current) containerRef.current.style.display = 'none';
      }
    });
  }, { scope: containerRef });

  return (
    <div className="preloader-overlay" ref={containerRef}>
      {/* Just a pure black screen that slides out */}
    </div>
  );
}
