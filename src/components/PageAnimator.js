'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PageAnimator({ pageRef }) {
  useGSAP(() => {
    // Slower, dramatic hero text animation with motion blur, delayed for Preloader
    gsap.fromTo('.hero-title', 
      { y: 120, opacity: 0, filter: 'blur(25px)', letterSpacing: '0.3em' },
      { y: 0, opacity: 1, filter: 'blur(0px)', letterSpacing: 'normal', duration: 2.5, ease: 'power3.out', delay: 0.8, clearProps: 'filter' }
    );
    gsap.fromTo('.hero-subtitle', 
      { y: 60, opacity: 0, filter: 'blur(15px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 2.5, ease: 'power3.out', delay: 1.3, clearProps: 'filter' }
    );
    gsap.fromTo('.editorial-desc', 
      { y: 40, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 2.5, ease: 'power3.out', delay: 1.6, clearProps: 'filter' }
    );
    gsap.fromTo('.scroll-indicator', 
      { opacity: 0, filter: 'blur(10px)' },
      { opacity: 1, filter: 'blur(0px)', duration: 3, ease: 'power2.out', delay: 2.5, clearProps: 'filter' }
    );

    // Deep Parallax on Ambient Glow Orbs
    gsap.to('.ambient-glow', {
      yPercent: 60,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5 // Added scrub smoothing for "slower" feel
      }
    });

    // Animate Bento Cards sequentially on scroll with heavy motion blur
    const bentoCards = gsap.utils.toArray('.bento-card');
    if (bentoCards.length) {
      gsap.fromTo(bentoCards, 
        { y: 150, opacity: 0, scale: 0.9, filter: 'blur(20px)' },
        {
          y: 0, opacity: 1, scale: 1, filter: 'blur(0px)',
          duration: 2,
          stagger: 0.25,
          ease: 'power3.out',
          clearProps: 'filter',
          scrollTrigger: {
            trigger: '.bento-grid',
            start: 'top 85%',
          }
        }
      );
    }

    // Animate Blog Tiles sequentially on scroll with heavy motion blur
    const blogTiles = gsap.utils.toArray('.blog-tile');
    if (blogTiles.length) {
      gsap.fromTo(blogTiles, 
        { y: 150, opacity: 0, scale: 0.95, filter: 'blur(15px)' },
        {
          y: 0, opacity: 1, scale: 1, filter: 'blur(0px)',
          duration: 2,
          stagger: 0.25,
          ease: 'power3.out',
          clearProps: 'filter',
          scrollTrigger: {
            trigger: '.blog-grid',
            start: 'top 85%',
          }
        }
      );
    }

    // "Feel the shift" effect on sections: Animate the section headers massively
    const sections = gsap.utils.toArray('.posh-section:not(.hero)');
    sections.forEach((sec) => {
      const header = sec.querySelector('.section-header, .posh-left');
      const rightContent = sec.querySelector('.posh-right');

      if (header) {
        gsap.fromTo(header,
          { y: 100, opacity: 0, filter: 'blur(30px)', scale: 0.95 },
          {
            y: 0, opacity: 1, filter: 'blur(0px)', scale: 1,
            duration: 2.5,
            ease: 'power3.out',
            clearProps: 'filter',
            scrollTrigger: {
              trigger: sec,
              start: 'top 80%',
            }
          }
        );
      }

      if (rightContent) {
        gsap.fromTo(rightContent,
          { x: 50, opacity: 0, filter: 'blur(20px)' },
          {
            x: 0, opacity: 1, filter: 'blur(0px)',
            duration: 2.5,
            ease: 'power3.out',
            clearProps: 'filter',
            delay: 0.2,
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
