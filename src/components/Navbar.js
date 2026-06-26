'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPaperMode, setIsPaperMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const isDark = document.body.classList.contains('dark-mode');
    const paper = localStorage.getItem('paper-mode') === 'true';
    if (paper) {
      document.body.classList.add('paper-mode');
    }
    setTimeout(() => {
      setIsDarkMode(isDark);
      if (paper) {
        setIsPaperMode(true);
        window.dispatchEvent(new Event('paper-mode-changed'));
      }
    }, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const body = document.body;
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
    window.dispatchEvent(new Event('theme-changed'));
  };

  const togglePaperMode = () => {
    const body = document.body;
    const isCurrentlyPaper = body.classList.contains('paper-mode');
    
    if (isCurrentlyPaper) {
      body.classList.remove('paper-mode');
      localStorage.setItem('paper-mode', 'false');
      setIsPaperMode(false);
    } else {
      body.classList.add('paper-mode');
      localStorage.setItem('paper-mode', 'true');
      setIsPaperMode(true);
    }
    
    window.dispatchEvent(new Event('paper-mode-changed'));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeEl = document.activeElement;
      if (
        activeEl && 
        (activeEl.tagName === 'INPUT' || 
         activeEl.tagName === 'TEXTAREA' || 
         activeEl.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        togglePaperMode();
      }

      if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    let observer;
    const initObserver = () => {
      const sections = document.querySelectorAll('.posh-section');
      if (sections.length === 0) return false;
      
      observer = new IntersectionObserver((entries) => {
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
      }, { root: null, rootMargin: '-20% 0px -40% 0px', threshold: 0.05 });
      
      sections.forEach(sec => observer.observe(sec));
      return true;
    };

    // Retry finding sections if not immediately available
    let retryCount = 0;
    const interval = setInterval(() => {
      if (initObserver() || retryCount > 10) {
        clearInterval(interval);
      }
      retryCount++;
    }, 500);

    return () => {
      if (interval) clearInterval(interval);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <>
      <nav className={`top-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <Link href="/">DK.</Link>
          </div>

          <div className="nav-right desktop-only">
            <Link href="/blog" className="nav-blog-link">BLOG</Link>
            
            <div className="nav-right-gap" />
            
            <div className="nav-connections-group">
              <a href="https://linkedin.com/in/devjotikundu" target="_blank" rel="noopener noreferrer" className="circle-icon-btn nav-btn" title="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><circle cx="4" cy="4" r="2"></circle><rect x="2" y="9" width="4" height="12"></rect></svg>
              </a>
              <a href="https://github.com/devjoti2003" target="_blank" rel="noopener noreferrer" className="circle-icon-btn nav-btn" title="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="mailto:devjoti.kundu2003@gmail.com" className="circle-icon-btn nav-btn" title="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
              <a href="https://linkedin.com/in/devjotikundu" target="_blank" rel="noopener noreferrer" className="circle-icon-btn nav-btn" title="Resume">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              </a>
            </div>
            
            <div className="nav-right-gap" />
            
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {isDarkMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              )}
            </button>

            <button className="theme-toggle paper-toggle" onClick={togglePaperMode} aria-label="Toggle paper mode" title="Toggle paper mode (Press P)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </button>
          </div>

          <div className="mobile-menu-toggle mobile-only" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-links">
            <Link href="/#work" onClick={() => setIsMobileMenuOpen(false)}>RESEARCH</Link>
            <Link href="/#experience" onClick={() => setIsMobileMenuOpen(false)}>EXPERIENCE</Link>
            <Link href="/#publications" onClick={() => setIsMobileMenuOpen(false)}>PUBLICATIONS</Link>
            <Link href="/#skills" onClick={() => setIsMobileMenuOpen(false)}>SKILLS</Link>
            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)}>BLOG</Link>
            
            <div className="mobile-theme-group">
              <button onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }} className="theme-toggle">
                {isDarkMode ? 'LIGHT MODE' : 'DARK MODE'}
              </button>
              <button onClick={() => { togglePaperMode(); setIsMobileMenuOpen(false); }} className="theme-toggle">
                {isPaperMode ? 'NORMAL MODE' : 'PAPER MODE'}
              </button>
              <a href="https://github.com/devjoti2003" onClick={() => setIsMobileMenuOpen(false)} target="_blank" rel="noopener noreferrer">GITHUB</a>
            </div>
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
        </aside>
      )}
    </>
  );
}
