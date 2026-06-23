import { getAllPosts, getPostData } from '@/utils/posts';
import { marked } from 'marked';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function Article({ params }) {
  const { id } = await params;
  const postData = getPostData(id);

  if (!postData) {
    return (
      <main className="article-page-container">
        <div className="reading-canvas">
          <h1 className="article-title">Article Not Found</h1>
        </div>
      </main>
    );
  }

  const contentHtml = marked.parse(postData.content);

  const formattedDate = new Date(postData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
  const formattedViews = parseInt(postData.views) >= 1000 ? (parseInt(postData.views) / 1000).toFixed(1) + 'K' : postData.views;

  return (
    <>
      <div className="progress-container">
        <div className="progress-bar" id="progress-bar"></div>
      </div>

      <main className="article-page-container">
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
              <span className="article-views">{formattedViews} VIEWS</span>
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
              <a href="#">TWITTER</a>
              <a href="#">LINKEDIN</a>
              <a href="#">COPY LINK</a>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
