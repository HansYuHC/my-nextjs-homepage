'use client';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/lib/i18n';

export default function AboutPage() {
  const { lang, setLang } = useLanguage();
  const [t, setT] = useState({});

  useEffect(() => {
    async function loadAbout() {
      const data = await getTranslation(lang, 'about');
      setT(data);
      document.title = data.aboutTitle || 'About';
    }
    loadAbout();
  }, [lang]);

  useEffect(() => {
    import('leaflet').then((L) => {
      const qingdaoMap = L.map('qingdao-map').setView([36.0671, 120.3826], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(qingdaoMap);

      const germanyMap = L.map('germany-map').setView([48.694, 9.011], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(germanyMap);
    });
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex gap-2 justify-end mb-4">
        {['zh','en','de'].map(l => (
          <button key={l} onClick={() => setLang(l)} className={`px-3 py-1 rounded ${lang===l ? 'bg-blue-500 text-white':'bg-gray-200'}`}>{l.toUpperCase()}</button>
        ))}
      </div>

      <section id="about">
        <h2>{t.about}</h2>
        <p>{t.aboutDescription}</p>
        <p>{t.aboutExperience}</p>

        <h3>{t.qingdao}</h3>
        <div id="qingdao-map" style={{height:'400px', marginBottom:'2rem'}}></div>

        <h3>{t.germany}</h3>
        <div id="germany-map" style={{height:'400px'}}></div>
      </section>

      <section id="education" className="mt-8">
        <h2>{t.HighEducation}</h2>
        <p>{t.GuangzhouSCUT}</p>
        <p>{t.KarlsruheKIT}</p>
      </section>
    </main>
  );
}
