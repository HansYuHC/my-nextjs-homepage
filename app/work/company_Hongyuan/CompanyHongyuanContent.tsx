'use client'

import { useState } from 'react'
import useTranslation from '../../../lib/useTranslation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function CompanyHongyuanContent() {
  const { t } = useTranslation()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // 图片数组
  const images = [
    '/images/hongyuan_1.png',
    '/images/hongyuan_2.jpeg',
    '/images/hongyuan_3.jpeg',
  ]

  // 呼吸动画定义
  const breathingAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.95, 1, 0.95],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  }

  // 上一张
  const prevImage = () => {
    setSelectedImage((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0))
  }

  // 下一张
  const nextImage = () => {
    setSelectedImage((prev) => (prev !== null ? (prev + 1) % images.length : 0))
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 背景图片：莱州市 */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-[2px] brightness-95 scale-105"
        style={{ backgroundImage: "url('/images/laizhou_city.png')" }}
      ></div>

      {/* 半透明遮罩 */}
      <div className="absolute inset-0 bg-white/50"></div>

      {/* 内容层 */}
      <div className="relative z-10 flex flex-col items-center justify-center p-10 text-center">
        {/* 标题 */}
        <motion.h1
          className="text-4xl font-bold mb-3 drop-shadow-md text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('company_Hongyuan').replace(/<br\s*\/?>/g, '')}
        </motion.h1>

        {/* 公司 Logo */}
        <motion.img
          src="/images/hongyuan-logo.png"
          alt="Hongyuan Logo"
          className="w-44 h-auto mb-6 cursor-pointer shadow-md hover:shadow-lg bg-white/70 rounded-2xl p-2"
          whileHover={{ scale: 1.1 }}
          animate={{
            y: [0, -5, 0],
            transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          }}
          onClick={() => window.open('https://www.chinavise.com', '_blank')}
        />

        {/* 介绍文字 */}
        <motion.p
          className="text-gray-800 max-w-2xl whitespace-pre-line bg-white/70 rounded-xl p-4 shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {t('company_Hongyuan_work_detailed')}
        </motion.p>

        {/* 图片区域 */}
        <div className="mt-10 flex justify-center gap-6 max-w-5xl w-full">
          {images.map((src, index) => (
            <motion.img
              key={index}
              src={src}
              alt={`Hongyuan ${index + 1}`}
              className="rounded-2xl shadow-lg h-64 object-cover bg-white/70 cursor-pointer transition-all duration-300 hover:scale-105"
              style={{ width: '30%' }}
              whileHover={{ scale: 1.05 }}
              animate={breathingAnimation}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      {/* 🔍 图片放大预览弹窗 */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 关闭按钮 */}
            <button
              className="absolute top-6 right-6 text-white text-3xl hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>

            {/* 左右切换箭头 */}
            <button
              className="absolute left-6 text-white hover:text-gray-300"
              onClick={prevImage}
            >
              <ChevronLeft size={48} />
            </button>
            <button
              className="absolute right-6 text-white hover:text-gray-300"
              onClick={nextImage}
            >
              <ChevronRight size={48} />
            </button>

            {/* 当前大图 */}
            <motion.img
              key={selectedImage}
              src={images[selectedImage]}
              alt="Enlarged Hongyuan"
              className="max-h-[80vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
