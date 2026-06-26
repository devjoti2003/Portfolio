'use client';

import Card from '@/components/Card';
import Pill from '@/components/Pill';

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
              <Card href={`/blog/${post.id}`} key={post.id} className="hover-lift">
                <div className="blog-content">
                  <div className="flex-between">
                    <span className="blog-date">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}</span>
                    <Pill>{(post.topic || 'GENERAL').toUpperCase()}</Pill>
                  </div>
                  <h3>{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-footer">
                    <span className="read-more">Read Article <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 19"></polyline></svg></span>
                    <span className="blog-read-time">
                      {post.readTime} MIN READ
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
