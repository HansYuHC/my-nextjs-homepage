'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import useTranslation from '../lib/useTranslation'
import { Suspense } from 'react'

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}

function HomeContent() {
  const { t, lang } = useTranslation()
  const [hovered, setHovered] = useState<string | null>(null)

  const bubbles = [
    { id: 'about', label: t('about'), href: `/about?lang=${lang}`, size: 'w-32 h-32' },
    { id: 'projects', label: t('projects'), href: `/projects?lang=${lang}`, size: 'w-40 h-40' },
    { id: 'work', label: t('work'), href: `/work?lang=${lang}`, size: 'w-28 h-28' },
    { id: 'contact', label: t('contact'), href: `/contact?lang=${lang}`, size: 'w-36 h-36' },
  ]

  return (
<div className="flex flex-col items-center justify-center min-h-screen relative
                bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200
                animate-gradient">
      <h1 className="text-4xl font-bold absolute top-20">⛵🍺🗼 {t('welcome')}👨‍🔧🚗</h1>
      <div className="flex flex-wrap gap-8 justify-center">
        {bubbles.map((bubble, index) => {
          const xOffset = 40 + index * 15
          const rotateRange = Math.random() > 0.5 ? [0, 2, -2, 0] : [0, -2, 2, 0]

          return (
            <Link key={bubble.id} href={bubble.href}>
              <motion.div
                className={`
                  ${bubble.size}
                  rounded-full flex items-center justify-center
                  bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold cursor-pointer
                  transition-all duration-300
                  ${hovered && hovered !== bubble.id ? 'blur-sm scale-90' : ''}
                `}
                onMouseEnter={() => setHovered(bubble.id)}
                onMouseLeave={() => setHovered(null)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -50, 80, -60, 0], // 上下
                  x: [0, xOffset, -xOffset, 0], // 左右
                  rotate: rotateRange, // 随机轻微旋转
                  scale: [1, 1.05, 1], // ✨ 呼吸感
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.7,
                  scale: {
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                  },
                }}
              >
                {bubble.label}
              </motion.div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}