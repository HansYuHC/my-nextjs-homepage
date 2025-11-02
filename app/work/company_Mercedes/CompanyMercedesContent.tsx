'use client'

import { useState } from 'react'
import useTranslation from '../../../lib/useTranslation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function CompanyMercedesContent() {
  const { t } = useTranslation()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const images = [
    '/images/mercedes_1.png',
    '/images/mercedes_2.png',
    '/images/mercedes_3.jpg',
  ]

  const breathingAnimation = {
    scale: [1, 1.04, 1],
    opacity: [0.96, 1, 0.96],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  }

  const prevImage = () => {
    setSelectedImage((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : 0
    )
  }

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev !== null ? (prev + 1) % images.length : 0
    )
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景图 */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-[4px] brightness-90"
        style={{ backgroundImage: "url('/images/sindelfingen_city.jpg')" }}
      ></div>

      {/* 半透明遮罩 */}
      <div className="absolute inset-0 bg-white/50"></div>

      {/* 内容区 */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-10">
        <motion.h1
          className="text-4xl font-bold mb-3 text-gray-900 drop-shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('company_Mercedes').replace(/<br\s*\/?>/g, '')}
        </motion.h1>

        <motion.img
          src="/images/Mercedes-logo.png"
          alt="Mercedes Logo"
          className="w-32 h-auto mb-6 cursor-pointer shadow-lg rounded-xl bg-white/60 backdrop-blur-sm p-2 hover:shadow-2xl"
          whileHover={{ scale: 1.1 }}
          animate={{
            y: [0, -5, 0],
            transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          }}
          onClick={() => window.open('https://www.mercedes-benz.com', '_blank')}
        />

        <motion.p
          className="text-gray-800 max-w-2xl whitespace-pre-line leading-relaxed text-lg bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {t('company_Mercedes_work_detailed')}
        </motion.p>

        {/* 图片展示区 */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full">
          {images.map((src, index) => (
            <motion.img
              key={index}
              src={src}
              alt={`Mercedes ${index + 1}`}
              className="rounded-2xl shadow-lg w-full h-48 sm:h-64 object-cover bg-white/70 backdrop-blur-sm cursor-pointer"
              whileHover={{ scale: 1.05 }}
              animate={breathingAnimation}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      {/* 🔍 图片放大 + 左右切换 */}
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
              alt="Enlarged Mercedes"
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
