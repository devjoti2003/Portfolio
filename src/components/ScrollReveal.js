'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Wait a tick for DOM to render
    setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal-up');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      });

      revealElements.forEach(el => observer.observe(el));

      // Cleanup
      return () => {
        revealElements.forEach(el => observer.unobserve(el));
      };
    }, 100);
  }, [pathname]);

  return null;
}
