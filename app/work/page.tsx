'use client'

import useTranslation from '../../lib/useTranslation'
import { Suspense } from 'react'

export default function WorkPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WorkContent />
    </Suspense>
  )
}

function WorkContent() {
  const { t } = useTranslation()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('work')}</h1>
      <p>
        这里可以展示我的工作经历，例如实习、全职岗位、自由职业项目等等。
      </p>
      <ul className="list-disc pl-6 mt-2">
        <li>公司 A - 软件工程师 (2020-2022)</li>
        <li>公司 B - 机械设计师 (2018-2020)</li>
        <li>公司 C - 学生研究助理 (2016-2018)</li>
      </ul>
    </div>
  )
}