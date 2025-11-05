'use client'

import useTranslation from '../../../lib/useTranslation'

export default function TouristCitiesPage() {
  const { t } = useTranslation()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">{t('touristcities')}</h1>
      <p className="text-gray-700 text-center">{t('touristcitiesDescription')}</p>
    </div>
  )
}
