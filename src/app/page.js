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
              <h1 className="hero-title">DEVJOTI<br/>KUNDU.</h1>
            </div>

          </div>
          <div className="scroll-indicator">
            <div className="mouse"><div className="wheel"></div></div>
            <p>SCROLL</p>
          </div>
        </div>
      </section>

      {/* WORK (Combined Research & Projects) */}
      <section className="posh-section" id="work">
        <div className="posh-container">
          <div className="section-header">
            <div className="ambient-glow glow-heading"></div>
            <h2 className="massive-heading">RESEARCH &<br/>PROJECTS</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="project-card">
              <div className="project-header">
                <h4>COMPUTATIONAL ANALYSIS OF ALZHEIMER&apos;S</h4>
              </div>
              <p className="ed-meta">Academic Project // Aug 2025 - Present</p>
              <p className="project-desc">
                Investigating potential drug targets for Alzheimer&apos;s disease by analyzing the hsa05010 biological pathway.
                Utilizing a docking pipeline to target BACE1 (P56817) and running MM-GBSA calculations to study binding affinities. 
                Tools used: AutoDock Vina, PyMOL, BioPython.
              </p>
            </div>
            
            <div className="project-card">
              <div className="project-header">
                <h4>NEXT.JS BIOINFORMATICS PORTFOLIO</h4>
              </div>
              <p className="ed-meta">Full Stack // June 2026</p>
              <p className="project-desc">
                Designed and developed a highly interactive, physics-driven portfolio using Next.js, GSAP ScrollTrigger, and Three.js WebGL. Implemented a custom Markdown CMS for blogging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="posh-section" id="experience">
        <div className="posh-container">
          <div className="section-header">
            <div className="ambient-glow glow-heading"></div>
            <h2 className="massive-heading">EXPERIENCE</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="project-card">
              <div className="project-header">
                <h4 style={{ maxWidth: '100%' }}>BIOINFORMATICS & SYSTEMS BIOLOGY INTERN</h4>
              </div>
              <p className="ed-meta">Bose Informatics c/o Binfosol Pvt Ltd, Kolkata</p>
              <ul className="project-desc" style={{ paddingLeft: '1.2rem', marginTop: '1rem', listStyleType: 'circle' }}>
                <li style={{ marginBottom: '0.5rem' }}>Utilized <strong>BLAST</strong> and <strong>MSA (MUSCLE/MAFFT)</strong> for sequence alignments.</li>
                <li style={{ marginBottom: '0.5rem' }}>Constructed phylogenetics models using <strong>IQ-TREE2</strong>.</li>
                <li style={{ marginBottom: '0.5rem' }}>Conducted functional enrichment analyses.</li>
                <li style={{ marginBottom: '0.5rem' }}>Analyzed <strong>ESI-MS</strong> mass spectrometry data for biomolecular characterization.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section className="posh-section" id="publications">
        <div className="posh-container">
          <div className="section-header">
            <div className="ambient-glow glow-heading"></div>
            <h2 className="massive-heading">PUBLICATIONS</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="project-card">
              <div className="project-header">
                <h4 style={{ fontSize: '1.5rem', lineHeight: '1.4', maxWidth: '100%' }}>BACE1-TARGETED ALZHEIMER&apos;S DRUG DESIGN: STRUCTURAL BIOLOGY AND SELECTIVITY CHALLENGES</h4>
              </div>
              <p className="ed-meta">Manuscript in Preparation // 2025–2026</p>
              <p className="project-desc" style={{ marginTop: '0.5rem' }}>
                First author manuscript detailing the structural docking pipeline, virtual screening, and MM-GBSA analysis of novel BACE1 inhibitors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="posh-section" id="skills">
        <div className="posh-container">
          <div className="section-header">
            <div className="ambient-glow glow-heading"></div>
            <h2 className="massive-heading">SKILLS</h2>
          </div>
          
          <div className="bento-grid">
            {/* Cell 1: Computational Skills (Medium) */}
            <div className="bento-card bento-medium">
              <div className="bento-glow"></div>
              <div className="bento-content">
                <div className="bento-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                </div>
                <h3>COMPUTATIONAL<br/>TOOLKIT</h3>
                <div className="skill-tags">
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">R</span>
                  <span className="skill-tag">BioPython</span>
                  <span className="skill-tag">C/C++</span>
                  <span className="skill-tag">AutoDock Vina</span>
                  <span className="skill-tag">PyMOL</span>
                  <span className="skill-tag">MEGA X</span>
                  <span className="skill-tag">IQ-TREE2</span>
                  <span className="skill-tag">GATK</span>
                  <span className="skill-tag">Pandas & NumPy</span>
                  <span className="skill-tag">LaTeX</span>
                  <span className="skill-tag">Zotero</span>
                </div>
              </div>
            </div>

            {/* Cell 2: Lab Skills (Medium) */}
            <div className="bento-card bento-medium">
              <div className="bento-glow"></div>
              <div className="bento-content">
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
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMICS */}
      <section className="posh-section" id="academics">
        <div className="posh-container">
          <div className="section-header">
            <div className="ambient-glow glow-heading"></div>
            <h2 className="massive-heading">ACADEMICS</h2>
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

            {/* Cell 2: High School (Medium) */}
            <div className="bento-card bento-medium">
              <div className="bento-glow"></div>
              <div className="bento-content">
                <span className="ed-date">2022</span>
                <h3>HIGHER SECONDARY<br/>(CBSE XII)</h3>
                <p className="bento-meta">SHIV JYOTI INT. SCHOOL</p>
                <p className="ed-highlight" style={{marginTop: 'auto'}}>92.2% SCORE</p>
              </div>
            </div>
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
            <a href="https://linkedin.com/in/devjotikundu" target="_blank" rel="noopener noreferrer" className="posh-btn">LINKEDIN</a>
            <a href="https://github.com/devjoti2003" target="_blank" rel="noopener noreferrer" className="posh-btn">GITHUB</a>
          </div>
          <p className="mono-sub mt-4">KOLKATA, INDIA</p>
        </div>
      </section>

    </main>
  );
}
