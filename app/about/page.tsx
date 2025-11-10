'use client'

import useTranslation from '../../lib/useTranslation'
import Link from 'next/link'
import Masonry from 'react-masonry-css'
import { motion } from 'framer-motion'
import { useState, Suspense } from 'react'

// 初始数据：每个块都有 id, key(翻译), height, image, href
const initialItems = [
  { id: 'qingdao', key: 'qingdao', height: 'h-[300px]', image: '/images/qingdao.jpg', href: '/cities/qingdao' },
  { id: 'guangzhou', key: 'guangzhou', height: 'h-[260px]', image: '/images/guangzhou.jpg', href: '/cities/guangzhou' },
  { id: 'karlsruhe', key: 'karlsruhe', height: 'h-[220px]', image: '/images/karlsruhe.jpg', href: '/cities/karlsruhe' },
  { id: 'boeblingen', key: 'boeblingen', height: 'h-[320px]', image: '/images/boeblingen.jpg', href: '/cities/boeblingen' },
  // ✅ 新增两个模块
  { id: 'othercities', key: 'otherCitiesTitle', height: 'h-[260px]', image: '/images/othercities.jpg', href: '/cities/othercities' },
  { id: 'touristcities', key: 'touristCitiesTitle', height: 'h-[260px]', image: '/images/touristcities.jpg', href: '/cities/touristcities' },
]

export default function AboutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutContent />
    </Suspense>
  )
}

function AboutContent() {
  const { t, lang } = useTranslation()
  const [blocks, setBlocks] = useState(initialItems)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null)

  const handleDragStart = (id: string, index: number) => {
    setDraggingId(id)
    setPlaceholderIndex(index)
  }

  const handleDragEnd = (id: string, index: number) => {
    if (placeholderIndex === null) return
    const newBlocks = [...blocks]
    const dragIndex = newBlocks.findIndex((b) => b.id === id)
    const [dragged] = newBlocks.splice(dragIndex, 1)
    newBlocks.splice(placeholderIndex, 0, dragged)
    setBlocks(newBlocks)
    setDraggingId(null)
    setPlaceholderIndex(null)
  }

  return (
    <div className="p-6">
      <div className="w-full text-center mt-8 mb-16 px-6">
          <h1 className="text-3xl font-bold mb-4">{t('about')}</h1>
          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
            {t('aboutDescription')}
          </p>
      </div>

      <Masonry
        breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
        className="flex w-auto gap-4"
        columnClassName="bg-clip-padding"
      >
        {blocks.map((block, index) => {
          const isDragging = draggingId === block.id
          const isPlaceholder = placeholderIndex === index && draggingId !== block.id

          if (isPlaceholder) {
            return (
              <div
                key={`placeholder-${block.id}`}
                className={`${block.height} m-2 rounded-lg border-2 border-dashed border-gray-400 bg-gray-200 opacity-50`}
              />
            )
          }

          return (
            <motion.div
              key={block.id}
              layout
              drag
              dragMomentum={false}
              dragElastic={0.05}
              onDragStart={() => handleDragStart(block.id, index)}
              onDragEnd={() => handleDragEnd(block.id, index)}
              className={`${block.height} m-2 rounded-lg flex items-center justify-center text-lg font-bold cursor-grab text-white`}
              style={{
                userSelect: 'none',
                backgroundImage: `url(${block.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileDrag={{ scale: 1.08, boxShadow: '0 16px 32px rgba(0,0,0,0.25)' }}
            >
              <Link href={`${block.href}?lang=${lang}`} className="bg-black/50 px-4 py-2 rounded-lg">
                {t(block.key)}
              </Link>
            </motion.div>
          )
        })}
      </Masonry>
    </div>
  )
}
