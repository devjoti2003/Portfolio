'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WebGLBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Check theme
    const isDarkMode = document.body.classList.contains('dark-mode');

    // 2. Three.js Scene Setup
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isDarkMode ? 0x0d0f14 : 0xf7f5ef, 0.015);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 18;
    camera.position.y = 5;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const dnaGroup = new THREE.Group();
    dnaGroup.position.x = 8; // Move DNA to the right side
    scene.add(dnaGroup);

    // Create Circle Texture for Points
    const getCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.arc(32, 32, 30, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      return new THREE.CanvasTexture(canvas);
    };
    const circleTexture = getCircleTexture();

    // 3. Create Particle DNA Helix
    const particleCount = 6000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color('#0044ff'); // Blue
    const color2 = new THREE.Color('#7a00ff'); // Indigo
    const color3 = new THREE.Color('#d400ff'); // Purple

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
        radius = Math.random() * 8;
        angle = Math.random() * Math.PI * 2;
      }

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = y;
      positions[i3 + 2] = Math.sin(angle) * radius;

      const heightRatio = (y + 30) / 60;
      const mixedColor = new THREE.Color();
      
      if (heightRatio < 0.5) {
        mixedColor.copy(color1).lerp(color2, heightRatio * 2);
      } else {
        mixedColor.copy(color2).lerp(color3, (heightRatio - 0.5) * 2);
      }

      // Add "mutation" highlights (Bright Cyan/White)
      if (Math.random() > 0.95) {
        mixedColor.lerp(new THREE.Color('#00ffff'), 0.5);
      }
      
      // Core glowing points
      if (type >= 0.8) mixedColor.lerp(new THREE.Color('#ffffff'), 0.5);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const customUniforms = { uTime: { value: 0 } };

    const material = new THREE.PointsMaterial({
      size: 0.16, vertexColors: true, blending: isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending, transparent: true, opacity: 0.8, sizeAttenuation: true,
      map: circleTexture, alphaTest: 0.1
    });

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = customUniforms.uTime;
      shader.vertexShader = `
        uniform float uTime;
        
        vec3 rgb2hsv(vec3 c) {
            vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
            vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
            vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
            float d = q.x - min(q.w, q.y);
            float e = 1.0e-10;
            return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
        }
        
        vec3 hsv2rgb(vec3 c) {
            vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
            vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
            return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }

        ${shader.vertexShader}
      `.replace(
        '#include <color_vertex>',
        `#include <color_vertex>
         vec3 hsv = rgb2hsv(vColor.rgb);
         if (hsv.y > 0.1) {
           // Wave smoothly oscillates between -1.0 and 1.0
           float wave = sin(uTime * 0.2 + position.y * 0.05);
           // Lock hue strictly between 0.62 (Blue) and 0.98 (Red), centered on 0.80 (Purple)
           hsv.x = 0.80 + (wave * 0.18);
           vColor.rgb = hsv2rgb(hsv);
         }
        `
      );
    };

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
    const lineMaterial = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.25, blending: isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending });
    lineMaterial.onBeforeCompile = material.onBeforeCompile;
    const dnaBonds = new THREE.LineSegments(lineGeometry, lineMaterial);
    dnaGroup.add(dnaBonds);

    // Dust
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(600 * 3);
    for(let i=0; i<600*3; i++) { dustPositions[i] = (Math.random() - 0.5) * 40; }
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({ 
      color: 0x8b9bb4, size: 0.08, transparent: true, opacity: 0.4,
      map: circleTexture, alphaTest: 0.1 
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    // 4. Parallax Physics & Animation Loop
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    const onScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll);

    // Resize Handler
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // Custom event listener for theme toggle to update fog and blending
    const updateTheme = () => {
      const isDark = document.body.classList.contains('dark-mode');
      scene.fog.color.setHex(isDark ? 0x0d0f14 : 0xf7f5ef);
      material.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
      lineMaterial.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
      material.needsUpdate = true;
      lineMaterial.needsUpdate = true;
    };
    window.addEventListener('theme-changed', updateTheme);

    const clock = new THREE.Clock();
    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation for scroll
      customUniforms.uTime.value = elapsedTime;
      scrollY += (targetScrollY - scrollY) * 0.12;

      // 3D Parallax synced to physical scroll
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = scrollY / (maxScroll || 1);
      
      // Camera flies upwards slowly as we scroll down
      camera.position.y = 15 - (scrollRatio * 30);
      
      // DNA rotates slightly faster based on scroll
      dnaGroup.rotation.y = elapsedTime * 0.05 + (scrollRatio * Math.PI * 2);
      

      // Ambient dust rotation
      dust.rotation.y = elapsedTime * 0.02;
      dust.rotation.x = elapsedTime * 0.01;

      // Removed mouse parallax camera movement
      camera.position.x = 0;
      camera.position.z = 18;
      camera.lookAt(0, camera.position.y - 5, 0);

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('theme-changed', updateTheme);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <div id="bg-color-layer" />
      <div id="webgl-container" ref={mountRef} />
    </>
  );
}
