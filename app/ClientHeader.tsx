'use client'

import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import useTranslation from '../lib/useTranslation'

export default function ClientHeader() {
  const { t, lang } = useTranslation()
  const searchParams = useSearchParams()
  const pathname = usePathname() // 使用 usePathname 获取当前路径
  const currentPath = searchParams.get('lang') ? pathname : '/'

  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between">
      <nav className="flex gap-4">
        <Link href={`/?lang=${lang}`}>{t('home')}</Link>
        <Link href={`/about?lang=${lang}`}>{t('about')}</Link>
        <Link href={`/projects?lang=${lang}`}>{t('projects')}</Link>
        <Link href={`/work?lang=${lang}`}>{t('work')}</Link>
        <Link href={`/contact?lang=${lang}`}>{t('contact')}</Link>
      </nav>
      <div className="flex gap-2">
        <Link href={`${currentPath}?lang=en`}>EN</Link>
        <Link href={`${currentPath}?lang=de`}>DE</Link>
        <Link href={`${currentPath}?lang=zh`}>中文</Link>
      </div>
    </header>
  )
}