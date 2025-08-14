
'use client';

import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <h1>{t('welcome')}</h1>
      <nav style={{ marginTop: '0.5rem' }}>
        <a href="/" style={{ marginRight: '1rem' }}>{t('about')}</a>
        <a href="/" style={{ marginRight: '1rem' }}>{t('contact')}</a>
      </nav>
      <div style={{ marginTop: '0.5rem' }}>
        <button onClick={() => i18n.changeLanguage('zh')} style={{ marginRight: '0.5rem' }}>中文</button>
        <button onClick={() => i18n.changeLanguage('en')}>English</button>
      </div>
    </header>
  );
}
