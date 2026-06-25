'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';

export default function ArticleClient({ postData, contentHtml, formattedDate, nextPost }) {
  const [headings, setHeadings] = useState([]);
  
  useEffect(() => {
    // Progress Bar
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const bar = document.getElementById('progress-bar');
      if (bar) bar.style.width = scrolled + '%';
    };
    window.addEventListener('scroll', handleScroll);

    // Syntax Highlighting
    Prism.highlightAll();

    // Table of Contents & Code Block Decorators
    const articleBody = document.querySelector('.article-body');
    if (articleBody) {
      // TOC Extraction
      const extractedHeadings = Array.from(articleBody.querySelectorAll('h2')).map((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;
        return { id, text: heading.innerText };
      });
      setHeadings(extractedHeadings);

      // Code Block Enhancements (Copy & Label)
      const pres = articleBody.querySelectorAll('pre');
      pres.forEach(pre => {
        // Prevent duplicate buttons if re-rendered
        if (pre.parentNode.classList.contains('code-block-wrapper')) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        wrapper.style.position = 'relative';
        
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const codeClass = pre.querySelector('code')?.className || '';
        const langMatch = codeClass.match(/language-(\w+)/);
        const language = langMatch ? langMatch[1].toUpperCase() : 'CODE';

        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.background = 'rgba(0,0,0,0.1)';
        header.style.padding = '0.4rem 1rem';
        header.style.borderTopLeftRadius = '12px';
        header.style.borderTopRightRadius = '12px';
        header.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        header.style.fontFamily = 'var(--font-sans)';
        header.style.fontSize = '0.75rem';
        header.style.color = 'var(--color-text-secondary)';
        header.style.fontWeight = '600';

        const langSpan = document.createElement('span');
        langSpan.innerText = language;

        const copyBtn = document.createElement('button');
        copyBtn.innerText = 'COPY';
        copyBtn.style.background = 'none';
        copyBtn.style.border = 'none';
        copyBtn.style.color = 'var(--pastel-purple)';
        copyBtn.style.cursor = 'pointer';
        copyBtn.style.fontWeight = '700';
        copyBtn.style.fontSize = '0.7rem';
        
        copyBtn.onclick = () => {
          navigator.clipboard.writeText(pre.innerText).then(() => {
            copyBtn.innerText = 'COPIED!';
            setTimeout(() => copyBtn.innerText = 'COPY', 2000);
          });
        };

        header.appendChild(langSpan);
        header.appendChild(copyBtn);
        
        pre.style.borderTopLeftRadius = '0';
        pre.style.borderTopRightRadius = '0';
        pre.style.marginTop = '0';
        wrapper.insertBefore(header, pre);
      });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [contentHtml]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shareTwitter = (e) => {
    e.preventDefault();
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(postData.title)}`, '_blank');
  };

  const shareLinkedIn = (e) => {
    e.preventDefault();
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const copyLink = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
    e.target.innerText = 'COPIED!';
    setTimeout(() => e.target.innerText = 'COPY LINK', 2000);
  };

  return (
    <>
      <div className="progress-container">
        <div className="progress-bar" id="progress-bar"></div>
      </div>

      <main className="article-page-container" style={{ position: 'relative' }}>
        
        {/* Sticky TOC */}
        {headings.length > 0 && (
          <aside className="article-toc desktop-only" style={{ position: 'sticky', top: '120px', left: '0', width: '250px', padding: '0 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>ON THIS PAGE</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {headings.map(h => (
                <li key={h.id}>
                  <a href={`#${h.id}`} style={{ textDecoration: 'none', color: 'var(--color-text-primary)', fontSize: '0.85rem', fontWeight: 500, opacity: 0.8, transition: 'opacity 0.2s' }} onMouseOver={e => e.target.style.opacity = 1} onMouseOut={e => e.target.style.opacity = 0.8}>
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <article className="reading-canvas reveal-up is-visible">
            <Link href="/blog" className="back-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              BACK TO ARCHIVE
            </Link>

            <header>
              <div className="article-meta">
                <span className="article-topic">{postData.topic?.toUpperCase() || 'GENERAL'}</span>
                <span>•</span>
                <span className="article-date">{formattedDate}</span>
                <span>•</span>
                <span className="article-views">{postData.readTime} MIN READ</span>
              </div>
              <h1 className="article-title">{postData.title}</h1>
            </header>

            <div 
              className="article-body"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            <div className="share-section">
              <div className="thin-line centered-line"></div>
              <p className="mono-sub" style={{ marginTop: '2rem' }}>SHARE THIS PIECE</p>
              <div className="share-links">
                <a href="#" onClick={shareTwitter}>TWITTER</a>
                <a href="#" onClick={shareLinkedIn}>LINKEDIN</a>
                <a href="#" onClick={copyLink}>COPY LINK</a>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
              <button onClick={scrollToTop} className="posh-btn" style={{ padding: '0.8rem 1.5rem', border: '1px solid var(--nav-border)', borderRadius: '30px', background: 'transparent', color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>
                ↑ BACK TO TOP
              </button>
            </div>
            
            {nextPost && (
              <div style={{ marginTop: '6rem', padding: '3rem', borderTop: '1px solid var(--nav-border)', backgroundColor: 'var(--tint-bg)', borderRadius: '16px' }}>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>NEXT ARTICLE</span>
                <h3 style={{ fontSize: '1.5rem', margin: '1rem 0 2rem 0', fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)' }}>{nextPost.title}</h3>
                <Link href={`/blog/${nextPost.id}`} className="posh-btn" style={{ padding: '0.8rem 1.5rem', border: 'none', backgroundColor: 'var(--color-text-primary)', color: 'var(--color-bg)', borderRadius: '30px', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>
                  READ NOW →
                </Link>
              </div>
            )}
          </article>
        </div>
      </main>
    </>
  );
}
