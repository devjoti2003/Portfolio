import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Custom Vite plugin to auto-generate the blog manifest
function markdownManifestPlugin() {
  const postsDir = path.resolve(__dirname, 'public/posts');
  const manifestPath = path.resolve(postsDir, 'manifest.json');

  const generateManifest = () => {
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
    }

    const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
    const manifest = files.map(file => {
      const rawContent = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      const { data } = matter(rawContent);
      
      // Ensure id exists, fallback to filename without extension
      if (!data.id) {
        data.id = file.replace('.md', '');
      }
      return data;
    });

    // Sort by date descending by default
    manifest.sort((a, b) => new Date(b.date) - new Date(a.date));

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`[Blog Manifest] Generated manifest.json with ${manifest.length} posts.`);
  };

  return {
    name: 'markdown-manifest-generator',
    buildStart() {
      generateManifest();
    },
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.md') && file.includes('/public/posts/')) {
        generateManifest();
        server.ws.send({ type: 'full-reload' });
      }
    }
  };
}

export default defineConfig({
  plugins: [markdownManifestPlugin()]
});
