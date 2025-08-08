'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import './Header.css'; // 放导航栏样式

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const changeLanguage = (lang) => {
    console.log(`切换语言到: ${lang}`);
    // 之后可加入动态切换逻辑
  };

  return (
    <header>
      {/* 语言切换 */}
      <div className="language-switcher">
        <Image src="/images/flags/china.png" alt="中文" width={24} height={16} onClick={() => changeLanguage('zh')} />
        <Image src="/images/flags/usa.png" alt="English" width={24} height={16} onClick={() => changeLanguage('en')} />
        <Image src="/images/flags/germany.png" alt="Deutsch" width={24} height={16} onClick={() => changeLanguage('de')} />
      </div>

      {/* 欢迎词 */}
      <h1 className="welcome-text">欢迎来到余海川的个人网站</h1>

      {/* 导航栏 */}
      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link href="/" onClick={closeMenu}>首页</Link></li>
          <li><Link href="/about" onClick={closeMenu}>关于我</Link></li>
          <li><Link href="/projects" onClick={closeMenu}>个人项目</Link></li>
          <li><Link href="/academic" onClick={closeMenu}>学术成果</Link></li>
          <li><Link href="/work" onClick={closeMenu}>工作经历</Link></li>
          <li><Link href="/certificates" onClick={closeMenu}>我的证书</Link></li>
          <li><Link href="/contact" onClick={closeMenu}>联系方式</Link></li>
        </ul>
      </nav>
    </header>
  );
}
