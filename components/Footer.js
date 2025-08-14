
'use client';

import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer style={{ padding: '1rem', borderTop: '1px solid #ccc', marginTop: '2rem' }}>
      <p>&copy; 2025 Haichuan Yu</p>
      <p>{t('contact')}</p>
    </footer>
  );
}
