'use client';

import Link from 'next/link';
import { useRef } from 'react';
import PageAnimator from '@/components/PageAnimator';
import Card from '@/components/Card';
import Pill from '@/components/Pill';

export default function Home() {
  const mainRef = useRef(null);

  return (
    <main className="scroll-container" ref={mainRef}>
      <PageAnimator pageRef={mainRef} />
      
      {/* HERO */}
      <section className="posh-section hero hero-section" id="hero">
        <div className="posh-container">
          <div className="hero-layout hero-layout-inner">
            <span className="mono-sub">01 // IDENTITY</span>
            <h1 className="hero-title">Devjoti<br/>Kundu.</h1>
            <p className="editorial-desc hero-desc-para">
              Computational biologist focused on aspartic protease drug design and KEGG-driven pathway analysis. B.E. Biotechnology &middot; Chandigarh University.
            </p>
            <div className="status-indicator">
              <span className="pulse-dot pulse-success"></span>
              Active &mdash; BACE1/AD review manuscript in preparation
            </div>
            
            {/* 4 circular connection buttons right below status indicator */}
            <div className="nav-connections-group">
              <a href="https://linkedin.com/in/devjotikundu" target="_blank" rel="noopener noreferrer" className="circle-icon-btn" title="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><circle cx="4" cy="4" r="2"></circle><rect x="2" y="9" width="4" height="12"></rect></svg>
              </a>
              <a href="https://github.com/devjoti2003" target="_blank" rel="noopener noreferrer" className="circle-icon-btn" title="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="mailto:devjoti.kundu2003@gmail.com" className="circle-icon-btn" title="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
              <a href="https://linkedin.com/in/devjotikundu" target="_blank" rel="noopener noreferrer" className="circle-icon-btn" title="Resume">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS ROW */}
      <section className="posh-section stats-section">
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
      <section className="posh-section research-section" id="work">
        <div className="posh-container">
          <div className="section-header section-header-wrap">
            <h2 className="massive-heading">02 // RESEARCH</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="projects-flex-container">
            <Card accentBorder={true} className="research-card-flex hover-lift">
              <div className="mono-sub">Manuscript In Prep &middot; 2025 - Present</div>
              <div className="project-header">
                <h4 className="skills-category-title">BACE1-Targeted Alzheimer&apos;s Drug Design: Structural Biology & Selectivity</h4>
              </div>
              <p className="project-desc">
                Structural analysis of Asp32/Asp228 catalytic dyad, &beta;-hairpin flap dynamics, and S1-S4 subsite topology. Selectivity profiling vs BACE2 and Cathepsin-D. Anchored to PDB 2WJO &middot; UniProt P56817.
              </p>
              <div className="skill-tags">
                <Pill className="skill-tag-size">PyMOL</Pill>
                <Pill className="skill-tag-size">AutoDock Vina</Pill>
                <Pill className="skill-tag-size">KEGG hsa05010</Pill>
                <Pill className="skill-tag-size">PDB 2WJO</Pill>
                <Pill className="skill-tag-size">UniProt P56817</Pill>
              </div>
            </Card>
            
            <Card className="research-card-flex hover-lift">
              <div className="mono-sub">Full Stack &middot; June 2026</div>
              <div className="project-header">
                <h4 className="skills-category-title">Bioinformatics Portfolio &mdash; Next.js + Three.js</h4>
              </div>
              <p className="project-desc">
                Physics-driven portfolio with GSAP ScrollTrigger, WebGL, and custom Markdown CMS. Deployed on Vercel.
              </p>
              <div className="skill-tags">
                <Pill className="skill-tag-size">Next.js</Pill>
                <Pill className="skill-tag-size">Three.js</Pill>
                <Pill className="skill-tag-size">GSAP</Pill>
                <Pill className="skill-tag-size">Vercel</Pill>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="posh-section experience-section" id="experience">
        <div className="posh-container">
          <div className="section-header section-header-wrap">
            <h2 className="massive-heading">03 // EXPERIENCE</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="flex-column-gap-8">
            <div className="flex-between-baseline">
              <span className="mono-sub">Bose Informatics c/o Binfosol Pvt Ltd &middot; Kolkata</span>
              <span className="mono-sub">2024</span>
            </div>
            <Card className="hover-lift">
              <div className="project-header">
                <h4 className="skills-category-title">Bioinformatics & Systems Biology Intern</h4>
              </div>
              <div className="skill-tags">
                <Pill className="skill-tag-size">BLAST</Pill>
                <Pill className="skill-tag-size">MSA (MUSCLE)</Pill>
                <Pill className="skill-tag-size">IQ-TREE2</Pill>
                <Pill className="skill-tag-size">MEGA X</Pill>
                <Pill className="skill-tag-size">AutoDock Vina</Pill>
                <Pill className="skill-tag-size">GATK</Pill>
                <Pill className="skill-tag-size">ESI-MS</Pill>
                <Pill className="skill-tag-size">PyMOL</Pill>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section className="posh-section publications-section" id="publications">
        <div className="posh-container">
          <div className="section-header section-header-wrap">
            <h2 className="massive-heading">04 // PUBLICATIONS / MANUSCRIPTS</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="flex-column-gap-8">
            <div className="flex-between-baseline">
              <span className="mono-sub">Manuscript in Preparation</span>
              <span className="mono-sub">2025&ndash;2026</span>
            </div>
            <Card className="hover-lift">
              <div className="project-header">
                <h4 className="skills-category-title">BACE1-targeted Alzheimer&apos;s Drug Design: Structural Biology and Selectivity Challenges</h4>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="posh-section skills-section" id="skills">
        <div className="posh-container">
          <div className="section-header section-header-wrap">
            <h2 className="massive-heading">05 // SKILLS</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="bento-grid skills-grid">
            <Card className="skills-card">
              <h3 className="skills-category-title">COMPUTATIONAL</h3>
              <ul className="skills-list">
                <li>&bull; Python &middot; BioPython</li>
                <li>&bull; AutoDock Vina</li>
                <li>&bull; PyMOL &middot; UCSF Chimera</li>
                <li>&bull; MEGA X &middot; IQ-TREE2</li>
                <li>&bull; GATK &middot; BWA</li>
              </ul>
            </Card>
            <Card className="skills-card">
              <h3 className="skills-category-title">DATABASES & ANALYSIS</h3>
              <ul className="skills-list">
                <li>&bull; KEGG &middot; UniProt &middot; PDB</li>
                <li>&bull; BLAST &middot; MUSCLE &middot; MAFFT</li>
                <li>&bull; Pandas &middot; NumPy &middot; Matplotlib</li>
                <li>&bull; LaTeX &middot; Zotero</li>
                <li>&bull; C / C++</li>
              </ul>
            </Card>
            <Card className="skills-card">
              <h3 className="skills-category-title">LABORATORY</h3>
              <ul className="skills-list">
                <li>&bull; PCR &middot; Gel Electrophoresis</li>
                <li>&bull; ELISA &middot; Spectroscopy</li>
                <li>&bull; Cell Culture</li>
                <li>&bull; ESI-MS</li>
                <li>&bull; Microscopy</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="posh-section blog-section" id="blog">
        <div className="posh-container">
          <div className="section-header section-header-wrap">
            <h2 className="massive-heading">06 // BLOG</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="blog-grid full-grid reveal-up delay-1 stagger-children blog-grid-layout">
            <Card href="/blog/data-and-biology" className="hover-lift blog-tile-card">
              <span className="blog-date-text">May 2026</span>
              <h3 className="blog-title-text">Data, Biology, and Computational Systems</h3>
              <p className="blog-excerpt-text">Exploring the intersection of deep learning and complex biological pathways.</p>
            </Card>
          </div>
          
          <div className="blog-archive-btn-wrap">
            <Link href="/blog" className="posh-btn">
              VIEW FULL ARCHIVE
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="posh-section footer-section" id="contact">
        <div className="posh-container footer-container">
          <div>
            {/* Connection links removed from footer as requested */}
          </div>
          <div className="mono-sub">
            CHANDIGARH UNIVERSITY &middot; 2024&ndash;2028
          </div>
        </div>
      </section>

    </main>
  );
}
