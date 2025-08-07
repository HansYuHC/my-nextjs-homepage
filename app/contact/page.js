'use client'

import { useEffect, useState } from 'react'

export default function ContactPage() {
  const [lang, setLang] = useState('zh')
  const [content, setContent] = useState({})

  useEffect(() => {
    fetch('/lang/contact.json')
      .then((res) => res.json())
      .then((data) => setContent(data[lang]))
  }, [lang])

  const changeLanguage = (langCode) => setLang(langCode)

  return (
    <div data-page="contact" className="min-h-screen flex flex-col">
      <header className="bg-gray-100 py-4 px-6">
        <h1 className="text-xl font-bold">{content?.contactTitle || '联系方式'}</h1>
      </header>

      <main className="flex-grow px-6 py-8">
        <section>
          <p className="mb-2">{content?.email || '邮箱: yhchuan962@outlook.com'}</p>
          <p className="mb-6">{content?.telephone || '电话: +49 123-4567-8901'}</p>

          <div className="wechat-contact mb-6">
            <p>{content?.wechat || '微信:'}</p>
            <img
              src="/images/wechat.png"
              alt="微信二维码"
              style={{ width: '180px', height: '150px' }}
              className="my-3"
            />
            <p>{content?.wechatDescription || '扫描二维码添加我的微信'}</p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-200 text-sm text-center py-4">
        <p>&copy; 2025 Haichuan Yu. All rights reserved.</p>
        <p className="mt-2 flex justify-center items-center gap-2">
          <span>Follow me:</span>
          <a
            href="https://www.linkedin.com/in/haichuan-yu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/LI-Logo.png"
              alt="LinkedIn"
              style={{ width: '80px', height: '20px', verticalAlign: 'middle' }}
            />
          </a>
        </p>
        <div className="mt-3 space-x-2">
          <button onClick={() => changeLanguage('zh')}>中文</button>
          <button onClick={() => changeLanguage('en')}>English</button>
          <button onClick={() => changeLanguage('de')}>Deutsch</button>
        </div>
      </footer>
    </div>
  )
}
