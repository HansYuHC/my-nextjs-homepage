'use client';

import Image from 'next/image';

export default function Footer({ changeLang }) {
  return (
    <footer className="text-center py-6 bg-gray-100 mt-12 border-t border-gray-200">
      <p className="text-sm text-gray-500">&copy; 2025 余海川。保留所有权利。</p>
      <p className="mt-2 flex justify-center items-center gap-2">
        <span className="text-sm">关注我：</span>
        <a href="https://www.linkedin.com/in/haichuan-yu/" target="_blank" rel="noopener noreferrer">
          <Image src="/LI-Logo.png" alt="LinkedIn" width={80} height={20} />
        </a>
      </p>
      <div className="mt-4 space-x-2">
        <button onClick={() => changeLang && changeLang('zh')}>中文</button>
        <button onClick={() => changeLang && changeLang('en')}>English</button>
        <button onClick={() => changeLang && changeLang('de')}>Deutsch</button>
      </div>
    </footer>
  );
}
