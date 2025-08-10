'use client';
import Image from 'next/image';
import { useLang } from '@/hooks/useLang';

export default function Footer() {
  const { t, changeLang } = useLang();

  return (
    <footer className="text-center py-6 bg-gray-100 mt-12 border-t border-gray-200">
      {/* 第一层 - 使用翻译函数 */}
      <p className="text-sm text-gray-500">
        {t('copyright', '© 2025 余海川。保留所有权利。')}
      </p>

      {/* 第二层 - 使用翻译函数 */}
      <p className="mt-2 flex justify-center items-center gap-2">
        <span className="text-sm">{t('followMe', '关注我：')}</span>
        <a href="https://www.linkedin.com/in/haichuan-yu/" target="_blank" rel="noopener noreferrer">
          <Image src="/LI-Logo.png" alt="LinkedIn" width={80} height={20} />
        </a>
      </p>

      {/* 语言切换按钮 - 保持不变 */}
      <div className="mt-4 space-x-2">
        <button onClick={() => changeLang('zh')}>中文</button>
        <button onClick={() => changeLang('en')}>English</button>
        <button onClick={() => changeLang('de')}>Deutsch</button>
      </div>
    </footer>
  );
}