import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LanguageProvider } from '../context/LanguageContext';

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <head>
        <title>余海川的个人网站</title>
        <meta name="description" content="欢迎来到余海川的个人网站" />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
