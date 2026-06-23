'use client';

import Link from 'next/link';
import { useRef } from 'react';
import PageAnimator from '@/components/PageAnimator';

export default function Home() {
  const mainRef = useRef(null);

  return (
    <main className="scroll-container" ref={mainRef}>
      <PageAnimator pageRef={mainRef} />
      {/* HERO */}
      <section className="posh-section hero" id="hero">
        <div className="ambient-glow glow-top-left"></div>
        <div className="ambient-glow glow-bottom-right"></div>
        <div className="posh-container">
          <div className="hero-layout">
            <div className="hero-left">
              <p className="mono-sub">01 // IDENTITY</p>
              <h1 className="hero-title">DEVJOTI<br/>KUNDU.</h1>
              <h2 className="hero-subtitle">BIOTECHNOLOGY UNDERGRADUATE</h2>
            </div>
            
            <div className="hero-right">
              <div className="bento-card hero-id-card">
                <div className="id-header">
                  <span className="status-indicator"><span className="pulse-dot"></span> SYSTEM ONLINE</span>
                </div>
                <div className="thin-line"></div>
                <p className="editorial-desc">
                  Bridging the gap between computational logic and biological complexity. Eager to solve neurodegenerative mysteries using data structures.
                </p>
                <div className="id-footer">
                  <span className="mono-sub" style={{marginBottom: 0, fontSize: '0.75rem'}}>LOCATION // CHANDIGARH, IN</span>
                  <span className="mono-sub" style={{marginBottom: 0, fontSize: '0.75rem'}}>STATUS // COMPILING DNA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-indicator">
            <div className="mouse"><div className="wheel"></div></div>
            <p>SCROLL</p>
          </div>
        </div>
      </section>

      {/* ACADEMICS & TOOLKIT BENTO GRID */}
      <section className="posh-section" id="academics">
        <div className="posh-container">
          <div className="section-header">
            <div className="ambient-glow glow-heading"></div>
            <p className="mono-sub">02 // ACADEMICS & TOOLKIT</p>
            <h2 className="massive-heading">KNOWLEDGE<br/>ARCHITECTURE</h2>
          </div>
          
          <div className="bento-grid">
            {/* Cell 1: University (Large) */}
            <div className="bento-card bento-large">
              <div className="bento-glow"></div>
              <div className="bento-content">
                <span className="ed-date">2024 - 2028</span>
                <h3>BACHELOR OF ENGINEERING,<br/>BIOTECHNOLOGY</h3>
                <p className="bento-meta">CHANDIGARH UNIVERSITY</p>
                <div className="bento-gpa">
                  <span className="gpa-number">8.11</span>
                  <span className="gpa-text">/ 10.0 GPA</span>
                </div>
              </div>
            </div>

            {/* Cell 2: Computational Skills (Medium) */}
            <div className="bento-card bento-medium">
              <div className="bento-glow"></div>
              <div className="bento-content">
                <div className="bento-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                </div>
                <h3>COMPUTATIONAL<br/>TOOLKIT</h3>
                <div className="skill-tags">
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">C/C++</span>
                  <span className="skill-tag">Pandas</span>
                  <span className="skill-tag">NumPy</span>
                  <span className="skill-tag">Matplotlib</span>
                  <span className="skill-tag">KEGG</span>
                </div>
              </div>
            </div>

            {/* Cell 3: Lab Skills (Wide) */}
            <div className="bento-card bento-wide">
              <div className="bento-glow"></div>
              <div className="bento-content split-content">
                <div className="split-left">
                  <div className="bento-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31"></path><path d="M14 9.3V1.99"></path><path d="M8.5 2h7"></path><path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path><path d="M5.52 16h12.96"></path></svg>
                  </div>
                  <h3>LABORATORY<br/>SKILLS</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">Microscopy</span>
                    <span className="skill-tag">PCR</span>
                    <span className="skill-tag">Gel Electrophoresis</span>
                    <span className="skill-tag">Cell Culture</span>
                    <span className="skill-tag">Spectroscopy</span>
                    <span className="skill-tag">ELISA</span>
                  </div>
                </div>
                <div className="split-right">
                  <span className="ed-date">2022</span>
                  <h3>HIGHER SECONDARY (CBSE XII)</h3>
                  <p className="bento-meta">SHIV JYOTI INT. SCHOOL</p>
                  <p className="ed-highlight">92.2% SCORE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="posh-section" id="projects">
        <div className="posh-container">
          <div className="posh-row">
            <div className="posh-left">
              <div className="ambient-glow glow-heading"></div>
              <p className="mono-sub">03 // RESEARCH</p>
              <h2 className="massive-heading">ONGOING<br/>PROJECTS</h2>
            </div>
            <div className="posh-right">
              <div className="project-card">
                <div className="project-header">
                  <h4>COMPUTATIONAL ANALYSIS OF ALZHEIMER&apos;S</h4>
                  <span className="status-pill">ACTIVE</span>
                </div>
                <p className="ed-meta">Academic Project // Aug 2025 - Present</p>
                <p className="project-desc">
                  Investigating potential drug targets for Alzheimer&apos;s disease by analyzing biological pathways.
                  Utilizing KEGG pathway maps to identify and study signaling cascades related to AD progression. 
                  Applying Python, Pandas, and NumPy for data processing and analysis of pathway components.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="posh-section" id="coding-projects">
        <div className="posh-container">
          <div className="posh-row">
            <div className="posh-left">
              <div className="ambient-glow glow-heading"></div>
              <p className="mono-sub">04 // DEVELOPMENT</p>
              <h2 className="massive-heading">CODING<br/>PROJECTS</h2>
            </div>
            <div className="posh-right">
              <div className="project-card">
                <div className="project-header">
                  <h4>NEXT.JS BIOINFORMATICS PORTFOLIO</h4>
                  <span className="status-pill" style={{ borderColor: 'var(--pastel-cyan)', color: 'var(--pastel-cyan)', boxShadow: '0 0 10px rgba(0, 210, 255, 0.2)' }}>SHIPPED</span>
                </div>
                <p className="ed-meta">Full Stack // June 2026</p>
                <p className="project-desc">
                  Designed and developed a highly interactive, physics-driven portfolio using Next.js, GSAP ScrollTrigger, and Three.js WebGL. Implemented a custom Markdown CMS for blogging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="posh-section" id="blog">
        <div className="posh-container">
          <div className="section-header">
            <div className="ambient-glow glow-heading"></div>
            <p className="mono-sub">05 // WRITINGS</p>
            <h2 className="massive-heading">INSIGHTS &<br/>BLOG</h2>
          </div>
          
          <div className="blog-grid full-grid">
            <Link href="/blog" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <article className="blog-tile" style={{ height: '100%' }}>
                <div className="blog-glow"></div>
                <div className="blog-content">
                  <span className="blog-date">COMING SOON</span>
                  <h3>THE INTERSECTION OF DATA AND BIOLOGY</h3>
                  <p className="blog-excerpt">Thoughts on modern computational pipelines in biotech.</p>
                  <div className="blog-footer">
                    <span className="read-more">Read Article <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                  </div>
                </div>
              </article>
            </Link>

            <Link href="/blog" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <article className="blog-tile" style={{ height: '100%' }}>
                <div className="blog-glow"></div>
                <div className="blog-content">
                  <span className="blog-date">COMING SOON</span>
                  <h3>UNDERSTANDING KEGG PATHWAYS</h3>
                  <p className="blog-excerpt">A beginner&apos;s guide to pathway analysis for neurodegenerative diseases.</p>
                  <div className="blog-footer">
                    <span className="read-more">Read Article <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                  </div>
                </div>
              </article>
            </Link>
            
            <Link href="/blog" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <article className="blog-tile empty-tile" style={{ height: '100%' }}>
                <div className="blog-content">
                  <span className="blog-date">FUTURE</span>
                  <h3>MORE ARTICLES ON THE HORIZON</h3>
                  <p className="blog-excerpt">Stay tuned for deep dives into genomics, AI, and protein folding.</p>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="posh-section footer" id="contact">
        <div className="posh-container text-center">
          <h2 className="massive-cta">LET&apos;S CONNECT</h2>
          <div className="thin-line centered-line"></div>
          <div className="contact-links">
            <a href="mailto:devjoti.kundu2003@gmail.com" className="posh-btn">EMAIL ME</a>
            <a href="https://linkedin.com/in/devjotikundu" target="_blank" className="posh-btn">LINKEDIN</a>
          </div>
          <p className="mono-sub mt-4">+91 96098 78969 // KOLKATA, INDIA</p>
        </div>
      </section>

    </main>
  );
}
