'use client'

import useTranslation from '../../lib/useTranslation'
import Link from 'next/link'
import Masonry from 'react-masonry-css'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Suspense } from 'react'

const initialItems = [
  { id: 'qingdao', labelKey: 'qingdao', className: 'h-32 bg-blue-300', href: '/cities/qingdao' },
  { id: 'guangzhou', labelKey: 'guangzhou', className: 'h-40 bg-green-300', href: '/cities/guangzhou' },
  { id: 'karlsruhe', labelKey: 'karlsruhe', className: 'h-24 bg-yellow-300', href: '/cities/karlsruhe' },
  { id: 'qdz', labelKey: 'qdez', className: 'h-48 bg-pink-300', href: '/schools/qdez' },
  { id: 'scut', labelKey: 'scut', className: 'h-28 bg-purple-300', href: '/schools/scut' },
  { id: 'kit', labelKey: 'kit', className: 'h-36 bg-red-300', href: '/schools/kit' },
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

  // 更新 href 以支持语言参数
  const blocksWithLang = blocks.map((block) => ({
    ...block,
    href: `${block.href}?lang=${lang}`,
    label: t(block.labelKey),
  }))

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('about')}</h1>
      <p className="mb-8">{t('aboutDescription')}</p>

      <Masonry
        breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
        className="flex w-auto gap-4"
        columnClassName="bg-clip-padding"
      >
        {blocksWithLang.map((block, index) => {
          const isDragging = draggingId === block.id
          const isPlaceholder = placeholderIndex === index && draggingId !== block.id

          if (isPlaceholder) {
            return (
              <div
                key={`placeholder-${block.id}`}
                className={`${block.className} m-2 rounded-lg border-2 border-dashed border-gray-400 bg-gray-200 opacity-50`}
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
              className={`${block.className} m-2 rounded-lg flex items-center justify-center text-lg font-bold cursor-grab ${
                isDragging
                  ? 'z-50 scale-105 shadow-2xl'
                  : 'hover:scale-105 hover:shadow-xl transition'
              }`}
              style={{ userSelect: 'none' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={block.href}>{block.label}</Link>
            </motion.div>
          )
        })}
      </Masonry>
    </div>
  )
}