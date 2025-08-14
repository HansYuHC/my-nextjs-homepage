'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import '../lib/i18n';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <main style={{ padding: '2rem' }}>
      <Header />
      <section style={{ marginTop: '2rem' }}>
        <h2>{t('about')}</h2>
        <p>这里可以写首页或关于我的内容。</p>
      </section>
      <Footer />
    </main>
  );
}
