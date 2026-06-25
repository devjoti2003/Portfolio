import { getAllPosts, getPostData, getNextPostData } from '@/utils/posts';
import { marked } from 'marked';
import Link from 'next/link';

import ArticleClient from './ArticleClient';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function Article({ params }) {
  const { id } = await params;
  const postData = getPostData(id);
  const nextPost = getNextPostData(id);

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

  return (
    <ArticleClient 
      postData={postData} 
      contentHtml={contentHtml} 
      formattedDate={formattedDate}
      nextPost={nextPost}
    />
  );
}
