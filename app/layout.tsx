import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DIGITIHA 🔥 - Handwritten Digit Collection for AI',
  description: 'Join the DIGITIHA project! Draw handwritten digits to help train advanced CNN models. Contribute to cutting-edge machine learning research.',
  keywords: ['DIGITIHA', 'MNIST', 'handwriting', 'AI', 'machine learning', 'digit recognition', 'CNN', 'deep learning'],
  authors: [{ name: 'FORSA Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
