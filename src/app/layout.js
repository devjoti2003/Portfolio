import { Inter, Lora } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Cursor from '@/components/Cursor';
import WebGLBackground from '@/components/WebGLBackground';
import Preloader from '@/components/Preloader';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const lora = Lora({ subsets: ['latin'], variable: '--font-serif' });

const glassBackdropStyles = `
  .vertical-nav:hover,
  .top-nav.scrolled,
  .hidden-links,
  .mobile-menu-overlay,
  .blog-tile,
  .filter-bar,
  .reading-canvas,
  .posh-btn,
  .app-card {
    -webkit-backdrop-filter: var(--blur-md);
    backdrop-filter: var(--blur-md);
    isolation: isolate;
  }

  .menu-trigger {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    isolation: isolate;
  }

  .menu-trigger:hover {
    -webkit-backdrop-filter: blur(20px) saturate(150%);
    backdrop-filter: blur(20px) saturate(150%);
  }

  .blog-tile,
  .filter-bar {
    background-color: var(--card-bg);
  }

  .reading-canvas {
    -webkit-backdrop-filter: blur(16px) saturate(150%);
    backdrop-filter: blur(16px) saturate(150%);
  }

  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    .vertical-nav:hover,
    .top-nav.scrolled,
    .hidden-links,
    .blog-tile,
    .filter-bar,
    .posh-btn,
    .app-card {
      background-color: var(--nav-bg);
    }

    .reading-canvas {
      background-color: rgba(255, 255, 255, 0.92);
    }

    body.dark-mode .reading-canvas {
      background-color: rgba(15, 17, 23, 0.92);
    }
  }
`;

export const metadata = {
  title: 'Devjoti Kundu | Bioinformatics & ML',
  description: 'Portfolio of Devjoti Kundu, bridging the gap between computational logic and biological complexity.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body>
        <style
          id="glass-backdrop-browser-fix"
          dangerouslySetInnerHTML={{ __html: glassBackdropStyles }}
        />
        <Preloader />
        <WebGLBackground />
        <Cursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
