'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTranslation from '../../../lib/useTranslation'

interface Project {
  id: number
  key: string
  image: string
  detailImage?: string        // ✅ 可选单图
  detailImages?: string[]     // ✅ 可选多图
  imageSize?: string
}

const matlabProjects: Project[] = [
  {
    id: 1,
    key: 'projectMATLAB-1',
    image: '/images/projectMATLAB_1.png',
    detailImage: '/images/projectMATLAB_detail_1.png', // ✅ 只有一张图
    imageSize: 'md:w-2/5',
  },
  {
    id: 2,
    key: 'projectMATLAB-2',
    image: '/images/projectMATLAB_2.png',
    // ✅ 两张并排显示
    detailImages: [
      '/images/projectMATLAB_detail_2a.png',
      '/images/projectMATLAB_detail_2b.png',
    ],
    imageSize: 'md:w-1/2',
  },
  {
    id: 3,
    key: 'projectMATLAB-3',
    image: '/images/projectMATLAB_3.png',
    // ✅ 两张并排显示
    detailImages: [
      '/images/projectMATLAB_detail_3a.png',
      '/images/projectMATLAB_detail_3b.png',
    ],
    imageSize: 'md:w-2/3',
  },
  {
    id: 4,
    key: 'projectMATLAB-4',
    image: '/images/projectMATLAB_4.png',
    // ✅ 两张并排显示
    detailImage:'/images/projectMATLAB_detail_4.png',
    imageSize: 'md:w-2/3',
  },
]

export default function MatlabContent() {
  const { t } = useTranslation()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [shardDelays, setShardDelays] = useState<number[]>([])

  useEffect(() => {
    setShardDelays(Array.from({ length: 12 }, () => Math.random() * 0.8))
  }, [])

  return (
    <div className="container mx-auto px-6 py-12">
      {/* 顶部标题区 */}
      <div className="relative w-full h-60 md:h-80 mb-12 rounded-2xl overflow-hidden shadow-lg group">
        <div
          className="absolute inset-0 bg-center bg-cover blur-sm scale-105 brightness-110"
          style={{
            backgroundImage: "url('/images/projects/matlab.png')",
            maskImage:
              'linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.4))',
            WebkitMaskImage:
              'linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.4))',
          }}
        ></div>

        <div className="absolute inset-0 bg-black/25"></div>

        {/* 左右碎片层 */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 z-10">
          {shardDelays.map((delay, i) => (
            <span
              key={i}
              className="block w-full h-full bg-center bg-cover opacity-0 animate-shard blur-[3px] scale-110"
              style={{
                backgroundImage: "url('/images/projects/matlab.png')",
                animationDelay: `${delay}s`,
              }}
            ></span>
          ))}
        </div>

        {/* 清晰前景层 */}
        <div className="relative flex flex-col items-center justify-center w-full h-full text-center z-20">
          <img
            src="/images/projects/matlab.png"
            alt="MATLAB"
            className="object-contain max-h-full w-auto drop-shadow-lg transition-opacity duration-1000 opacity-0 animate-fadein"
          />
          <h1 className="absolute text-white text-4xl md:text-5xl font-bold tracking-wide drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
            MATLAB
          </h1>
        </div>
      </div>

      {/* 项目内容 */}
      {matlabProjects.map((proj, index) => (
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
          <motion.img
            src={proj.image}
            alt={t(proj.key)}
            className={`w-full ${proj.imageSize || 'md:w-1/2'} max-h-64 md:max-h-72 rounded-2xl shadow-lg object-contain`}
            initial={{ rotateY: index % 2 === 0 ? 90 : -90, opacity: 0 }}
            whileInView={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
          />

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

      {/* 弹窗详情 */}
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
              <p className="text-gray-800 whitespace-pre-line mb-4">
                {t(`${selectedProject.key}Long`)}
              </p>

              {/* ✅ 支持单图或两图并排 */}
              {(selectedProject.detailImages?.length > 0 || selectedProject.detailImage) && (
                <div className="mt-4 flex flex-wrap justify-center gap-4">
                  {(selectedProject.detailImages || [selectedProject.detailImage])
                    .slice(0, 2)
                    .map((img, index) => (
                      <img
                        key={index}
                        src={img!}
                        alt={`${t(selectedProject.key)} detail ${index + 1}`}
                        className="w-full sm:w-[48%] rounded-lg object-cover"
                      />
                    ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
