'use client'

import useTranslation from '../../../lib/useTranslation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Suspense, useEffect, useState } from 'react'

export default function KarlsruhePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KarlsruheContent />
    </Suspense>
  )
}

function KarlsruheContent() {
  const { t } = useTranslation()
  const [screenWidth, setScreenWidth] = useState(1200)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = screenWidth < 768
  const isTablet = screenWidth >= 768 && screenWidth < 1024

  const baseRadius = isMobile
    ? 0
    : isTablet
    ? 'clamp(140px, 22vw, 280px)'
    : 'clamp(180px, 28vw, 420px)'

  const subImages = [
    {
      src: '/images/karlsruheVonOben.jpg',
      text: t('karlsruheVonOben'),
      angle: -40,
      radiusFactor: { mobile: 1.2, tablet: 1.0, desktop: 1.0 },
      w: '16vw',
      h: '22vw',
    },
    {
      src: '/images/karlsruhe-market-square.jpg',
      text: t('karlsruheMarketSquare'),
      angle: 30,
      radiusFactor: { mobile: 1.1, tablet: 0.9, desktop: 0.9 },
      w: '20vw',
      h: '12vw',
    },
    {
      src: '/images/karlsruhe-zkm.jpg',
      text: t('karlsruheZKM'),
      angle: 200,
      radiusFactor: { mobile: 1.4, tablet: 1.5, desktop: 1.3 },
      w: '14vw',
      h: '16vw',
    },
    {
      src: '/images/kit.jpg',
      text: t('kit'),
      angle: 160,
      radiusFactor: { mobile: 1.5, tablet: 1.4, desktop: 1.0 },
      w: '18vw',
      h: '12vw',
    }
  ]

  // 所有图片（中心 + 周围）
  const allImages = ['/images/karlsruhe.jpg', ...subImages.map((i) => i.src)]

  const handlePrev = () => {
    if (selectedIndex === null) return
    setSelectedIndex((prev) => (prev! - 1 + allImages.length) % allImages.length)
  }

  const handleNext = () => {
    if (selectedIndex === null) return
    setSelectedIndex((prev) => (prev! + 1) % allImages.length)
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-visible text-center bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 animate-gradient-flow">
      {/* 标题 */}
      <h1 className="absolute top-6 text-3xl font-bold z-50">{t('karlsruhe')}</h1>

      {/* 描述 */}
      <p className="absolute top-20 max-w-2xl text-base text-gray-700 z-40">
        {t('karlsruheDescription')}
      </p>

      {/* 中心图 */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   rounded-full overflow-hidden shadow-xl z-10
                   w-[clamp(140px,20vw,300px)] h-[clamp(140px,20vw,300px)] cursor-pointer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
        onClick={() => setSelectedIndex(0)}
      >
        <Image
          src="/images/karlsruhe.jpg"
          alt="Karlsruhe Center"
          fill
          className="object-cover rounded-full"
        />
      </motion.div>

      {/* 小图布局 */}
      {!isMobile ? (
        subImages.map((item, idx) => {
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
                onClick={() => setSelectedIndex(idx + 1)}
              >
                <Image src={item.src} alt={item.text} fill className="object-cover" />
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
              onClick={() => setSelectedIndex(idx + 1)}
            >
              <Image src={item.src} alt={item.text} fill className="object-cover" />
              <div className="absolute bottom-0 w-full bg-black/50 text-white text-center text-xs py-1">
                {item.text}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 放大预览 Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
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
                src={allImages[selectedIndex]}
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
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 bg-white/80 text-black rounded-full px-3 py-1 shadow-lg z-50"
              >
                ✕
              </button>

              {/* 左右切换按钮 */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 text-black rounded-full px-3 py-2 shadow-lg z-50"
              >
                ‹
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 text-black rounded-full px-3 py-2 shadow-lg z-50"
              >
                ›
              </button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 动态渐变动画 */}
      <style jsx global>{`
        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-flow {
          background-size: 200% 200%;
          animation: gradientFlow 15s ease infinite;
        }
      `}</style>
    </div>
  )
}
