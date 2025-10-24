import React, { Suspense } from 'react'
import CompanyHongyuanContent from './CompanyHongyuanContent'

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <CompanyHongyuanContent />
    </Suspense>
  )
}
