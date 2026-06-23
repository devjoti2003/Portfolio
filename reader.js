document.addEventListener('DOMContentLoaded', async () => {
  const progressBar = document.getElementById('progress-bar');
  
  if (progressBar) {
    // Calculate scroll progress for the progress bar
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      let scrollPercent = (scrollTop / scrollHeight) * 100;
      if (scrollPercent > 100) scrollPercent = 100;
      if (scrollPercent < 0) scrollPercent = 0;
      
      progressBar.style.width = scrollPercent + '%';
    });
  }

  // --- Dynamic Markdown Engine ---
  const articleBody = document.getElementById('article-body');
  if (!articleBody) return; // Exit if not on article page

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  if (!postId) {
    document.getElementById('article-title').innerText = 'Article Not Found';
    articleBody.innerHTML = '<p>No article ID provided in the URL.</p>';
    return;
  }

  function formatViews(viewsStr) {
    const views = parseInt(viewsStr, 10);
    if (isNaN(views)) return viewsStr;
    if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
    return views;
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
  }

  try {
    // 1. Fetch Manifest to get metadata
    const manifestRes = await fetch('/posts/manifest.json');
    if (!manifestRes.ok) throw new Error('Failed to load manifest');
    const manifest = await manifestRes.json();
    
    const postMeta = manifest.find(p => p.id === postId);
    
    if (postMeta) {
      document.getElementById('article-title').innerText = postMeta.title || 'Untitled';
      document.getElementById('meta-topic').innerText = postMeta.topic ? postMeta.topic.toUpperCase() : 'GENERAL';
      document.getElementById('meta-date').innerText = postMeta.date ? formatDate(postMeta.date) : '';
      document.getElementById('meta-views').innerText = postMeta.views ? `${formatViews(postMeta.views)} VIEWS` : '';
    } else {
      document.getElementById('article-title').innerText = 'Reading...';
    }

    // 2. Fetch raw markdown
    const mdRes = await fetch(`/posts/${postId}.md`);
    if (!mdRes.ok) throw new Error('Failed to load markdown');
    const rawMarkdown = await mdRes.text();

    // 3. Strip front matter (yaml block bounded by ---)
    let markdownContent = rawMarkdown;
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n/;
    const match = rawMarkdown.match(frontMatterRegex);
    if (match) {
      markdownContent = rawMarkdown.replace(match[0], '');
    }

    // 4. Render Markdown to HTML using Marked
    if (typeof marked !== 'undefined') {
      articleBody.innerHTML = marked.parse(markdownContent);
    } else {
      articleBody.innerHTML = `<pre>${markdownContent}</pre>`;
    }

  } catch (error) {
    console.error('Error loading article:', error);
    document.getElementById('article-title').innerText = 'Error Loading Article';
    articleBody.innerHTML = `<p>${error.message}</p>`;
  }
});
