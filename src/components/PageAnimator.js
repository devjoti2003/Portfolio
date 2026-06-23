'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PageAnimator({ pageRef }) {
  useGSAP(() => {
    // Basic hero text animation
    gsap.fromTo('.hero-title', 
      { y: 80, opacity: 0, filter: 'blur(10px)', letterSpacing: '0.2em' },
      { y: 0, opacity: 1, filter: 'blur(0px)', letterSpacing: 'normal', duration: 1.5, ease: 'power4.out', delay: 0.2 }
    );
    gsap.fromTo('.hero-subtitle', 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
    );
    gsap.fromTo('.editorial-desc', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.7 }
    );
    gsap.fromTo('.scroll-indicator', 
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: 'power2.out', delay: 1.5 }
    );

    // Parallax on Ambient Glow Orbs
    gsap.to('.ambient-glow', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Animate Bento Cards sequentially on scroll
    const bentoCards = gsap.utils.toArray('.bento-card');
    if (bentoCards.length) {
      gsap.fromTo(bentoCards, 
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.bento-grid',
            start: 'top 85%',
          }
        }
      );
    }

    // Animate Blog Tiles sequentially on scroll
    const blogTiles = gsap.utils.toArray('.blog-tile');
    if (blogTiles.length) {
      gsap.fromTo(blogTiles, 
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.blog-grid',
            start: 'top 85%',
          }
        }
      );
    }

    // Parallax effect on sections
    const sections = gsap.utils.toArray('.posh-section:not(.hero)');
    sections.forEach((sec) => {
      const header = sec.querySelector('.section-header');
      if (header) {
        gsap.fromTo(header,
          { y: 50, opacity: 0, filter: 'blur(5px)' },
          {
            y: 0, opacity: 1, filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 80%',
            }
          }
        );
      }
    });
  }, { scope: pageRef });

  return null;
}
