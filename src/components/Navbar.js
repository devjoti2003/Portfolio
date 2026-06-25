'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  useEffect(() => {
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
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <nav className="top-nav">
        <div className="nav-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '90%' }}>
          <div className="nav-logo">
            <Link href="/" style={{ textDecoration: 'none', color: 'var(--color-text-primary)', fontWeight: 600, fontSize: '1.2rem', letterSpacing: '0.05em' }}>DK.</Link>
          </div>
          
          <div className="nav-links-horizontal" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            <Link href="/#work" style={{ textDecoration: 'none', color: 'var(--color-text-primary)', fontWeight: 500, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>RESEARCH</Link>
            <Link href="/#experience" style={{ textDecoration: 'none', color: 'var(--color-text-primary)', fontWeight: 500, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>EXPERIENCE</Link>
            <Link href="/#publications" style={{ textDecoration: 'none', color: 'var(--color-text-primary)', fontWeight: 500, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>PUBLICATIONS</Link>
            <Link href="/#skills" style={{ textDecoration: 'none', color: 'var(--color-text-primary)', fontWeight: 500, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>SKILLS</Link>
            <Link href="/#academics" style={{ textDecoration: 'none', color: 'var(--color-text-primary)', fontWeight: 500, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>ACADEMICS</Link>
          </div>

          <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a href="https://github.com/devjoti2003" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-primary)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <Link href="/#contact" style={{ 
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.6rem 1.2rem', 
              border: '1px solid var(--color-text-primary)', 
              borderRadius: '8px', 
              textDecoration: 'none', 
              color: 'var(--color-text-primary)', 
              fontWeight: 500, 
              fontSize: '0.8rem', 
              letterSpacing: '0.1em' 
            }}>
              CONNECT
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </Link>
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
