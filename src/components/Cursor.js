'use client';

import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const followerRef = useRef(null);
  const [isPaper, setIsPaper] = useState(false);

  useEffect(() => {
    const checkPaperMode = () => {
      setIsPaper(document.body.classList.contains('paper-mode'));
    };

    window.addEventListener('paper-mode-changed', checkPaperMode);
    // Defer check to prevent SSR/hydration mismatch
    setTimeout(checkPaperMode, 100);

    return () => {
      window.removeEventListener('paper-mode-changed', checkPaperMode);
    };
  }, []);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let followerX = mouseX;
    let followerY = mouseY;
    let animationFrameId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseOver = (e) => {
      if (!e.target || !e.target.closest) return;
      if (e.target.closest('.nav-links a')) {
        followerRef.current?.classList.add('nav-hover');
      } else if (e.target.closest('button, a, .posh-btn, .skill-tag, .read-more, .nav-cta, .bento-large, .bento-medium, .bento-wide')) {
        followerRef.current?.classList.add('hover-active');
      }
    };

    const onMouseOut = (e) => {
      if (!e.target || !e.target.closest) return;
      if (e.target.closest('.nav-links a')) {
        followerRef.current?.classList.remove('nav-hover');
      } else if (e.target.closest('button, a, .posh-btn, .skill-tag, .read-more, .nav-cta, .bento-large, .bento-medium, .bento-wide')) {
        followerRef.current?.classList.remove('hover-active');
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    const animateCursor = () => {
      dotX += (mouseX - dotX) * 0.5;
      dotY += (mouseY - dotY) * 0.5;

      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;

      if (dotRef.current) {
        if (isPaper) {
          // Align the tip of the pen nib (which is at coordinate 2,2 in the 24x24 SVG)
          // exactly with the target coordinates
          dotRef.current.style.transform = `translate3d(${dotX - 2}px, ${dotY - 2}px, 0)`;
        } else {
          dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
        }
      }

      if (followerRef.current && !isPaper) {
        followerRef.current.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaper]);

  return (
    <>
      <div className={`cursor-dot ${isPaper ? 'paper-cursor' : ''}`} ref={dotRef}>
        {isPaper && (
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{
              display: 'block',
              transform: 'rotate(-10deg)', // slightly rotated for a more natural pen writing posture
              transformOrigin: '2px 2px',
              color: 'var(--text-primary)'
            }}
          >
            <path d="M12 19l7-7 3 3-7 7-3-3z"/>
            <path d="M18 13l-1.5-7.5L2 2l3 14.5L13 18"/>
            <path d="M2 2l7.5 7.5"/>
          </svg>
        )}
      </div>
      {!isPaper && <div className="cursor-follower" ref={followerRef}></div>}
    </>
  );
}
