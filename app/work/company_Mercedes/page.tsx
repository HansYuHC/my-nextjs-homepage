import React, { Suspense } from 'react'
import CompanyMercedesContent from './CompanyMercedesContent'

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <CompanyMercedesContent />
    </Suspense>
  )
}
