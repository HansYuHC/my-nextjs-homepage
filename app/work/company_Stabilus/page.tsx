import React, { Suspense } from 'react'
import CompanyStabilusContent from './CompanyStabilusContent'

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <CompanyStabilusContent />
    </Suspense>
  )
}
