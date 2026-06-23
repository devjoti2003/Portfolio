// Cursor Logic
document.addEventListener('DOMContentLoaded', () => {
  const dot = document.getElementById('cursor-dot');
  const follower = document.getElementById('cursor-follower');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let dotX = mouseX;
  let dotY = mouseY;
  let followerX = mouseX;
  let followerY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Event delegation for hover states so it works on all current and future elements
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.nav-links a')) {
      follower.classList.add('nav-hover');
    } else if (e.target.closest('button, .posh-btn, .skill-tag, .read-more, .nav-cta')) {
      follower.classList.add('hover-active');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.nav-links a')) {
      follower.classList.remove('nav-hover');
    } else if (e.target.closest('button, .posh-btn, .skill-tag, .read-more, .nav-cta')) {
      follower.classList.remove('hover-active');
    }
  });

  function animateCursor() {
    // Dot instantly follows mouse
    dotX += (mouseX - dotX) * 0.5;
    dotY += (mouseY - dotY) * 0.5;

    // Follower has a slight delay for smooth trailing effect
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    if (dot) {
      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;
    }

    if (follower) {
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
    }

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
});
