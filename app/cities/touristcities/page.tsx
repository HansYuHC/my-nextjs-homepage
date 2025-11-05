'use client'

import { Suspense } from 'react'
import useTranslation from '../../../lib/useTranslation'

export default function TouristCitiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TouristCitiesContent />
    </Suspense>
  )
}

function TouristCitiesContent() {
  const { t } = useTranslation()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">{t('touristcities')}</h1>
      <p className="text-gray-700 text-center">{t('touristcitiesDescription')}</p>
      {/* 其他内容 */}
    </div>
  )
}
