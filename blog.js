document.addEventListener('DOMContentLoaded', async () => {
  const sortBtns = document.querySelectorAll('.sort-btn');
  const topicBtns = document.querySelectorAll('.topic-btn');
  const gridContainer = document.getElementById('blog-grid-container');
  
  if (!gridContainer) return; // Exit if not on blog page
  
  let currentSort = 'latest';
  let currentTopic = 'all';
  let articlesData = [];

  // Fetch the auto-generated manifest
  try {
    const response = await fetch('/posts/manifest.json');
    if (!response.ok) throw new Error('Network response was not ok');
    articlesData = await response.json();
  } catch (error) {
    console.error('Failed to load blog manifest:', error);
    gridContainer.innerHTML = '<p style="color:var(--color-text-primary); grid-column: 1/-1; text-align:center;">No posts available.</p>';
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

  function renderArticles() {
    // 1. Filter
    let filtered = articlesData.filter(data => {
      if (currentTopic === 'all') return true;
      const topics = data.topic ? data.topic.toLowerCase() : '';
      return topics.includes(currentTopic);
    });

    // 2. Sort
    filtered.sort((a, b) => {
      if (currentSort === 'latest') {
        return new Date(b.date) - new Date(a.date);
      } else if (currentSort === 'popular') {
        const viewsA = parseInt(a.views || '0', 10);
        const viewsB = parseInt(b.views || '0', 10);
        return viewsB - viewsA;
      }
      return 0;
    });

    // 3. Clear container
    gridContainer.innerHTML = '';

    // 4. Generate and append DOM nodes
    filtered.forEach((data, index) => {
      const articleNode = document.createElement('article');
      articleNode.className = 'blog-tile hidden'; // Start hidden for transition
      
      const viewsText = data.views ? ` • ${formatViews(data.views)} VIEWS` : '';
      const dateText = data.date ? formatDate(data.date) : 'UNKNOWN DATE';

      articleNode.innerHTML = `
        <div class="blog-glow"></div>
        <div class="blog-content">
          <span class="blog-date">${dateText}${viewsText}</span>
          <h3>${data.title}</h3>
          <p class="blog-excerpt">${data.excerpt || ''}</p>
          <div class="blog-footer">
            <a href="./article.html?id=${data.id}" class="read-more" style="text-decoration:none; color:inherit;">Read Article <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
          </div>
        </div>
      `;
      
      gridContainer.appendChild(articleNode);

      // Trigger transition
      setTimeout(() => {
        articleNode.classList.remove('hidden');
      }, 50 * index);
    });
    
    // Refresh ScrollTrigger since layout changed
    if (typeof ScrollTrigger !== 'undefined') {
      setTimeout(() => ScrollTrigger.refresh(), 300);
    }
  }

  // Event Listeners for Sort
  sortBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if(btn.classList.contains('active')) return;
      sortBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSort = btn.getAttribute('data-sort');
      renderArticles();
    });
  });

  // Event Listeners for Topics
  topicBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if(btn.classList.contains('active')) return;
      topicBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTopic = btn.getAttribute('data-topic');
      renderArticles();
    });
  });

  // Initial render
  renderArticles();
});
