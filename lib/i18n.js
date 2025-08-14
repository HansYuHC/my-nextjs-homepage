'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'zh', // 默认语言
    fallbackLng: 'zh',
    interpolation: { escapeValue: false },
    resources: {
      zh: { common: require('../public/locales/zh/common.json') },
      en: { common: require('../public/locales/en/common.json') },
    },
    ns: ['common'],
    defaultNS: 'common',
  });

export default i18n;
