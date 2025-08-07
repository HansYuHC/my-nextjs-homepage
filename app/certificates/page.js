'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CertificatesPage() {
  const [lang, setLang] = useState('zh');
  const [certData, setCertData] = useState({});

  // 加载语言文件
  useEffect(() => {
    const storedLang = localStorage.getItem('lang') || 'zh';
    setLang(storedLang);

    fetch(`/lang/certificates.json`)
      .then(res => res.json())
      .then(data => {
        setCertData(data);
      });
  }, []);

  const t = (key) => {
    return certData?.[lang]?.[key] || certData?.zh?.[key] || key;
  };

  const certificates = [
    { img: 'cert-highschool.jpg', alt: '高中毕业证书', key: 'highschoolCert' },
    { img: 'cert-abitur.jpg', alt: '高考成绩证书', key: 'GaoKaoCert' },
    { img: 'cert-scut.jpg', alt: 'SCUT 成绩单', key: 'scutTranscript' },
    { img: 'cert-aps.png', alt: 'APS 证书', key: 'apsCert' },
    { img: 'cert-dsh.jpg', alt: 'DSH 语言证书', key: 'dshCert' },
    { img: 'cert-cad.png', alt: 'CAD 证书', key: 'cadCert' },
    { img: 'cert-schaeffler.png', alt: 'Schaeffler 实习', key: 'schaefflerIntern' },
    { img: 'cert-kit-bachelor.jpg', alt: 'KIT 本科毕业证', key: 'kitBachelor' },
    { img: 'cert-stabilus.png', alt: 'Stabilus 实习', key: 'stabilusIntern' },
    { img: 'cert-kit-master.jpeg', alt: 'KIT 硕士毕业证', key: 'kitMaster' }
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold" data-lang-key="myCertificates">
          {t('myCertificates')}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 certificates-container">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="certificate-item bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition-transform"
          >
            <Image
              src={`/images/${cert.img}`}
              alt={cert.alt}
              width={600}
              height={400}
              className="w-full h-auto border-b"
            />
            <div
              className="certificate-caption text-center text-sm text-gray-600 py-4"
              data-lang-key={cert.key}
            >
              {t(cert.key)}
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-16 text-center text-sm text-gray-500">
        <p data-lang-key="copyright">
          &copy; 2025 余海川。保留所有权利。
        </p>
        <div className="mt-2">
          <span data-lang-key="followMe" className="mr-2">关注我：</span>
          <a
            href="https://www.linkedin.com/in/haichuan-yu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/LI-Logo.png"
              alt="LinkedIn"
              width={80}
              height={20}
              className="inline-block align-middle"
            />
          </a>
        </div>
        <div className="mt-4">
          <button onClick={() => {
            localStorage.setItem('lang', 'zh');
            setLang('zh');
          }} className="mx-1">中文</button>

          <button onClick={() => {
            localStorage.setItem('lang', 'en');
            setLang('en');
          }} className="mx-1">English</button>

          <button onClick={() => {
            localStorage.setItem('lang', 'de');
            setLang('de');
          }} className="mx-1">Deutsch</button>
        </div>
      </footer>
    </main>
  );
}
