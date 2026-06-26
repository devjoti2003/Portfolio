'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Prism from 'prismjs';
import Card from '@/components/Card';
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
      setTimeout(() => {
        setHeadings(extractedHeadings);
      }, 0);

      // Code Block Enhancements (Copy & Label)
      const pres = articleBody.querySelectorAll('pre');
      pres.forEach(pre => {
        // Prevent duplicate buttons if re-rendered
        if (pre.parentNode.classList.contains('code-block-wrapper')) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const codeClass = pre.querySelector('code')?.className || '';
        const langMatch = codeClass.match(/language-(\w+)/);
        const language = langMatch ? langMatch[1].toUpperCase() : 'CODE';

        const header = document.createElement('div');
        header.className = 'code-block-header';

        const langSpan = document.createElement('span');
        langSpan.innerText = language;

        const copyBtn = document.createElement('button');
        copyBtn.innerText = 'COPY';
        copyBtn.className = 'code-copy-btn';
        
        copyBtn.onclick = () => {
          navigator.clipboard.writeText(pre.innerText).then(() => {
            copyBtn.innerText = 'COPIED!';
            setTimeout(() => copyBtn.innerText = 'COPY', 2000);
          });
        };

        header.appendChild(langSpan);
        header.appendChild(copyBtn);
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

      <main className="article-page-container">
        
        {/* Sticky TOC */}
        {headings.length > 0 && (
          <aside className="article-toc desktop-only">
            <h4>ON THIS PAGE</h4>
            <ul>
              {headings.map(h => (
                <li key={h.id}>
                  <a href={`#${h.id}`}>
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <div className="article-content-wrapper">
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
              <p className="mono-sub share-section-title">SHARE THIS PIECE</p>
              <div className="share-links">
                <a href="#" onClick={shareTwitter}>TWITTER</a>
                <a href="#" onClick={shareLinkedIn}>LINKEDIN</a>
                <a href="#" onClick={copyLink}>COPY LINK</a>
              </div>
            </div>

            <div className="back-to-top-wrap">
              <button onClick={scrollToTop} className="posh-btn">
                ↑ BACK TO TOP
              </button>
            </div>
            
            {nextPost && (
              <Card className="next-article-card">
                <span>NEXT ARTICLE</span>
                <h3>{nextPost.title}</h3>
                <Link href={`/blog/${nextPost.id}`} className="posh-btn">
                  READ NOW →
                </Link>
              </Card>
            )}
          </article>
        </div>
      </main>
    </>
  );
}
