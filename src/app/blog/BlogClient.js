'use client';

import Link from 'next/link';

export default function BlogClient({ posts }) {
  const sortedPosts = [...posts];

  return (
    <main className="blog-page-container">
      <section className="posh-section blog-hero">
        <div className="ambient-glow glow-top-left"></div>
        <div className="posh-container">
          <div className="section-header reveal-up is-visible">
            <h1 className="massive-heading">ARCHIVE</h1>
          </div>

          <div className="blog-grid full-grid reveal-up is-visible delay-1">
            {sortedPosts.map(post => (
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
                      <span className="read-more">Read Article <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 19"></polyline></svg></span>
                      <span style={{fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 500}}>
                        {post.readTime} MIN READ
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
