'use client'

import useTranslation from '../../../lib/useTranslation'
import { motion } from 'framer-motion'

export default function CompanyStabilusContent() {
  const { t } = useTranslation()

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-10 text-center">
      {/* 标题 */}
      <motion.h1
        className="text-4xl font-bold mb-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {t('company_Stabilus').replace(/<br\s*\/?>/g, '')}
      </motion.h1>

      {/* 公司 Logo */}
      <motion.img
        src="/images/Stabilus-logo.png"
        alt="Stabilus Logo"
        className="w-28 h-auto mb-6 cursor-pointer shadow-md hover:shadow-lg"
        whileHover={{ scale: 1.1 }}
        animate={{
          y: [0, -5, 0],
          transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
        onClick={() => window.open('https://www.Stabilus.com', '_blank')}
      />

      {/* 介绍文字 */}
      <motion.p
        className="text-gray-700 max-w-2xl whitespace-pre-line"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {t('company_Stabilus_work_detailed')}
      </motion.p>

      {/* 图片区域 */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full">
        {['/images/stabilus_1.jpg', '/images/stabilus_2.jpg', '/images/stabilus_3.png'].map(
          (src, index) => (
            <motion.img
              key={index}
              src={src}
              alt={`Stabilus ${index + 1}`}
              className="rounded-2xl shadow-lg w-full h-48 sm:h-64 object-cover"
              whileHover={{ scale: 1.05 }}
              animate={breathingAnimation}
            />
          )
        )}
      </div>
    </div>
  )
}
