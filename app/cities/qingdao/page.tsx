'use client'

import useTranslation from '../../../lib/useTranslation'
import { Suspense } from 'react'

export default function QingdaoPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QingdaoContent />
    </Suspense>
  )
}

function QingdaoContent() {
  const { t } = useTranslation()
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('qingdao')}</h1>
      <p>{t('qingdaoDescription')}</p>
    </div>
  )
}