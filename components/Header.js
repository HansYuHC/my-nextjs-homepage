'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '../lib/i18n';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const [t, setT] = useState({});

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    async function loadHeader() {
      const data = await getTranslation(lang, 'header');
      setT(data);
    }
    loadHeader();
  }, [lang]);

  return (
    <header>
      {/* 语言切换 */}
      <div className="language-switcher">
        <Image src="/images/flags/china.png" alt="中文" width={24} height={16} style={{ cursor: 'pointer' }} onClick={() => setLang('zh')} />
        <Image src="/images/flags/usa.png" alt="English" width={24} height={16} style={{ cursor: 'pointer' }} onClick={() => setLang('en')} />
        <Image src="/images/flags/germany.png" alt="Deutsch" width={24} height={16} style={{ cursor: 'pointer' }} onClick={() => setLang('de')} />
      </div>

      <h1 className="welcome-text">{t.welcome}</h1>

      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link href="/" onClick={closeMenu}>{t.home}</Link></li>
          <li><Link href="/about" onClick={closeMenu}>{t.about}</Link></li>
          <li><Link href="/projects" onClick={closeMenu}>{t.projects}</Link></li>
          <li><Link href="/academic" onClick={closeMenu}>{t.academic}</Link></li>
          <li><Link href="/work" onClick={closeMenu}>{t.work}</Link></li>
          <li><Link href="/certificates" onClick={closeMenu}>{t.certificates}</Link></li>
          <li><Link href="/contact" onClick={closeMenu}>{t.contact}</Link></li>
        </ul>
      </nav>
    </header>
  );
}
