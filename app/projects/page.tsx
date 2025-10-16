
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTranslation from '../../lib/useTranslation'
import { Suspense } from 'react'

interface Project {
  id: number
  key: string
  image: string
}

const projectsData: Project[] = [
  {
    id: 1,
    key: 'projectCAD-1',
    image: '/images/projectCAD_1.png',
  },
  {
    id: 2,
    key: 'projectCAD-2',
    image: '/images/projectCAD_2.png',
  },
  {
    id: 3,
    key: 'projectCAD-3',
    image: '/images/projectCAD_3.png',
  },
  {
    id: 4,
    key: 'projectVBA-1',
    image: '/images/projectVBA_1.png',
  },
  {
    id: 5,
    key: 'projectMATLAB-1',
    image: '/images/projectMATLAB_1.png',
  },
  {
    id: 6,
    key: 'projectMATLAB-2',
    image: '/images/projectMATLAB_2.png',
  },
  {
    id: 7,
    key: 'projectMATLAB-3',
    image: '/images/projectMATLAB_3.png',
  },
  {
    id: 8,
    key: 'projectPython-1',
    image: '/images/projectPython_1.png',
  },
  {
    id: 9,
    key: 'projectPython-2',
    image: '/images/projectPython_2.png',
  },
  {
    id: 10,
    key: 'projectPython-3',
    image: '/images/projectPython_3.png',
  },
  {
    id: 11,
    key: 'projectPython-4',
    image: '/images/projectPython_4.png',
  }
]

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-[80vh]">
          <motion.div
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  )
}

function ProjectsContent() {
  const { t, lang } = useTranslation()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">{t('projects')}</h1>

      {projectsData.map((proj, index) => (
        <motion.div
          key={proj.id}
          className={`flex flex-col md:flex-row items-center mb-12 gap-6 ${
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          {/* 图片部分 */}
          <motion.img
            src={proj.image}
            alt={t(proj.key)}
            className="w-full md:w-1/2 rounded-2xl shadow-lg object-cover"
            initial={{ rotateY: index % 2 === 0 ? 90 : -90, opacity: 0 }}
            whileInView={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
          />

          {/* 文字部分 */}
          <div className="md:w-1/2">
            <h2 className="text-xl font-semibold mb-2">{t(proj.key)}</h2>
            <p className="text-gray-700">{t(`${proj.key}Short`)}</p>
            <button
              className="mt-3 text-blue-600 hover:underline"
              onClick={() => setSelectedProject(proj)}
            >
              {t('readMore')} →
            </button>
          </div>
        </motion.div>
      ))}

      {/* 弹窗 */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4">{t(selectedProject.key)}</h2>
              <p className="text-gray-800 whitespace-pre-line">
                {t(`${selectedProject.key}Long`)}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
