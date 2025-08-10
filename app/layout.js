// app/layout.js
'use client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';
import { useLang } from '@/hooks/useLang';

export default function RootLayout({ children }) {
  const { lang } = useLang();

  return (
    <html lang={lang}>
      <head>
        <title>余海川的个人网站</title>
        <meta name="description" content="欢迎来到余海川的个人网站" />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}