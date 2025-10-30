'use client'

import { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import useTranslation from '../../lib/useTranslation'

const categories = [
  { id: 'cad', title: 'CAD', image: '/images/projects/cad.jpg', key: 'project_cadIntro' },
  { id: 'matlab', title: 'MATLAB', image: '/images/projects/matlab.png', key: 'project_matlabIntro' },
  { id: 'vba', title: 'VBA', image: '/images/projects/vba.png', key: 'project_vbaIntro' },
  { id: 'python', title: 'Python', image: '/images/projects/python.png', key: 'project_pythonIntro' },
  { id: 'others', title: 'Others', image: '/images/projects/others.png', key: 'project_othersIntro' },
]

function ProjectsContent() {
  const { t, lang } = useTranslation()
  const router = useRouter()

  return (
    <div className="container mx-auto px-6 py-12">
      {/* 标题和简介 */}
      <h1 className="text-3xl font-bold mb-4 text-center">{t('projects')}</h1>
      <p className="text-center text-gray-700 max-w-3xl mx-auto mb-10">
        {t('projectsOverviewText')}
      </p>

      {/* 五个项目类别 */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,0,0,0.15)' }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push(`/projects/${cat.id}?lang=${lang}`)}
            className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md w-full max-w-sm"
          >
            {/* 顶部图片 */}
            <div className="relative h-80 w-full">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h2 className="text-white text-2xl font-bold">{cat.title}</h2>
              </div>
            </div>

            {/* 底部文字 */}
            <div className="p-5">
              <p className="text-gray-700 text-center">{t(cat.key)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  )
}
