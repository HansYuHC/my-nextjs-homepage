'use client'

import useTranslation from '../../../lib/useTranslation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, Suspense } from 'react'

interface City {
  id: string
  key: string
  image: string
  photos: string[]
}

const cities: City[] = [
  {
    id: 'hamburg',
    key: 'hamburg',
    image: '/images/cities/hamburg_badge.jpg',
    photos: ['/images/cities/hamburg1.jpg', '/images/cities/hamburg2.jpg'],
  },
  {
    id: 'duesseldorf',
    key: 'duesseldorf',
    image: '/images/cities/duesseldorf_badge.png',
    photos: ['/images/cities/duesseldorf1.jpg'],
  },
  {
    id: 'stuttgart',
    key: 'stuttgart',
    image: '/images/cities/stuttgart_badge.jpg',
    photos: ['/images/cities/stuttgart1.jpg', '/images/cities/stuttgart2.jpg'],
  },
  {
    id: 'berlin',
    key: 'berlin',
    image: '/images/cities/berlin_badge.png',
    photos: ['/images/cities/berlin1.jpg'],
  },
  {
    id: 'hannover',
    key: 'hannover',
    image: '/images/cities/hannover_badge.png',
    photos: ['/images/cities/hannover.jpg'],
  },
  {
    id: 'koblenz',
    key: 'koblenz',
    image: '/images/cities/koblenz_badge.png',
    photos: ['/images/cities/koblenz1.jpg','/images/cities/koblenz2.jpg'],
  },
  {
    id: 'dresden',
    key: 'dresden',
    image: '/images/cities/dresden_badge.png',
    photos: ['/images/cities/dresden.jpg'],
  },
  {
    id: 'nuernberg',
    key: 'nuernberg',
    image: '/images/cities/nuernberg_badge.png',
    photos: ['/images/cities/nuernberg.jpg'],
  },
  {
    id: 'muenchen',
    key: 'muenchen',
    image: '/images/cities/muenchen_badge.jpg',
    photos: ['/images/cities/muenchen.jpg'],
  },
  {
    id: 'herzogenaurach',
    key: 'herzogenaurach',
    image: '/images/cities/herzogenaurach_badge.png',
    photos: ['/images/cities/herzogenaurach.jpg'],
  },
  {
    id: 'bamberg',
    key: 'bamberg',
    image: '/images/cities/bamberg_badge.jpg',
    photos: ['/images/cities/bamberg.jpg'],
  },
  {
    id: 'rottenberg',
    key: 'rottenberg',
    image: '/images/cities/rottenberg_badge.png',
    photos: ['/images/cities/rottenberg.jpg'],
  },
  {
    id: 'konstanz',
    key: 'konstanz',
    image: '/images/cities/konstanz_badge.jpg',
    photos: ['/images/cities/konstanz.jpg'],
  },
  {
    id: 'freiburg',
    key: 'freiburg',
    image: '/images/cities/freiburg_badge.jpg',
    photos: ['/images/cities/freiburg.jpg'],
  },
  {
    id: 'baden-baden',
    key: 'baden-baden',
    image: '/images/cities/baden-baden_badge.png',
    photos: ['/images/cities/baden-baden.jpg'],
  },
  {
    id: 'heidelberg',
    key: 'heidelberg',
    image: '/images/cities/heidelberg_badge.png',
    photos: ['/images/cities/heidelberg.jpg'],
  },
  {
    id: 'mannheim',
    key: 'mannheim',
    image: '/images/cities/mannheim_badge.png',
    photos: ['/images/cities/mannheim.jpg'],
  },
  {
    id: 'frankfurt',
    key: 'frankfurt',
    image: '/images/cities/frankfurt_badge.png',
    photos: ['/images/cities/frankfurt.jpg'],
  },
]

export default function OtherCitiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherCitiesContent />
    </Suspense>
  )
}

function OtherCitiesContent() {
  const { t } = useTranslation()
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  return (
    <div className="p-6">
      {/* 标题与简介 */}
      <h1 className="text-3xl font-bold mb-4 text-center">{t('othercities')}</h1>
      {/*<p className="absolute top-20 max-w-2xl text-base text-gray-700 z-40">*/}
      <p className="mb-12 text-center text-gray-700 z-40">{t('othercitiesDescription')}</p>

      {/* 城市徽章展示区 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {cities.map((city, index) => (
          <motion.div
            key={city.id}
            className="relative w-56 h-56 rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
            onClick={() => setSelectedCity(city)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={city.image}
              alt={t(city.key)}
              className="object-contain w-full h-full bg-gray-100 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h2 className="text-white text-xl font-semibold drop-shadow-lg">{t(city.key)}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 弹窗详情 */}
      <AnimatePresence>
        {selectedCity && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCity(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
                onClick={() => setSelectedCity(null)}
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-3 text-center">{t(selectedCity.key)}</h2>
              <p className="text-gray-700 mb-4 text-center">{t(`${selectedCity.key}Desc`)}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCity.photos.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="rounded-lg object-cover w-full h-48"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
