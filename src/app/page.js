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
      <section className="posh-section hero" id="hero" style={{ paddingBottom: '2rem', minHeight: 'auto' }}>
        <div className="posh-container">
          <div className="hero-layout" style={{ alignItems: 'flex-start', textAlign: 'left', gap: '1rem', marginTop: '4rem' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>01 // IDENTITY</span>
            <h1 className="hero-title">Devjoti<br/>Kundu.</h1>
            <p className="editorial-desc" style={{ maxWidth: '600px', fontSize: '13px', lineHeight: '1.6', marginBottom: '1.5rem', color: 'var(--color-text-primary)', fontWeight: 400 }}>
              Computational biologist focused on aspartic protease drug design and KEGG-driven pathway analysis. B.E. Biotechnology &middot; Chandigarh University.
            </p>
            <div className="status-indicator" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
              <span className="pulse-dot" style={{ backgroundColor: '#00C853', width: '6px', height: '6px', borderRadius: '50%', display: 'inline-block' }}></span>
              Active &mdash; BACE1/AD review manuscript in preparation
            </div>
          </div>
        </div>
      </section>

      {/* STATS ROW */}
      <section className="posh-section" style={{ minHeight: 'auto', padding: '0 0 4rem 0' }}>
        <div className="posh-container">
          <div className="stats-row">
            <div className="stat-block">
              <span className="stat-number">8.11</span>
              <span className="stat-label">GPA / 10.0</span>
            </div>
            <div className="stat-block">
              <span className="stat-number">4th</span>
              <span className="stat-label">SEMESTER</span>
            </div>
            <div className="stat-block">
              <span className="stat-number">1</span>
              <span className="stat-label">MANUSCRIPT IN PREP</span>
            </div>
            <div className="stat-block">
              <span className="stat-number">14+</span>
              <span className="stat-label">BIOINFORMATICS TOOLS</span>
            </div>
          </div>
        </div>
      </section>

      {/* WORK / RESEARCH */}
      <section className="posh-section" id="work" style={{ minHeight: 'auto', padding: '4rem 0' }}>
        <div className="posh-container">
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <h2 className="massive-heading" style={{ color: 'var(--color-text-secondary)', fontSize: '10px' }}>02 // RESEARCH</h2>
            <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--nav-border)', marginTop: '1rem' }}></div>
          </div>
          
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div className="project-card primary-accent-card" style={{ flex: '1 1 400px' }}>
              <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', letterSpacing: '0.1em', marginBottom: '1rem', textTransform: 'uppercase' }}>Manuscript In Prep &middot; 2025 - Present</div>
              <div className="project-header">
                <h4 style={{ fontSize: '18px', fontWeight: 500, lineHeight: 1.4 }}>BACE1-Targeted Alzheimer&apos;s Drug Design: Structural Biology & Selectivity</h4>
              </div>
              <p className="project-desc" style={{ fontSize: '13px', marginTop: '1rem' }}>
                Structural analysis of Asp32/Asp228 catalytic dyad, &beta;-hairpin flap dynamics, and S1-S4 subsite topology. Selectivity profiling vs BACE2 and Cathepsin-D. Anchored to PDB 2WJO &middot; UniProt P56817.
              </p>
              <div className="skill-tags" style={{ marginTop: '1.5rem', paddingTop: 0 }}>
                <span className="skill-tag" style={{ fontSize: '10px', padding: '0.3rem 0.8rem' }}>PyMOL</span>
                <span className="skill-tag" style={{ fontSize: '10px', padding: '0.3rem 0.8rem' }}>AutoDock Vina</span>
                <span className="skill-tag" style={{ fontSize: '10px', padding: '0.3rem 0.8rem' }}>KEGG hsa05010</span>
                <span className="skill-tag" style={{ fontSize: '10px', padding: '0.3rem 0.8rem' }}>PDB 2WJO</span>
                <span className="skill-tag" style={{ fontSize: '10px', padding: '0.3rem 0.8rem' }}>UniProt P56817</span>
              </div>
            </div>
            
            <div className="project-card" style={{ flex: '1 1 400px' }}>
              <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', letterSpacing: '0.1em', marginBottom: '1rem', textTransform: 'uppercase' }}>Full Stack &middot; June 2026</div>
              <div className="project-header">
                <h4 style={{ fontSize: '18px', fontWeight: 500, lineHeight: 1.4 }}>Bioinformatics Portfolio &mdash; Next.js + Three.js</h4>
              </div>
              <p className="project-desc" style={{ fontSize: '13px', marginTop: '1rem' }}>
                Physics-driven portfolio with GSAP ScrollTrigger, WebGL, and custom Markdown CMS. Deployed on Vercel.
              </p>
              <div className="skill-tags" style={{ marginTop: '1.5rem', paddingTop: 0 }}>
                <span className="skill-tag" style={{ fontSize: '10px', padding: '0.3rem 0.8rem' }}>Next.js</span>
                <span className="skill-tag" style={{ fontSize: '10px', padding: '0.3rem 0.8rem' }}>Three.js</span>
                <span className="skill-tag" style={{ fontSize: '10px', padding: '0.3rem 0.8rem' }}>GSAP</span>
                <span className="skill-tag" style={{ fontSize: '10px', padding: '0.3rem 0.8rem' }}>Vercel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="posh-section" id="experience" style={{ backgroundColor: 'var(--tint-bg)', padding: '6rem 0', minHeight: 'auto', margin: '4rem 0' }}>
        <div className="posh-container">
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <h2 className="massive-heading" style={{ color: 'var(--color-text-secondary)', fontSize: '10px' }}>03 // EXPERIENCE</h2>
            <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--nav-border)', marginTop: '1rem' }}></div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Bose Informatics c/o Binfosol Pvt Ltd &middot; Kolkata</span>
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>2024</span>
            </div>
            <div className="project-card" style={{ padding: '2.5rem' }}>
              <div className="project-header">
                <h4 style={{ fontSize: '20px', fontWeight: 500 }}>Bioinformatics & Systems Biology Intern</h4>
              </div>
              <div className="skill-tags" style={{ marginTop: '1.5rem', paddingTop: 0 }}>
                <span className="skill-tag" style={{ fontSize: '10px', padding: '0.4rem 1rem', backgroundColor: 'var(--bento-bg)' }}>BLAST</span>
                <span className="skill-tag" style={{ fontSize: '10px', padding: '0.4rem 1rem', backgroundColor: 'var(--bento-bg)' }}>MSA (MUSCLE)</span>
                <span className="skill-tag" style={{ fontSize: '10px', padding: '0.4rem 1rem', backgroundColor: 'var(--bento-bg)' }}>IQ-TREE2</span>
                <span className="skill-tag" style={{ fontSize: '10px', padding: '0.4rem 1rem', backgroundColor: 'var(--bento-bg)' }}>MEGA X</span>
                <span className="skill-tag" style={{ fontSize: '10px', padding: '0.4rem 1rem', backgroundColor: 'var(--bento-bg)' }}>AutoDock Vina</span>
                <span className="skill-tag" style={{ fontSize: '10px', padding: '0.4rem 1rem', backgroundColor: 'var(--bento-bg)' }}>GATK</span>
                <span className="skill-tag" style={{ fontSize: '10px', padding: '0.4rem 1rem', backgroundColor: 'var(--bento-bg)' }}>ESI-MS</span>
                <span className="skill-tag" style={{ fontSize: '10px', padding: '0.4rem 1rem', backgroundColor: 'var(--bento-bg)' }}>PyMOL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section className="posh-section" id="publications" style={{ minHeight: 'auto', padding: '4rem 0', marginBottom: '2rem' }}>
        <div className="posh-container">
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <h2 className="massive-heading" style={{ color: 'var(--color-text-secondary)', fontSize: '10px' }}>04 // PUBLICATIONS / MANUSCRIPTS</h2>
            <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--nav-border)', marginTop: '1rem' }}></div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Manuscript in Preparation</span>
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>2025&ndash;2026</span>
            </div>
            <div className="project-card" style={{ padding: '2.5rem' }}>
              <div className="project-header">
                <h4 style={{ fontSize: '20px', fontWeight: 500, lineHeight: 1.4 }}>BACE1-targeted Alzheimer's Drug Design: Structural Biology and Selectivity Challenges</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="posh-section" id="skills" style={{ minHeight: 'auto', padding: '4rem 0', marginBottom: '6rem' }}>
        <div className="posh-container">
          <div className="section-header" style={{ marginBottom: '3rem' }}>
            <h2 className="massive-heading" style={{ color: 'var(--color-text-secondary)', fontSize: '10px' }}>05 // SKILLS</h2>
            <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--nav-border)', marginTop: '1rem' }}></div>
          </div>
          
          <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3 style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>COMPUTATIONAL</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '13px', color: 'var(--color-text-primary)' }}>
                <li>&bull; Python &middot; BioPython</li>
                <li>&bull; AutoDock Vina</li>
                <li>&bull; PyMOL &middot; UCSF Chimera</li>
                <li>&bull; MEGA X &middot; IQ-TREE2</li>
                <li>&bull; GATK &middot; BWA</li>
              </ul>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3 style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>DATABASES & ANALYSIS</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '13px', color: 'var(--color-text-primary)' }}>
                <li>&bull; KEGG &middot; UniProt &middot; PDB</li>
                <li>&bull; BLAST &middot; MUSCLE &middot; MAFFT</li>
                <li>&bull; Pandas &middot; NumPy &middot; Matplotlib</li>
                <li>&bull; LaTeX &middot; Zotero</li>
                <li>&bull; C / C++</li>
              </ul>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3 style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>LABORATORY</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '13px', color: 'var(--color-text-primary)' }}>
                <li>&bull; PCR &middot; Gel Electrophoresis</li>
                <li>&bull; ELISA &middot; Spectroscopy</li>
                <li>&bull; Cell Culture</li>
                <li>&bull; ESI-MS</li>
                <li>&bull; Microscopy</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="posh-section" id="blog" style={{ backgroundColor: 'var(--tint-bg)', padding: '6rem 0', minHeight: 'auto', margin: '4rem 0' }}>
        <div className="posh-container">
          <div className="section-header" style={{ marginBottom: '3rem' }}>
            <h2 className="massive-heading" style={{ color: 'var(--color-text-secondary)', fontSize: '10px' }}>06 // BLOG</h2>
            <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--nav-border)', marginTop: '1rem' }}></div>
          </div>
          
          <div className="blog-grid full-grid reveal-up delay-1 stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            <Link href="/blog/data-and-biology" className="blog-tile">
              <span className="blog-date" style={{ fontSize: '10px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>May 2026</span>
              <h3 style={{ fontSize: '16px', fontWeight: 500, margin: '1rem 0' }}>Data, Biology, and Computational Systems</h3>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Exploring the intersection of deep learning and complex biological pathways.</p>
            </Link>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
            <Link href="/blog" className="posh-btn" style={{ padding: '1rem 2rem', border: '1px solid var(--nav-border)', borderRadius: '30px', textDecoration: 'none', color: 'var(--color-text-primary)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              VIEW FULL ARCHIVE
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="posh-section footer" id="contact" style={{ minHeight: 'auto', padding: '3rem 0', borderTop: '1px solid var(--nav-border)' }}>
        <div className="posh-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: 'var(--color-text-primary)', fontWeight: 500 }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="mailto:devjoti.kundu2003@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>Email</a>
            <a href="https://linkedin.com/in/devjotikundu" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>LinkedIn</a>
            <a href="https://github.com/devjoti2003" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>GitHub</a>
          </div>
          <div style={{ color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '11px' }}>
            CHANDIGARH UNIVERSITY &middot; 2024&ndash;2028
          </div>
        </div>
      </section>

    </main>
  );
}
