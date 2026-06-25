import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'public', 'posts');

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      const matterResult = matter(fileContents);
      const wordCount = matterResult.content.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200);
      
      return {
        id,
        readTime,
        ...matterResult.data,
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const matterResult = matter(fileContents);
  const wordCount = matterResult.content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);
  
  return {
    id,
    readTime,
    content: matterResult.content,
    ...matterResult.data,
  };
}

export function getNextPostData(currentId) {
  const posts = getAllPosts();
  const currentIndex = posts.findIndex(post => post.id === currentId);
  
  if (currentIndex === -1 || currentIndex === posts.length - 1) {
    return null;
  }
  
  return posts[currentIndex + 1];
}
