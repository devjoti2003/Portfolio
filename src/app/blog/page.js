import { getAllPosts } from '@/utils/posts';
import BlogClient from './BlogClient';

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogClient posts={posts} />;
}
