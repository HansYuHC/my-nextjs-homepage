'use client'

import { useSearchParams } from 'next/navigation'
import translations from '../public/lang/global.json'

interface Translations {
  [lang: string]: {
    [key: string]: string
  }
}

type LangKey = 'en' | 'de' | 'zh'

export default function useTranslation() {
  const params = useSearchParams()
  const lang = (params.get('lang') as LangKey) || 'en'
  const t = (key: string) => (translations as Translations)[lang][key] || key
  return { t, lang }
}