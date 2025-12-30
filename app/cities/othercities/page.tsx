'use client'

import useTranslation from '../../../lib/useTranslation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, Suspense, useEffect, useMemo } from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


interface City {
  id: string
  key: string
  image: string
  photos: string[]
}

/* ----------- 城市列表 ----------- */
const cities: City[] = [
  {
    id: 'hamburg',
    key: 'hamburg',
    image: '/images/cities/hamburg_badge.jpg',
    photos: ['/images/cities/hamburg1.jpg', '/images/cities/hamburg2.jpg','/images/cities/hamburg3.jpg','/images/cities/hamburg4.jpg'],
  },
  {
    id: 'duesseldorf',
    key: 'duesseldorf',
    image: '/images/cities/duesseldorf_badge.png',
    photos: ['/images/cities/duesseldorf1.jpg','/images/cities/duesseldorf2.jpg'],
  },
  {
    id: 'koeln',
    key: 'koeln',
    image: '/images/cities/koeln_badge.jpg',
    photos: ['/images/cities/koeln1.jpg','/images/cities/koeln2.jpg','/images/cities/koeln3.jpg','/images/cities/koeln4.jpg'],
  },
  {
    id: 'bonn',
    key: 'bonn',
    image: '/images/cities/bonn_badge.jpg',
    photos: ['/images/cities/bonn1.jpg','/images/cities/bonn2.jpg'],
  },
  {
    id: 'trier',
    key: 'trier',
    image: '/images/cities/trier_badge.png',
    photos: ['/images/cities/trier1.jpg','/images/cities/trier2.jpg','/images/cities/trier3.jpg'],
  },
  {
    id: 'koenigswinter',
    key: 'koenigswinter',
    image: '/images/cities/koenigswinter_badge.jpg',
    photos: ['/images/cities/koenigswinter1.jpg','/images/cities/koenigswinter2.jpg'],
  },
  {
    id: 'stuttgart',
    key: 'stuttgart',
    image: '/images/cities/stuttgart_badge.jpg',
    photos: ['/images/cities/stuttgart1.jpg','/images/cities/stuttgart2.jpg','/images/cities/stuttgart3.jpg','/images/cities/stuttgart4.jpg',
        '/images/cities/stuttgart5.jpg',
        '/images/cities/stuttgart6.jpg'],
  },
  {
    id: 'ludwigsburg',
    key: 'ludwigsburg',
    image: '/images/cities/ludwigsburg_badge.png',
    photos: ['/images/cities/ludwigsburg1.jpg','/images/cities/ludwigsburg2.jpg'],
  },
  {
    id: 'berlin',
    key: 'berlin',
    image: '/images/cities/berlin_badge.png',
    photos: ['/images/cities/berlin1.jpg','/images/cities/berlin2.jpg','/images/cities/berlin3.jpg','/images/cities/berlin5.jpg'],
  },
  {
    id: 'hannover',
    key: 'hannover',
    image: '/images/cities/hannover_badge.png',
    photos: ['/images/cities/hannover1.jpg','/images/cities/hannover2.jpg'],
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
    photos: ['/images/cities/dresden_zwinger.jpg','/images/cities/dresden2.jpg','/images/cities/dresden3.jpg','/images/cities/dresden4.jpg'],
  },
  {
    id: 'nuernberg',
    key: 'nuernberg',
    image: '/images/cities/nuernberg_badge.png',
    photos: ['/images/cities/nuernberg1.jpg','/images/cities/nuernberg2.jpg','/images/cities/nuernberg3.jpg','/images/cities/nuernberg4.jpg'],
  },
  {
    id: 'erlangen',
    key: 'erlangen',
    image: '/images/cities/erlangen_badge.jpg',
    photos: ['/images/cities/erlangen1.jpg','/images/cities/erlangen2.jpg'],
  },
  {
    id: 'muenchen',
    key: 'muenchen',
    image: '/images/cities/muenchen_badge.jpg',
    photos: ['/images/cities/muenchen1.jpg','/images/cities/muenchen2.jpg','/images/cities/muenchen3.jpg','/images/cities/muenchen4.jpg'],
  },
  {
    id: 'bamberg',
    key: 'bamberg',
    image: '/images/cities/bamberg_badge.jpg',
    photos: ['/images/cities/bamberg1.jpg','/images/cities/bamberg2.jpg'],
  },
  {
    id: 'rothenburg',
    key: 'rothenburg',
    image: '/images/cities/rothenburg_badge.jpg',
    photos: ['/images/cities/rothenburg1.jpg','/images/cities/rothenburg2.jpg','/images/cities/rothenburg3.jpg','/images/cities/rothenburg4.jpg',
        '/images/cities/rothenburg5.jpg',
        '/images/cities/rothenburg6.jpg',
        '/images/cities/rothenburg7.jpg',
        '/images/cities/rothenburg8.jpg'],
  },
  {
    id: 'konstanz',
    key: 'konstanz',
    image: '/images/cities/konstanz_badge.jpg',
    photos: ['/images/cities/konstanz1.jpg','/images/cities/konstanz2.jpg'],
  },
  {
    id: 'freiburg',
    key: 'freiburg',
    image: '/images/cities/freiburg_badge.jpg',
    photos: ['/images/cities/freiburg1.jpg','/images/cities/freiburg2.jpg',
        '/images/cities/freiburg3.jpg',
        '/images/cities/freiburg4.jpg',
        '/images/cities/freiburg5.jpg',
        '/images/cities/freiburg6.jpg'],
  },
  {
    id: 'baden-baden',
    key: 'baden-baden',
    image: '/images/cities/baden-baden_badge.png',
    photos: ['/images/cities/baden-baden1.jpg','/images/cities/baden-baden2.jpg',
        '/images/cities/baden-baden3.jpg',
        '/images/cities/baden-baden4.jpg'],
  },
  {
    id: 'heilbronn',
    key: 'heilbronn',
    image: '/images/cities/heilbronn_badge.jpg',
    photos: ['/images/cities/heilbronn1.jpg','/images/cities/heilbronn2.jpg',
        '/images/cities/heilbronn3.jpg',
        '/images/cities/heilbronn4.jpg'],
  },
  {
    id: 'heidelberg',
    key: 'heidelberg',
    image: '/images/cities/heidelberg_badge.jpeg',
    photos: ['/images/cities/heidelberg1.jpg','/images/cities/heidelberg2.jpg'],
  },
  {
    id: 'mannheim',
    key: 'mannheim',
    image: '/images/cities/mannheim_badge.jpg',
    photos: ['/images/cities/mannheim1.jpg','/images/cities/mannheim2.jpg'],
  },
  {
    id: 'frankfurt',
    key: 'frankfurt',
    image: '/images/cities/frankfurt_badge.jpg',
    photos: ['/images/cities/frankfurt1.jpg','/images/cities/frankfurt2.jpg'],
  },
  {
    id: 'lindau',
    key: 'lindau',
    image: '/images/cities/lindau_badge.jpeg',
    photos: ['/images/cities/lindau_1.jpg','/images/cities/lindau_2.jpg'],
  },
  {
    id: 'hohenzollern',
    key: 'hohenzollern',
    image: '/images/cities/hohenzollern_badge.jpg',
    photos: ['/images/cities/hohenzollern1.jpg','/images/cities/hohenzollern2.jpg'],
  },
  {
    id: 'badwimpfen',
    key: 'badwimpfen',
    image: '/images/cities/badwimpfen_badge.png',
    photos: ['/images/cities/badwimpfen1.jpg','/images/cities/badwimpfen2.jpg'],
  },
  {
    id: 'reutlingen',
    key: 'reutlingen',
    image: '/images/cities/reutlingen_badge.png',
    photos: ['/images/cities/reutlingen1.jpg','/images/cities/reutlingen2.jpg'],
  },
  {
    id: 'esslingen',
    key: 'esslingen',
    image: '/images/cities/esslingen_badge.png',
    photos: ['/images/cities/esslingen1.jpg','/images/cities/esslingen2.jpg','/images/cities/esslingen3.jpg','/images/cities/esslingen4.jpg'],
  },
  {
    id: 'schwaebischGemuend',
    key: 'schwaebischGemuend',
    image: '/images/cities/schwaebischGemuend_badge.png',
    photos: ['/images/cities/schwaebischGemuend1.jpg','/images/cities/schwaebischGemuend2.jpg','/images/cities/schwaebischGemuend3.jpg','/images/cities/schwaebischGemuend4.jpg'],
  },
  {
    id: 'wuerzburg',
    key: 'wuerzburg',
    image: '/images/cities/wuerzburg_badge.jpg',
    photos: ['/images/cities/wuerzburg1.jpg','/images/cities/wuerzburg2.jpg','/images/cities/wuerzburg3.jpg','/images/cities/wuerzburg4.jpg'],
  }
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
  const [search, setSearch] = useState('')
  const filteredCities = useMemo(() => {
    return cities.filter((city) => t(city.key).toLowerCase().includes(search.toLowerCase()))
  }, [search, t])
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const allPhotos = cities.flatMap(c => c.photos)
  const [zoomIndex, setZoomIndex] = useState(-1)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (zoomIndex < 0) return
      if (e.key === 'Escape') setZoomIndex(-1)
      if (e.key === 'ArrowRight') nextPhoto()
      if (e.key === 'ArrowLeft') prevPhoto()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [zoomIndex])

  function openZoom(img: string) { setZoomIndex(allPhotos.indexOf(img)) }
  function nextPhoto() { setZoomIndex(i => (i + 1) % allPhotos.length) }
  function prevPhoto() { setZoomIndex(i => (i - 1 + allPhotos.length) % allPhotos.length) }

  const currentCityName = useMemo(() => {
    if (zoomIndex < 0) return ''
    const img = allPhotos[zoomIndex]
    const city = cities.find(c => c.photos.includes(img))
    return city ? t(city.key) : ''
  }, [zoomIndex, t])

  return (
    <div className="p-6">
      {/* 搜索框 */}
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder={t('searchCity')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border shadow-sm focus:outline-none"
        />
      </div>

      <h1 className="text-3xl font-bold mb-4 text-center">{t('othercities')}</h1>
      <p className="mb-12 text-center text-gray-700">{t('othercitiesDescription')}</p>

      {/* 城市徽章 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
        {filteredCities.map((city, index) => (
          <motion.div
            key={city.id}
            className="relative w-56 h-56 rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
            onClick={() => setSelectedCity(city)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <img src={city.image} className="object-contain w-full h-full bg-gray-100" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <h2 className="text-white text-xl font-semibold">{t(city.key)}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 城市弹窗 */}
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
              className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full relative max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
                onClick={() => setSelectedCity(null)}
              >
                ✕
              </button>
              <button
                onClick={() => { const i = cities.findIndex(c => c.id === selectedCity.id); setSelectedCity(cities[(i - 1 + cities.length) % cities.length]) }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full px-3 py-2 shadow-lg"
              >‹</button>
              <button
                onClick={() => { const i = cities.findIndex(c => c.id === selectedCity.id); setSelectedCity(cities[(i + 1) % cities.length]) }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full px-3 py-2 shadow-lg"
              >›</button>

              <h2 className="text-2xl font-bold mb-3 text-center">{t(selectedCity.key)}</h2>
              <p className="text-gray-700 mb-4 text-center">{t(`${selectedCity.key}Desc`)}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCity.photos.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    className="rounded-lg object-contain w-full h-auto max-h-64 bg-gray-50 cursor-zoom-in hover:opacity-80"
                    onClick={() => openZoom(img)}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 全屏大图 */}
      <AnimatePresence>
        {zoomIndex >= 0 && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-[999] flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomIndex(-1)}
          >
            <div className="absolute top-4 text-white text-lg font-semibold">{zoomIndex + 1} / {allPhotos.length}</div>
            <div className="absolute bottom-4 text-white text-lg font-semibold">{currentCityName}</div>

            <TransformWrapper
              initialScale={1}
              minScale={1}
              maxScale={4}
              doubleClick={{ disabled: true }}
              pinch={{ disabled: false }}
            >
              <TransformComponent>
                <img
                  src={allPhotos[zoomIndex]}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              </TransformComponent>
            </TransformWrapper>

            <button
              onClick={(e) => { e.stopPropagation(); prevPhoto() }}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/70 rounded-full px-4 py-2 shadow-lg text-2xl"
            >‹</button>
            <button
              onClick={(e) => { e.stopPropagation(); nextPhoto() }}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/70 rounded-full px-4 py-2 shadow-lg text-2xl"
            >›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
