'use client'

import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import useTranslation from '../lib/useTranslation'
import { Suspense, useEffect, useState } from 'react'

export default function ClientHeader() {
  return (
    <Suspense fallback={<header className="p-4 bg-gray-800 text-white">Loading...</header>}>
      <ClientHeaderContent />
    </Suspense>
  )
}

function ClientHeaderContent() {
  const { t, lang } = useTranslation()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [currentPath, setCurrentPath] = useState('/')

  useEffect(() => {
  //  setCurrentPath(searchParams.get('lang') ? pathname : '/')
  //}, [pathname, searchParams])
      setCurrentPath(pathname)
      },[pathname])

  return (
    <header className="fixed top-0 left-0 w-full p-4
            bg-black/65 text-white flex justify-between
                backdrop-blur-md shadow-md z-50">
      <nav className="flex gap-4">
        <Link href={`/?lang=${lang}`}>{t('home')}</Link>
        <div className="relative group">
          <span className="cursor-pointer">{t('about')}</span>
          <div className="absolute hidden group-hover:grid bg-gray-700 text-white rounded shadow-lg z-10 w-64 grid-cols-2 gap-1 p-2">
            <Link href={`/about?lang=${lang}`} className="px-2 py-1 hover:bg-gray-600 rounded">{t('aboutTotal')}</Link>
            <Link href={`/cities/qingdao?lang=${lang}`} className="px-2 py-1 hover:bg-gray-600 rounded">{t('qingdao')}</Link>
            <Link href={`/cities/guangzhou?lang=${lang}`} className="px-2 py-1 hover:bg-gray-600 rounded">{t('guangzhou')}</Link>
            <Link href={`/cities/karlsruhe?lang=${lang}`} className="px-2 py-1 hover:bg-gray-600 rounded">{t('karlsruhe')}</Link>
            <Link href={`/cities/boeblingen?lang=${lang}`} className="px-2 py-1 hover:bg-gray-600 rounded">{t('boeblingen')}</Link>

          </div>
        </div>
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
