'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const navRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  useGSAP(() => {
    const magnets = document.querySelectorAll('.nav-cta, .nav-logo a, .theme-toggle');
    magnets.forEach((elem) => {
      elem.addEventListener('mousemove', (e) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(elem, { x: x * 0.4, y: y * 0.4, duration: 0.5, ease: 'power2.out' });
      });
      elem.addEventListener('mouseleave', () => {
        gsap.to(elem, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
      });
    });
  }, { scope: navRef });

  useEffect(() => {
    // Check OS preference or localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
      window.dispatchEvent(new Event('theme-changed'));
    }
    
    // Keyboard shortcut 'P'
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'p' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        toggleTheme();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Vertical Nav Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetId = entry.target.getAttribute('id');
          const navDots = document.querySelectorAll('.nav-dot');
          navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-target') === targetId) {
              dot.classList.add('active');
            }
          });
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.5 });

    setTimeout(() => {
      const sections = document.querySelectorAll('.posh-section');
      sections.forEach(sec => observer.observe(sec));
    }, 500);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
    };
  }, []);

  // Animate the icon whenever the theme is toggled
  useEffect(() => {
    gsap.fromTo('#theme-toggle svg', 
      { rotation: -180, scale: 0.3, opacity: 0 }, 
      { rotation: 0, scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
    );
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
      window.dispatchEvent(new Event('theme-changed'));
      return newMode;
    });
  };

  // Active link helper
  const isActive = (path) => pathname === path;

  return (
    <>
      <nav className="top-nav" ref={navRef}>
        <div className="nav-container">
          <div className="nav-logo">
            <Link href="/">DEVJOTI.</Link>
          </div>
          <div className="nav-menu-wrapper">
            <div className="menu-trigger">
              <div className="burger-icon">
                <span className="burger-line"></span>
                <span className="burger-line"></span>
              </div>
              <span className="menu-text">MENU</span>
            </div>
            <div className="nav-links hidden-links">
              <Link href="/#hero">IDENTITY</Link>
              <Link href="/#work">WORK</Link>
              <Link href="/#experience">EXPERIENCE</Link>
              <Link href="/#publications">PUBLICATIONS</Link>
              <Link href="/#skills">SKILLS</Link>
              <Link href="/#academics">ACADEMICS</Link>
              <Link href="/#contact" className="nav-cta">CONNECT</Link>
            </div>
          </div>

          <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="https://github.com/devjoti2003" target="_blank" rel="noopener noreferrer" className="theme-toggle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <button id="theme-toggle" className="theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {pathname === '/' && (
        <aside className="vertical-nav">
          <Link href="#hero" className="nav-dot" data-target="hero"><span className="nav-label">01 // Identity</span></Link>
          <Link href="#work" className="nav-dot" data-target="work"><span className="nav-label">02 // Work</span></Link>
          <Link href="#experience" className="nav-dot" data-target="experience"><span className="nav-label">03 // Experience</span></Link>
          <Link href="#publications" className="nav-dot" data-target="publications"><span className="nav-label">04 // Publications</span></Link>
          <Link href="#skills" className="nav-dot" data-target="skills"><span className="nav-label">05 // Skills</span></Link>
          <Link href="#academics" className="nav-dot" data-target="academics"><span className="nav-label">06 // Academics</span></Link>
        </aside>
      )}
    </>
  );
}
