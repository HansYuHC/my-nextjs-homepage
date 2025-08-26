'use client'

import useTranslation from '../../../lib/useTranslation'
import { Suspense } from 'react'

export default function QdzPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QdzContent />
    </Suspense>
  )
}

function QdzContent() {
  const { t } = useTranslation()
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('qdez')}</h1>
      <p>{t('qdezDescription')}</p>
    </div>
  )
}