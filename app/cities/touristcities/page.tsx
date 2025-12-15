'use client'

import { Suspense, useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import useTranslation from '../../../lib/useTranslation'

/* ================== 类型 ================== */
type Photo = { src: string }

type CityInfo = {
  name: string
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
        name: 'Barcelona',
        descriptionKey: 'barcelonaExp',
        photos: [
          { src: '/images/countriesCity/barcelona1.jpg' },
          { src: '/images/countriesCity/barcelona2.jpg' },
          { src: '/images/countriesCity/barcelona3.jpg' },
        ],
      },
      {
        name: 'Tennerife',
        descriptionKey: 'tennerifeExp',
        photos: [{ src: '/images/countriesCity/tennerife.jpg' }],
      },
      {
        name: 'Palma',
        descriptionKey: 'palmaExp',
        photos: [{ src: '/images/countriesCity/palma.jpg' }],
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
        name: 'Paris',
        descriptionKey: 'parisExp',
        photos: [
          { src: '/images/countriesCity/paris1.jpg' },
          { src: '/images/countriesCity/paris2.jpg' },
          { src: '/images/countriesCity/paris3.jpg' },
        ],
      },
      {
        name: 'Strasbourg',
        descriptionKey: 'strasbourgExp',
        photos: [{ src: '/images/countriesCity/strasbourg.jpg' }],
      },
      {
        name: 'Colmar',
        descriptionKey: 'colmarExp',
        photos: [
          { src: '/images/countriesCity/colmar1.jpg' },
          { src: '/images/countriesCity/colmar2.jpg' },
        ],
      },
      {
        name: 'Nice',
        descriptionKey: 'niceExp',
        photos: [{ src: '/images/countriesCity/nice.jpg' }],
      },
      {
        name: 'Cannes',
        descriptionKey: 'cannesExp',
        photos: [{ src: '/images/countriesCity/cannes.jpg' }],
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
        name: 'Monaco City',
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
        name: 'Como',
        descriptionKey: 'comoExp',
        photos: [{ src: '/images/countriesCity/como.jpg' }],
      },
      {
        name: 'Milan',
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
        name: 'Luxembourg City',
        descriptionKey: 'luxembourgExp',
        photos: [{ src: '/images/countriesCity/luxembourgCity.jpg' }],
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
        name: 'Praha',
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
        name: 'Budapest',
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
        name: 'Bratislava',
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
        name: 'Vaduz',
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
        name: 'Zuerich',
        descriptionKey: 'zuerichExp',
        photos: [
          { src: '/images/countriesCity/zuerich1.jpg' },
          { src: '/images/countriesCity/zuerich2.jpg' },
        ],
      },
      {
        name: 'Luzern',
        descriptionKey: 'luzernExp',
        photos: [
          { src: '/images/countriesCity/luzern_1.jpg' },
          { src: '/images/countriesCity/luzern_2.jpg' },
        ],
      },
      {
        name: 'Geneva',
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
        name: 'Wien',
        descriptionKey: 'wienExp',
        photos: [{ src: '/images/countriesCity/wien1.jpg' }],
      },
      {
        name: 'Salzburg',
        descriptionKey: 'salzburgExp',
        photos: [{ src: '/images/countriesCity/salzburg.jpg' }],
      },
      {
        name: 'Hallstatt',
        descriptionKey: 'hallstattExp',
        photos: [
          { src: '/images/countriesCity/hallstatt1.jpg' },
          { src: '/images/countriesCity/hallstatt2.jpg' },
          { src: '/images/countriesCity/hallstatt3.jpg' },
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
        name: 'Antalya',
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
            city: city.name,
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
      {/* 搜索 */}
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

      {/* 国家卡片 */}
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

      {/* 国家弹窗 */}
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

              {/* ✅ 国家标题 + 描述 */}
              <header className="mb-6 text-center">
                <h2 className="text-2xl font-bold">
                  {t(selectedCountry.key)}
                </h2>
                <p className="text-gray-600 mt-1">
                  {t(`${selectedCountry.key}Overview`)}
                </p>
              </header>

              {selectedCountry.cities.map(city => (
                <section key={city.name} className="mb-10">
                  <h3 className="text-xl font-semibold mb-2">{city.name}</h3>
                  <p className="mb-4 text-gray-700">
                    {t(city.descriptionKey)}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {city.photos.map(p => (
                      <img
                        key={p.src}
                        src={p.src}
                        onClick={() => openZoom(p.src)}
                        className="h-40 w-full object-cover rounded-lg cursor-pointer"
                      />
                    ))}
                  </div>
                </section>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 全屏查看 */}
      <AnimatePresence>
        {currentPhoto && (
          <motion.div className="fixed inset-0 bg-black z-[60] flex items-center justify-center">
            <div className="absolute top-4 text-white">
              {zoomIndex + 1} / {allPhotos.length}
            </div>
            <div className="absolute bottom-6 text-white">
              {currentPhoto.city}, {t(currentPhoto.countryKey)}
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
                <img
                  src={currentPhoto.src}
                  className="max-h-[90vh] max-w-[90vw] object-contain"
                />
              </TransformComponent>
            </TransformWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
