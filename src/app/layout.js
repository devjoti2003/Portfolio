import { Inter, Lora } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Cursor from '@/components/Cursor';
import WebGLBackground from '@/components/WebGLBackground';


const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const lora = Lora({ subsets: ['latin'], variable: '--font-serif' });

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
        <WebGLBackground />
        <Cursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
