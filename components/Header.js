'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
// import './Header.css'; // 可选样式文件，先保留

export default function Header({ title }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const changeLanguage = (lang) => {
    console.log('切换语言到：', lang);
    // 可添加动态 JSON 切换逻辑（之后实现）
  };

  return (
    <header>
      {/* 移动端控制栏 */}
      <div className="mobile-header">
        <div className="hamburger" onClick={toggleMenu}>☰</div>
        <div className="language-switcher-mobile">
          <Flag lang="zh" img="/images/flags/china.png" onClick={changeLanguage} />
          <Flag lang="en" img="/images/flags/usa.png" onClick={changeLanguage} />
          <Flag lang="de" img="/images/flags/germany.png" onClick={changeLanguage} />
        </div>
      </div>

      {/* 桌面语言切换器 */}
      <div className="language-switcher desktop-language">
        <LanguageOption lang="zh" img="/images/flags/china.png" text="中文" onClick={changeLanguage} />
        <LanguageOption lang="en" img="/images/flags/usa.png" text="English" onClick={changeLanguage} />
        <LanguageOption lang="de" img="/images/flags/germany.png" text="Deutsch" onClick={changeLanguage} />
      </div>

      {/* 页面专属标题容器 */}
      <div id="dynamic-title-container">
        <h1>{title}</h1>
      </div>

      {/* 导航栏 */}
      <div className="nav-container">
        <nav id="navbar" className={menuOpen ? 'open' : ''}>
          <ul className="nav-list">
            <NavItem href="/" label="首页" onClick={closeMenu} />
            <NavItem href="/about" label="关于我" onClick={closeMenu} />
            <NavItem href="/projects" label="个人项目" onClick={closeMenu} />
            <NavItem href="/academic" label="学术成果" onClick={closeMenu} />
            <NavItem href="/work" label="工作经历" onClick={closeMenu} />
            <NavItem href="/certificates" label="我的证书" onClick={closeMenu} />
            <NavItem href="/contact" label="联系方式" onClick={closeMenu} />
          </ul>
        </nav>
      </div>
    </header>
  );
}

function NavItem({ href, label, onClick }) {
  return (
    <li>
      <Link href={href} onClick={onClick}>
        {label}
      </Link>
    </li>
  );
}

function Flag({ lang, img, onClick }) {
  return (
    <Image
      src={img}
      alt={lang}
      width={24}
      height={16}
      className="flag-icon"
      onClick={() => onClick(lang)}
    />
  );
}

function LanguageOption({ lang, img, text, onClick }) {
  return (
    <div className="language-option" onClick={() => onClick(lang)}>
      <Image src={img} alt={text} width={24} height={16} className="flag-icon" />
      <span className="language-text">{text}</span>
    </div>
  );
}
