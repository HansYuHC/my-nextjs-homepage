import React, { Suspense } from 'react'
import CompanySchaefflerContent from './CompanySchaefflerContent'

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <CompanySchaefflerContent />
    </Suspense>
  )
}
