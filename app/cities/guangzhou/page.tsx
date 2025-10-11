'use client'

import useTranslation from '../../../lib/useTranslation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Suspense } from 'react'
import { useEffect, useState } from 'react'

export default function GuangzhouPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GuangzhouContent />
    </Suspense>
  )
}

function GuangzhouContent() {
  const { t } = useTranslation()
  const [screenWidth, setScreenWidth] = useState(1200)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null) // 当前查看图片索引
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // 监听窗口大小
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = screenWidth < 768
  const isTablet = screenWidth >= 768 && screenWidth < 1024

  // 小图配置
  const subImages = [
    {
      src: '/images/guangzhouMeiShi.jpg',
      text: t('guangzhouMeishi'),
      angle: -40,
      radiusFactor: { mobile: 1.2, tablet: 1.0, desktop: 1.0 },
      w: '16vw',
      h: '20vw',
    },
    {
      src: '/images/scut.jpg',
      text: t('guangzhouSCUT'),
      angle: 30,
      radiusFactor: { mobile: 1.1, tablet: 0.9, desktop: 0.9 },
      w: '20vw',
      h: '12vw',
    },
    {
      src: '/images/gzBeijingRoad.jpg',
      text: t('guangzhouBeijingRoad'),
      angle: 200,
      radiusFactor: { mobile: 1.4, tablet: 1.5, desktop: 1.3 },
      w: '14vw',
      h: '16vw',
    },
    {
      src: '/images/SunYatSenHall.jpg',
      text: t('SunYatSenHall'),
      angle: 160,
      radiusFactor: { mobile: 1.5, tablet: 1.4, desktop: 1.0 },
      w: '18vw',
      h: '12vw',
    },
  ]

  // 图片列表（中心 + 小图）
  const allImages = [
    { src: '/images/guangzhou.jpg', text: t('guangzhou') },
    ...subImages,
  ]

  // 切换函数
  const handlePrev = () => {
    if (selectedIndex === null) return
    const prevIndex = (selectedIndex - 1 + allImages.length) % allImages.length
    setSelectedIndex(prevIndex)
    setSelectedImage(allImages[prevIndex].src)
  }

  const handleNext = () => {
    if (selectedIndex === null) return
    const nextIndex = (selectedIndex + 1) % allImages.length
    setSelectedIndex(nextIndex)
    setSelectedImage(allImages[nextIndex].src)
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-visible text-center bg-gradient-to-br from-green-100 via-yellow-100 to-red-100">
      {/* 标题 */}
      <h1 className="absolute top-6 text-3xl font-bold z-50">{t('guangzhou')}</h1>

      {/* 描述文字 */}
      <p className="absolute top-20 max-w-2xl text-base text-gray-700 z-40">
        {t('guangzhouDescription')}
      </p>

      {/* 中心图 */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   rounded-full overflow-hidden shadow-xl z-10
                   w-[clamp(140px,20vw,300px)] h-[clamp(140px,20vw,300px)] cursor-pointer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
        onClick={() => {
          setSelectedIndex(0)
          setSelectedImage(allImages[0].src)
        }}
      >
        <Image
          src="/images/guangzhou.jpg"
          alt="Guangzhou"
          fill
          className="object-cover rounded-full"
        />
      </motion.div>

      {/* 小图布局 */}
      {!isMobile ? (
        subImages.map((item, idx) => {
          const baseRadius = isMobile
            ? 0
            : isTablet
            ? 'clamp(140px, 22vw, 280px)'
            : 'clamp(180px, 28vw, 420px)'
          const factor = isMobile
            ? item.radiusFactor.mobile
            : isTablet
            ? item.radiusFactor.tablet
            : item.radiusFactor.desktop

          const radius = `calc(${baseRadius} * ${factor})`
          const x = `calc(50% + ${radius} * ${Math.cos(
            (item.angle * Math.PI) / 180
          )})`
          const y = `calc(50% + ${radius} * ${Math.sin(
            (item.angle * Math.PI) / 180
          )})`

          return (
            <motion.div
              key={idx}
              className="absolute z-20"
              style={{
                left: x,
                top: y,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
            >
              <motion.div
                className="relative overflow-hidden shadow-lg bg-white z-20 rounded-xl cursor-pointer"
                style={{
                  width: `clamp(120px, ${item.w}, 280px)`,
                  height: `clamp(120px, ${item.h}, 280px)`,
                }}
                onClick={() => {
                  const imgIndex = idx + 1 // 因为中心图是 index 0
                  setSelectedIndex(imgIndex)
                  setSelectedImage(allImages[imgIndex].src)
                }}
              >
                <Image
                  src={item.src}
                  alt={item.text}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 w-full bg-black/50 text-white text-center text-sm py-1">
                  {item.text}
                </div>
              </motion.div>
            </motion.div>
          )
        })
      ) : (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] grid grid-cols-2 gap-4 z-20">
          {subImages.map((item, idx) => (
            <motion.div
              key={idx}
              className="relative overflow-hidden shadow-lg bg-white rounded-xl cursor-pointer"
              style={{
                width: '100%',
                height: idx % 2 === 0 ? '28vw' : '22vw',
              }}
              onClick={() => {
                const imgIndex = idx + 1
                setSelectedIndex(imgIndex)
                setSelectedImage(allImages[imgIndex].src)
              }}
            >
              <Image
                src={item.src}
                alt={item.text}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 w-full bg-black/50 text-white text-center text-xs py-1">
                {item.text}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 放大预览 Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative w-[90vw] h-[90vh] max-w-5xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Preview"
                fill
                className="object-contain rounded-lg"
              />

              {/* ✅ 图片文字说明 */}
                {selectedIndex !== null && selectedIndex > 0 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg bg-black/60 px-4 py-2 rounded-md">
                    {subImages[selectedIndex - 1].text}
                  </div>
                )}

              {/* 关闭按钮 */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/80 text-black rounded-full px-3 py-1 shadow-lg"
              >
                ✕
              </button>

              {/* 左右切换按钮 */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 text-black rounded-full px-3 py-2 shadow-lg hover:bg-white transition"
              >
                ‹
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 text-black rounded-full px-3 py-2 shadow-lg hover:bg-white transition"
              >
                ›
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
