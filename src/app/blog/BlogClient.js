'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BlogClient({ posts }) {
  const [currentTopic, setCurrentTopic] = useState('ALL');
  const [currentSort, setCurrentSort] = useState('LATEST');

  const topics = ['ALL', ...new Set(posts.map(p => (p.topic || 'GENERAL').toUpperCase()))];

  const filteredPosts = posts
    .filter(p => currentTopic === 'ALL' || (p.topic || 'GENERAL').toUpperCase() === currentTopic)
    .sort((a, b) => {
      if (currentSort === 'LATEST') return new Date(b.date) - new Date(a.date);
      if (currentSort === 'POPULAR') return parseInt(b.views) - parseInt(a.views);
      return 0;
    });

  return (
    <main className="blog-page-container">
      <section className="posh-section blog-hero">
        <div className="ambient-glow glow-top-left"></div>
        <div className="posh-container">
          <div className="section-header reveal-up is-visible">
            <h1 className="massive-heading">ARCHIVE</h1>
          </div>

          <div className="filter-bar reveal-up is-visible delay-1">
            <div className="filter-group">
              <span className="filter-label">SORT BY:</span>
              <button className={`sort-btn ${currentSort === 'LATEST' ? 'active' : ''}`} onClick={() => setCurrentSort('LATEST')}>LATEST</button>
              <button className={`sort-btn ${currentSort === 'POPULAR' ? 'active' : ''}`} onClick={() => setCurrentSort('POPULAR')}>MOST POPULAR</button>
            </div>
            
            <div className="filter-group">
              <span className="filter-label">TOPIC:</span>
              {topics.map(topic => (
                <button key={topic} className={`topic-btn ${currentTopic === topic ? 'active' : ''}`} onClick={() => setCurrentTopic(topic)}>
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="blog-grid full-grid reveal-up is-visible delay-2">
            {filteredPosts.map(post => (
              <Link href={`/blog/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <article className="blog-tile">
                  <div className="blog-glow"></div>
                  <div className="blog-content">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <span className="blog-date">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}</span>
                      <span className="blog-topic" style={{fontSize: '0.75rem', fontWeight: 600, color: 'var(--pastel-purple)'}}>{(post.topic || 'GENERAL').toUpperCase()}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <div className="blog-footer">
                      <span className="read-more">Read Article <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                      <span style={{fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 500}}>
                        {parseInt(post.views) >= 1000 ? (parseInt(post.views) / 1000).toFixed(1) + 'K' : post.views} VIEWS
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
            
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
    </main>
  );
}
