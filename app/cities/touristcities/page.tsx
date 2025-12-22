'use client'

import { Suspense, useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import useTranslation from '../../../lib/useTranslation'

/* ================== 工具 ================== */
const isVideo = (src: string) =>
  src.toLowerCase().endsWith('.mp4')

/* ================== 类型 ================== */
type Photo = { src: string }

type CityInfo = {
  nameKey: string
  descriptionKey: string
  photos: Photo[]
}

type Country = {
  id: string
  key: string
  hero: string
  flag: string
  cities: CityInfo[]
}

/* ================== 国家数据 ================== */
const countries: Country[] = [
  {
    id: 'spain',
    key: 'spain',
    hero: '/images/countries/spain_hero.png',
    flag: '/images/flags/spain.png',
    cities: [
      {
        nameKey: 'barcelona',
        descriptionKey: 'barcelonaExp',
        photos: [
          { src: '/images/countriesCity/barcelona1.jpg' },
          { src: '/images/countriesCity/barcelona2.jpg' },
          { src: '/images/countriesCity/barcelona3.jpg' },
          { src: '/images/countriesCity/barcelona4.jpg' },
          { src: '/images/countriesCity/barcelona5.jpg' },
          { src: '/images/countriesCity/barcelona6.jpg' },
        ],
      },
      {
        nameKey: 'tennerife',
        descriptionKey: 'tennerifeExp',
        photos: [{ src: '/images/countriesCity/tennerife1.jpg' },
            { src: '/images/countriesCity/tennerife2.jpg' },
            { src: '/images/countriesCity/tennerife3.jpg' },
            { src: '/images/countriesCity/tennerife4.jpg' },
            { src: '/images/countriesCity/tennerife5.jpg' },
            { src: '/images/countriesCity/tennerife6.jpg' },
            { src: '/images/countriesCity/tennerife7.jpg' },
            { src: '/images/countriesCity/tennerife8.jpg' }],
      },
      {
        nameKey: 'palma',
        descriptionKey: 'palmaExp',
        photos: [{ src: '/images/countriesCity/palma1.jpg' },
            { src: '/images/countriesCity/palma2.jpg' },
            { src: '/images/countriesCity/palma3.jpg' },
            { src: '/images/countriesCity/palma4.jpg' }],
      },
    ],
  },
  {
    id: 'france',
    key: 'france',
    hero: '/images/countries/france_hero.png',
    flag: '/images/flags/france.png',
    cities: [
      {
        nameKey: 'paris',
        descriptionKey: 'parisExp',
        photos: [
          { src: '/images/countriesCity/paris1.jpg' },
          { src: '/images/countriesCity/paris2.jpg' },
          { src: '/images/countriesCity/paris3.jpg' },
        ],
      },
      {
        nameKey: 'strasbourg',
        descriptionKey: 'strasbourgExp',
        photos: [{ src: '/images/countriesCity/strasbourg1.jpg' },
            { src: '/images/countriesCity/strasbourg2.jpg' },
            { src: '/images/countriesCity/strasbourg3.jpg' },
            { src: '/images/countriesCity/strasbourg4.mp4' }],
      },
      {
        nameKey: 'colmar',
        descriptionKey: 'colmarExp',
        photos: [
          { src: '/images/countriesCity/colmar1.jpg' },
          { src: '/images/countriesCity/colmar2.jpg' },
          { src: '/images/countriesCity/colmar3.jpg' },
          { src: '/images/countriesCity/colmar4.jpg' },
          { src: '/images/countriesCity/colmar5.jpg' },
          { src: '/images/countriesCity/colmar6.jpg' }
        ],
      },
      {
        nameKey: 'nice',
        descriptionKey: 'niceExp',
        photos: [{ src: '/images/countriesCity/nice1.jpg' },
            { src: '/images/countriesCity/nice2.jpg' }],
      },
      {
        nameKey: 'antibes',
        descriptionKey: 'antibesExp',
        photos: [{ src: '/images/countriesCity/antibes1.jpg' },
            { src: '/images/countriesCity/antibes2.jpg' },
            { src: '/images/countriesCity/antibes3.jpg' },
            { src: '/images/countriesCity/antibes4.jpg' }],
      },
      {
        nameKey: 'menton',
        descriptionKey: 'mentonExp',
        photos: [{ src: '/images/countriesCity/menton1.jpg' },
            { src: '/images/countriesCity/menton2.jpg' },
            { src: '/images/countriesCity/menton3.jpg' },
            { src: '/images/countriesCity/menton4.jpg' },
            { src: '/images/countriesCity/menton5.jpg' },
            { src: '/images/countriesCity/menton6.jpg' }],
      },
    ],
  },
  {
    id: 'monaco',
    key: 'monaco',
    hero: '/images/countries/monaco_hero.jpg',
    flag: '/images/flags/monaco.png',
    cities: [
      {
        nameKey: 'monacoCity',
        descriptionKey: 'monacoCityExp',
        photos: [{ src: '/images/countriesCity/monacoCity.jpg' }],
      },
    ],
  },
  {
    id: 'italy',
    key: 'italy',
    hero: '/images/countries/italy_hero.png',
    flag: '/images/flags/italy.png',
    cities: [
      {
        nameKey: 'como',
        descriptionKey: 'comoExp',
        photos: [{ src: '/images/countriesCity/como.jpg' }],
      },
      {
        nameKey: 'milan',
        descriptionKey: 'milanExp',
        photos: [
          { src: '/images/countriesCity/milan1.jpg' },
          { src: '/images/countriesCity/milan2.jpg' },
        ],
      },
    ],
  },
  {
    id: 'luxembourg',
    key: 'luxembourg',
    hero: '/images/countries/luxembourg_hero.jpg',
    flag: '/images/flags/luxembourg.png',
    cities: [
      {
        nameKey: 'luxembourgCity',
        descriptionKey: 'luxembourgExp',
        photos: [{ src: '/images/countriesCity/luxembourgCity.jpg' }],
      },
        {
        nameKey: 'schengen',
        descriptionKey: 'schengenExp',
        photos: [{ src: '/images/countriesCity/schengen.jpg' }],
      },
    ],
  },
  {
    id: 'czech',
    key: 'czech',
    hero: '/images/countries/czech_hero.png',
    flag: '/images/flags/czech.png',
    cities: [
      {
        nameKey: 'praha',
        descriptionKey: 'prahaExp',
        photos: [
          { src: '/images/countriesCity/praha1.jpg' },
          { src: '/images/countriesCity/praha2.jpg' },
          { src: '/images/countriesCity/praha3.jpg' },
        ],
      },
    ],
  },
  {
    id: 'hungary',
    key: 'hungary',
    hero: '/images/countries/hungary_hero.jpg',
    flag: '/images/flags/hungary.png',
    cities: [
      {
        nameKey: 'budapest',
        descriptionKey: 'budapestExp',
        photos: [
          { src: '/images/countriesCity/budapest1.jpg' },
          { src: '/images/countriesCity/budapest2.jpg' },
          { src: '/images/countriesCity/budapest3.jpg' },
        ],
      },
    ],
  },
  {
    id: 'slowakei',
    key: 'slowakei',
    hero: '/images/countries/slowakei_hero.jpg',
    flag: '/images/flags/slowakei.png',
    cities: [
      {
        nameKey: 'bratislava',
        descriptionKey: 'bratislavaExp',
        photos: [{ src: '/images/countriesCity/bratislava.jpg' }],
      },
    ],
  },
  {
    id: 'liechtenstein',
    key: 'liechtenstein',
    hero: '/images/countries/liechtenstein_hero.png',
    flag: '/images/flags/liechtenstein.png',
    cities: [
      {
        nameKey: 'vaduz',
        descriptionKey: 'vaduzExp',
        photos: [{ src: '/images/countriesCity/vaduz1.jpg' }],
      },
    ],
  },
  {
    id: 'switzerland',
    key: 'switzerland',
    hero: '/images/countries/switzerland_hero.jpg',
    flag: '/images/flags/switzerland.png',
    cities: [
      {
        nameKey: 'zuerich',
        descriptionKey: 'zuerichExp',
        photos: [
          { src: '/images/countriesCity/zuerich1.jpg' },
          { src: '/images/countriesCity/zuerich2.jpg' },
        ],
      },
      {
        nameKey: 'luzern',
        descriptionKey: 'luzernExp',
        photos: [
          { src: '/images/countriesCity/luzern_1.jpg' },
          { src: '/images/countriesCity/luzern_2.jpg' },
        ],
      },
      {
        nameKey: 'geneva',
        descriptionKey: 'genevaExp',
        photos: [{ src: '/images/countriesCity/geneva.jpg' }],
      },
    ],
  },
  {
    id: 'austria',
    key: 'austria',
    hero: '/images/countries/austria_hero.jpg',
    flag: '/images/flags/austria.png',
    cities: [
      {
        nameKey: 'wien',
        descriptionKey: 'wienExp',
        photos: [{ src: '/images/countriesCity/wien1.jpg' }],
      },
      {
        nameKey: 'salzburg',
        descriptionKey: 'salzburgExp',
        photos: [{ src: '/images/countriesCity/salzburg.jpg' }],
      },
      {
        nameKey: 'hallstatt',
        descriptionKey: 'hallstattExp',
        photos: [
          { src: '/images/countriesCity/hallstatt1.jpg' },
          { src: '/images/countriesCity/hallstatt2.jpg' },
          { src: '/images/countriesCity/hallstatt3.jpg' },
        ],
      },
      {
        nameKey: 'linz',
        descriptionKey: 'linzExp',
        photos: [
          { src: '/images/countriesCity/linz1.jpg' },
          { src: '/images/countriesCity/linz2.jpg' },
          { src: '/images/countriesCity/linz3.jpg' },
        ],
      },
    ],
  },
  {
    id: 'turkey',
    key: 'turkey',
    hero: '/images/countries/turkey_hero.jpg',
    flag: '/images/flags/turkey.png',
    cities: [
      {
        nameKey: 'antalya',
        descriptionKey: 'antalyaExp',
        photos: [
          { src: '/images/countriesCity/antalya1.jpg' },
          { src: '/images/countriesCity/antalya2.jpg' },
          { src: '/images/countriesCity/antalya3.jpg' },
          { src: '/images/countriesCity/antalya4.jpg' },
          { src: '/images/countriesCity/antalya5.jpg' },
          { src: '/images/countriesCity/antalya6.jpg' },
        ],
      },
    ],
  },
]

/* ================== 页面入口 ================== */
export default function TouristCitiesPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading…</div>}>
      <TouristCitiesContent />
    </Suspense>
  )
}

