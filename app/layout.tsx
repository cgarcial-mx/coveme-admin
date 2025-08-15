import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { QueryClientProvider } from '@/lib/providers';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Marchante MX Admin',
  description: 'Marchante MX Admin',
  generator: 'Marchante MX Admin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <QueryClientProvider>{children}</QueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
