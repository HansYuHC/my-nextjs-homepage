import React, { Suspense } from 'react'
import CompanyLolinContent from './CompanyLolinContent'

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <CompanyLolinContent />
    </Suspense>
  )
}
