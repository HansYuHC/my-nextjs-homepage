// app/layout.js
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

export const metadata = {
  title: '余海川的个人网站',
  description: '欢迎来到余海川的个人网站',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
