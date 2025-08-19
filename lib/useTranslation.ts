'use client'

import { useSearchParams } from 'next/navigation'
import translations from '../public/lang/global.json'

type LangKey = 'en' | 'de' | 'zh'

export default function useTranslation() {
  const params = useSearchParams()
  const lang = (params.get('lang') as LangKey) || 'en'
  const t = (key: string) => (translations as any)[lang][key] || key
  return { t, lang }
}
