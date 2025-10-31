import React, { Suspense } from 'react'
import CompanyBertrandtContent from './CompanyBertrandtContent'

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <CompanyBertrandtContent />
    </Suspense>
  )
}
