'use client';

import { useState, useEffect } from 'react';

export function useLang() {
  const [lang, setLang] = useState('zh');

  useEffect(() => {
    const storedLang = localStorage.getItem('site-lang');
    if (storedLang) setLang(storedLang);
  }, []);

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('site-lang', newLang);
    // 页面刷新或者触发重新渲染，具体看你用的翻译实现
  };

  // 这里先简单返回默认文案，你页面里可以用 t(key, default) 去翻译
  const t = (key, defaultValue) => {
    // TODO: 根据 lang 去找对应的翻译，或者你自己实现
    return defaultValue;
  };

  return { lang, changeLang, t };
}
