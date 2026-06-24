'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const followerRef = useRef(null);

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
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }

      if (followerRef.current) {
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
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-follower" ref={followerRef}></div>
    </>
  );
}