/* ================== 页面主体 ================== */
function TouristCitiesContent() {
  const { t } = useTranslation()

  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [zoomIndex, setZoomIndex] = useState<number>(-1)

  const allPhotos = useMemo(
    () =>
      countries.flatMap(country =>
        country.cities.flatMap(city =>
          city.photos.map(p => ({
            src: p.src,
            cityKey: city.nameKey,
            countryKey: country.key,
          })),
        ),
      ),
    [],
  )

  const openZoom = (src: string) =>
    setZoomIndex(allPhotos.findIndex(p => p.src === src))

  const nextPhoto = () => setZoomIndex(i => (i + 1) % allPhotos.length)
  const prevPhoto = () =>
    setZoomIndex(i => (i - 1 + allPhotos.length) % allPhotos.length)

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (zoomIndex < 0) return
      if (e.key === 'Escape') setZoomIndex(-1)
      if (e.key === 'ArrowRight') nextPhoto()
      if (e.key === 'ArrowLeft') prevPhoto()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [zoomIndex])

  const filteredCountries = countries.filter(c =>
    t(c.key).toLowerCase().includes(search.toLowerCase()),
  )

  const currentPhoto = zoomIndex >= 0 ? allPhotos[zoomIndex] : null

  return (
    <div className="p-6">
      <div className="max-w-xl mx-auto mb-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t('searchCountry')}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <h1 className="text-3xl font-bold text-center mb-2">
        {t('touristcities')}
      </h1>
      <p className="text-center text-gray-600 mb-8">
        {t('touristcitiesDescription')}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCountries.map(country => (
          <button
            key={country.id}
            onClick={() => setSelectedCountry(country)}
            className="relative h-56 rounded-xl overflow-hidden shadow-lg"
          >
            <img src={country.hero} className="w-full h-full object-cover" />
            <img src={country.flag} className="absolute bottom-3 right-3 w-10 h-7" />
            <div className="absolute inset-0 bg-black/30 flex items-end p-3">
              <span className="text-white font-semibold">{t(country.key)}</span>
            </div>
          </button>
        ))}
      </div>

      {/* ================== 国家弹窗 ================== */}
      <AnimatePresence>
        {selectedCountry && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCountry(null)}
          >
            <motion.div
              className="bg-white rounded-xl max-w-5xl w-full p-6 overflow-y-auto max-h-[90vh] relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-4 text-2xl"
                onClick={() => setSelectedCountry(null)}
              >
                ✕
              </button>

              <header className="mb-6 text-center">
                <h2 className="text-2xl font-bold">
                  {t(selectedCountry.key)}
                </h2>
                <p className="text-gray-600 mt-1">
                  {t(`${selectedCountry.key}Overview`)}
                </p>
              </header>

              {selectedCountry.cities.map(city => (
                <section key={city.nameKey} className="mb-10">
                  <h3 className="text-xl font-semibold mb-2">
                    {t(city.nameKey)}
                  </h3>
                  <p className="mb-4 text-gray-700">
                    {t(city.descriptionKey)}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {city.photos.map(p => (
                      <div
                        key={p.src}
                        onClick={() => openZoom(p.src)}
                        className="relative h-40 w-full rounded-lg overflow-hidden cursor-pointer"
                      >
                        {isVideo(p.src) ? (
                          <>
                            <video
                              src={p.src}
                              muted
                              preload="metadata"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-black/60 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl">
                                ▶
                              </div>
                            </div>
                          </>
                        ) : (
                          <img
                            src={p.src}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================== 放大查看 ================== */}
      <AnimatePresence>
        {currentPhoto && (
          <motion.div className="fixed inset-0 bg-black z-[60] flex items-center justify-center">
            <div className="absolute top-4 text-white">
              {zoomIndex + 1} / {allPhotos.length}
            </div>

            {/* 底部说明栏（防遮挡） */}
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent text-center py-4 pointer-events-none">
              <span className="text-white text-sm">
                {t(currentPhoto.cityKey)}, {t(currentPhoto.countryKey)}
              </span>
            </div>

            <button
              className="absolute left-6 text-white text-4xl"
              onClick={prevPhoto}
            >
              ‹
            </button>
            <button
              className="absolute right-6 text-white text-4xl"
              onClick={nextPhoto}
            >
              ›
            </button>
            <button
              className="absolute top-4 right-6 text-white text-3xl"
              onClick={() => setZoomIndex(-1)}
            >
              ✕
            </button>

            <TransformWrapper>
              <TransformComponent>
                {isVideo(currentPhoto.src) ? (
                  <video
                    src={currentPhoto.src}
                    controls
                    autoPlay
                    className="max-h-[85vh] max-w-[90vw]"
                  />
                ) : (
                  <img
                    src={currentPhoto.src}
                    className="max-h-[85vh] max-w-[90vw] object-contain"
                  />
                )}
              </TransformComponent>
            </TransformWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
