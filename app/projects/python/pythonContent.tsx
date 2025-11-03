'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTranslation from '../../../lib/useTranslation'

interface Project {
  id: number
  key: string
  image: string
}

const pythonProjects: Project[] = [
  { id: 1, key: 'projectPython-1', image: '/images/projectPython_1.png' },
  { id: 2, key: 'projectPython-2', image: '/images/projectPython_2.png' },
  { id: 3, key: 'projectPython-3', image: '/images/projectPython_3.png' },
  { id: 4, key: 'projectPython-4', image: '/images/projectPython_4.png' },
]

export default function PythonContent() {
  const { t } = useTranslation()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [animationDelays, setAnimationDelays] = useState<number[]>([])

  // ✅ 只在客户端生成随机延迟数组
  useEffect(() => {
    setAnimationDelays(Array.from({ length: 12 }, () => Math.random() * 0.8))
  }, [])

  return (
    <div className="container mx-auto px-6 py-12">
      {/* 顶部标题区 */}
      <div className="relative w-full h-60 md:h-80 mb-12 rounded-2xl overflow-hidden shadow-lg group">
        {/* 模糊背景层 */}
        <div
          className="absolute inset-0 bg-center bg-cover blur-sm scale-105 brightness-110"
          style={{
            backgroundImage: "url('/images/projects/python.png')",
            maskImage:
              'linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.4))',
            WebkitMaskImage:
              'linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.4))',
          }}
        ></div>

        {/* 半透明遮罩层 */}
        <div className="absolute inset-0 bg-black/25"></div>

        {/* 左右碎片层（使用固定的延迟值） */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 z-10">
          {animationDelays.map((delay, i) => (
            <span
              key={i}
              className="block w-full h-full bg-center bg-cover opacity-0 animate-shard blur-[2px] scale-110"
              style={{
                backgroundImage: "url('/images/projects/python.png')",
                animationDelay: `${delay}s`,
              }}
            ></span>
          ))}
        </div>

        {/* 清晰前景层 */}
        <div className="relative flex flex-col items-center justify-center w-full h-full text-center z-20">
          <img
            src="/images/projects/python.png"
            alt="Python"
            className="object-contain max-h-full w-auto drop-shadow-lg transition-opacity duration-1000 opacity-0 animate-fadein"
          />
          <h1 className="absolute text-white text-4xl md:text-5xl font-bold tracking-wide drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
            Python
          </h1>
        </div>
      </div>

      {/* 项目内容 */}
      {pythonProjects.map((proj, index) => (
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
            className="w-full md:w-1/2 max-h-64 md:max-h-72 rounded-2xl shadow-lg object-contain"
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
              <p className="text-gray-800 whitespace-pre-line">
                {t(`${selectedProject.key}Long`)}
              </p>

              {/* ✅ 若为 projectPython-1，插入视频 */}
                {selectedProject.key === 'projectPython-1' && (
                  <div className="w-full mt-4">
                    <video
                      src="/videos/python_demo.mp4"  // 🔹 替换为你的视频路径
                      controls
                      className="w-full rounded-lg shadow-md"
                    />
                  </div>
                )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
