import * as THREE from 'three';

// --------------------------------------------------------
// 0. Dark Mode Logic
// --------------------------------------------------------
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
let isDarkMode = false;

// Check OS preference or localStorage
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  isDarkMode = true;
  body.classList.add('dark-mode');
}

themeToggleBtn.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
  updateFogColor();
});

// Keyboard shortcut 'P' to toggle theme
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'p' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
    themeToggleBtn.click();
  }
});

function updateFogColor() {
  if (scene && scene.fog) {
    // #0d0f14 for dark mode, #f7f5ef for light mode
    scene.fog.color.setHex(isDarkMode ? 0x0d0f14 : 0xf7f5ef);
  }
}

// --------------------------------------------------------
// 1. UI Interactions (Intersection Observer Reveals)
// --------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal-up');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
});

// Smooth scroll handling for top nav
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      e.preventDefault();
      window.scrollTo({
        top: targetElement.offsetTop - 100, // Offset for fixed nav
        behavior: 'smooth'
      });
    }
  });
});


// --------------------------------------------------------
// 2. Three.js Scene Setup
// --------------------------------------------------------
const container = document.getElementById('webgl-container');

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(isDarkMode ? 0x0d0f14 : 0xf7f5ef, 0.015);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 18;
camera.position.y = 5;
camera.lookAt(0, 0, 0);

// High performance renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(1);
container.appendChild(renderer.domElement);

const dnaGroup = new THREE.Group();
scene.add(dnaGroup);

// --------------------------------------------------------
// 3. Create Particle DNA Helix
// --------------------------------------------------------
const particleCount = 6000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

const color1 = new THREE.Color('#00d2ff'); // Cyan
const color2 = new THREE.Color('#9b51e0'); // Violet
const color3 = new THREE.Color('#ff758c'); // Pastel Pink

const strand1Points = [];
const strand2Points = [];

for (let i = 0; i < particleCount; i++) {
  const i3 = i * 3;
  const y = (Math.random() - 0.5) * 60;
  const type = Math.random();
  let radius, angle;

  if (type < 0.4) {
    radius = 4 + (Math.random() - 0.5) * 1.5;
    angle = y * 0.4 + (Math.random() - 0.5) * 0.2;
    if (Math.random() > 0.90) strand1Points.push(new THREE.Vector3(Math.cos(angle)*radius, y, Math.sin(angle)*radius));
  } else if (type < 0.8) {
    radius = 4 + (Math.random() - 0.5) * 1.5;
    angle = y * 0.4 + Math.PI + (Math.random() - 0.5) * 0.2;
    if (Math.random() > 0.90) strand2Points.push(new THREE.Vector3(Math.cos(angle)*radius, y, Math.sin(angle)*radius));
  } else {
    radius = (Math.random()) * 4;
    const step = Math.round(y * 0.4 / (Math.PI/2)) * (Math.PI/2);
    angle = step + (Math.random() < 0.5 ? 0 : Math.PI);
    angle += (Math.random() - 0.5) * 0.5;
  }

  positions[i3] = Math.cos(angle) * radius;
  positions[i3 + 1] = y;
  positions[i3 + 2] = Math.sin(angle) * radius;

  // Diverse Color Interpolation (Cyan -> Violet -> Pink)
  const heightRatio = (y + 30) / 60;
  const mixedColor = new THREE.Color();
  
  if (heightRatio < 0.5) {
    mixedColor.copy(color1).lerp(color2, heightRatio * 2);
  } else {
    mixedColor.copy(color2).lerp(color3, (heightRatio - 0.5) * 2);
  }
  
  // Sprinkle in subtle deep red shades for visual diversity
  if (Math.random() > 0.85) {
    mixedColor.lerp(new THREE.Color('#ff2a5f'), 0.4);
  }

  if (type >= 0.8) mixedColor.lerp(new THREE.Color('#ffffff'), 0.5);

  colors[i3] = mixedColor.r;
  colors[i3 + 1] = mixedColor.g;
  colors[i3 + 2] = mixedColor.b;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
  size: 0.12, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.8, sizeAttenuation: true
});

const helix = new THREE.Points(geometry, material);
dnaGroup.add(helix);

// Molecular Bonds
const linePositions = [];
const lineColors = [];
for(let i=0; i<Math.min(strand1Points.length, strand2Points.length); i++) {
  if (Math.abs(strand1Points[i].y - strand2Points[i].y) < 2) {
    linePositions.push(
      strand1Points[i].x, strand1Points[i].y, strand1Points[i].z,
      strand2Points[i].x, strand2Points[i].y, strand2Points[i].z
    );
    
    const heightRatio = (strand1Points[i].y + 30) / 60;
    const c1 = new THREE.Color();
    if (heightRatio < 0.5) {
      c1.copy(color1).lerp(color2, heightRatio * 2);
    } else {
      c1.copy(color2).lerp(color3, (heightRatio - 0.5) * 2);
    }
    
    lineColors.push(c1.r, c1.g, c1.b, c1.r, c1.g, c1.b);
  }
}
const lineGeometry = new THREE.BufferGeometry();
lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
const lineMaterial = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending });
const dnaBonds = new THREE.LineSegments(lineGeometry, lineMaterial);
dnaGroup.add(dnaBonds);

// Dust
const dustGeometry = new THREE.BufferGeometry();
const dustPositions = new Float32Array(600 * 3);
for(let i=0; i<600*3; i++) { dustPositions[i] = (Math.random() - 0.5) * 40; }
dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
const dustMaterial = new THREE.PointsMaterial({ color: 0x8b9bb4, size: 0.05, transparent: true, opacity: 0.4 });
const dust = new THREE.Points(dustGeometry, dustMaterial);
scene.add(dust);

// --------------------------------------------------------
// 4. Parallax Physics & Animation Loop
// --------------------------------------------------------
let scrollY = 0;
let targetScrollY = 0;
let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;

window.addEventListener('scroll', () => {
  targetScrollY = window.scrollY;
});

document.addEventListener('mousemove', (e) => {
  targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
  targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();

  // Smooth interpolation for scroll and mouse
  scrollY += (targetScrollY - scrollY) * 0.12;
  mouseX += (targetMouseX - mouseX) * 0.12;
  mouseY += (targetMouseY - mouseY) * 0.12;

  // 3D Parallax synced to physical scroll
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollRatio = scrollY / (maxScroll || 1);
  
  // Camera flies upwards slowly as we scroll down
  camera.position.y = 15 - (scrollRatio * 30);
  
  // DNA rotates slightly faster based on scroll
  dnaGroup.rotation.y = elapsedTime * 0.05 + (scrollRatio * Math.PI * 2);
  
  // Interactive mouse tilt
  dnaGroup.rotation.z = mouseX * 0.15;
  dnaGroup.rotation.x = mouseY * 0.15;

  // Ambient dust rotation
  dust.rotation.y = elapsedTime * 0.02;
  dust.rotation.x = elapsedTime * 0.01;

  // Mouse Parallax Camera Movement
  camera.position.x = mouseX * 2;
  camera.position.z = 18 + mouseY * 2;
  camera.lookAt(0, camera.position.y - 5, 0);

  renderer.render(scene, camera);
}

animate();

// --------------------------------------------------------
// 5. Vertical Navigation Observer
// --------------------------------------------------------
const sections = document.querySelectorAll('.posh-section');
const navDots = document.querySelectorAll('.nav-dot');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const targetId = entry.target.getAttribute('id');
      navDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-target') === targetId) {
          dot.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(sec => {
  observer.observe(sec);
});

// Click to scroll for vertical nav
navDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const targetId = dot.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
