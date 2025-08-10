// hooks/useLang.js
import { useState, useEffect, useCallback, useRef } from 'react';

export function useLang() {
  const [lang, setLang] = useState('en');
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const isChangingRef = useRef(false);
  const allTranslationsRef = useRef({});

  // 初始化
  useEffect(() => {
    const initializeLanguage = async () => {
      const savedLang = localStorage.getItem('userLanguage') || 'en';
      setLang(savedLang);
      await loadTranslations(savedLang);
    };
    initializeLanguage();
  }, []);

  const loadTranslations = useCallback(async (language) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/lang/global.json?t=${Date.now()}`);
      const data = await res.json();
      allTranslationsRef.current = data;
      setTranslations(data[language] || {});
    } catch (error) {
      console.error('Error loading translations:', error);
      setTranslations({});
    } finally {
      setIsLoading(false);
    }
  }, []);

  const changeLang = useCallback(async (language) => {
    if (language === lang || isChangingRef.current) return;

    isChangingRef.current = true;
    try {
      setLang(language);
      localStorage.setItem('userLanguage', language);

      if (!allTranslationsRef.current[language]) {
        await loadTranslations(language);
      } else {
        setTranslations({ ...allTranslationsRef.current[language] });
      }

      // 强制刷新当前页面
      if (window.location.pathname === '/') {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error changing language:', error);
    } finally {
      isChangingRef.current = false;
    }
  }, [lang, loadTranslations]);

  const t = useCallback((key) => {
    return translations[key] || key;
  }, [translations]);

  return { lang, changeLang, t, isLoading };
}