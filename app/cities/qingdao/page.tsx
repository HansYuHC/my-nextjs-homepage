'use client'

import useTranslation from '../../../lib/useTranslation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Suspense } from 'react'
import { useEffect, useState } from 'react'

export default function QingdaoPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QingdaoContent />
    </Suspense>
  )
}

function QingdaoContent() {
  const { t } = useTranslation()
  const [screenWidth, setScreenWidth] = useState(1200)

  // 监听窗口大小
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = screenWidth < 768
  const isTablet = screenWidth >= 768 && screenWidth < 1024

  // 基础半径（全局）
  const baseRadius = isMobile
    ? 0
    : isTablet
    ? 'clamp(140px, 22vw, 280px)' // 平板：稍小
    : 'clamp(180px, 28vw, 420px)' // 桌面：更大

  // 小图配置：角度 + 响应式半径倍率 + 自定义宽高
  const subImages = [
    {
      src: '/images/qdez.jpg',
      text: t('qingdaoMiddleSchool'),
      angle: -30,
      radiusFactor: { mobile: 1.2, tablet: 1.0, desktop: 1.0 },
      w: '14vw',
      h: '12vw',
    },
    {
      src: '/images/qdchaoyin.jpg',
      text: t('qingdaoChaoYin'),
      angle: 30,
      radiusFactor: { mobile: 1.1, tablet: 0.9, desktop: 0.9 },
      w: '18vw',
      h: '10vw',
    },
    {
      src: '/images/qdTaiDong.jpg',
      text: t('qdTaiDong'),
      angle: 210,
      radiusFactor: { mobile: 1.4, tablet: 1.5, desktop: 1.3 },
      w: '12vw',
      h: '14vw',
    },
    {
      src: '/images/qdShiNan.jpg',
      text: t('qdShiNan'),
      angle: 150,
      radiusFactor: { mobile: 1.5, tablet: 1.2, desktop: 1.0 },
      w: '16vw',
      h: '12vw',
    },
  ]

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-visible text-center px-4">
      {/* 标题 */}
      <h1 className="absolute top-6 text-3xl font-bold z-50">{t('qingdao')}</h1>

      {/* 描述文字 */}
      <p className="absolute top-20 max-w-2xl text-base text-gray-700 z-40">
        {t('qingdaoDescription')}
      </p>

      {/* 中心图：始终居中 */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   rounded-full overflow-hidden shadow-xl z-10
                   w-[clamp(140px,20vw,300px)] h-[clamp(140px,20vw,300px)]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              '0 0 20px rgba(0,0,0,0.4)',
              '0 0 40px rgba(0,0,0,0.6)',
              '0 0 20px rgba(0,0,0,0.4)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <Image
          src="/images/qingdao.jpg"
          alt="Qingdao"
          fill
          className="object-cover rounded-full"
        />
      </motion.div>

      {/* 小图布局 */}
      {!isMobile ? (
        // 平板/桌面：环绕布局
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
                className="relative overflow-hidden shadow-lg bg-white z-20 rounded-xl"
                style={{
                  width: `clamp(120px, ${item.w}, 280px)`,
                  height: `clamp(120px, ${item.h}, 280px)`,
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 10px rgba(0,0,0,0.2)',
                    '0 0 25px rgba(0,0,0,0.4)',
                    '0 0 10px rgba(0,0,0,0.2)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 0.3,
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
        // 移动端：网格布局
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] grid grid-cols-2 gap-4 z-20">
          {subImages.map((item, idx) => (
            <motion.div
              key={idx}
              className="relative overflow-hidden shadow-lg bg-white rounded-xl"
              style={{
                width: '100%',
                height: idx % 2 === 0 ? '28vw' : '22vw',
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
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
    </div>
  )
}
