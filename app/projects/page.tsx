'use client'

import useTranslation from '../../lib/useTranslation'
import { Suspense } from 'react'

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  )
}

function ProjectsContent() {
  const { t } = useTranslation()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('projects')}</h1>
      <p>
        这里展示我的一些项目，例如网站开发、自动化脚本、科研成果等等。
      </p>
      <ul className="list-disc pl-6 mt-2">
        <li>项目 A - 一个有趣的应用</li>
        <li>项目 B - 一个实用的工具</li>
        <li>项目 C - 一个团队合作成果</li>
      </ul>
    </div>
  )
}