'use client'

import { Suspense, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTranslation from '../../../lib/useTranslation'

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

// ✅ 所有城市照片路径改为 /images/countriesCity/
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
        photos: [{ src: '/images/countriesCity/paris1.jpg' },
            { src: '/images/countriesCity/paris2.jpg' },
            { src: '/images/countriesCity/paris3.jpg' }],
      },
      {
        name: 'Strasbourg',
        descriptionKey: 'strasbourgExp',
        photos: [{ src: '/images/countriesCity/strasbourg.jpg' }],
      },
      {
        name: 'Colmar',
        descriptionKey: 'colmarExp',
        photos: [{ src: '/images/countriesCity/colmar1.jpg' },
            { src: '/images/countriesCity/colmar2.jpg' }],
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
        photos: [{ src: '/images/countriesCity/milan1.jpg' },
            { src: '/images/countriesCity/milan2.jpg' }],
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
        photos: [{ src: '/images/countriesCity/budapest1.jpg' },
            { src: '/images/countriesCity/budapest2.jpg' },
            { src: '/images/countriesCity/budapest3.jpg' }],
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
        photos: [{ src: '/images/countriesCity/zuerich1.jpg' },
            { src: '/images/countriesCity/zuerich2.jpg' }],
      },
      {
        name: 'Luzern',
        descriptionKey: 'luzernExp',
        photos: [{ src: '/images/countriesCity/luzern_1.jpg' },
            { src: '/images/countriesCity/luzern_2.jpg' }],
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
        photos: [{ src: '/images/countriesCity/hallstatt1.jpg' },
            { src: '/images/countriesCity/hallstatt2.jpg' },
            { src: '/images/countriesCity/hallstatt3.jpg' }],
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
        photos: [{ src: '/images/countriesCity/antalya1.jpg' },
            { src: '/images/countriesCity/antalya2.jpg' },
            { src: '/images/countriesCity/antalya3.jpg' },
            { src: '/images/countriesCity/antalya4.jpg' },
            { src: '/images/countriesCity/antalya5.jpg' },
            { src: '/images/countriesCity/antalya6.jpg' }],
      },
    ],
  },
]

export default function TouristCitiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TouristCitiesContent />
    </Suspense>
  )
}

function TouristCitiesContent() {
  const { t } = useTranslation()
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">{t('touristcities')}</h1>
      <p className="text-gray-700 text-center mb-8">{t('touristcitiesDescription')}</p>

      {/* 网格布局 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {countries.map((country, idx) => (
          <motion.button
            key={country.id}
            onClick={() => setSelectedCountry(country)}
            className="relative w-full h-56 md:h-64 xl:h-72 rounded-xl overflow-hidden shadow-md cursor-pointer group border-0"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.45 }}
            whileHover={{ scale: 1.03 }}
            aria-label={t(country.key)}
          >
            <img
              src={country.hero}
              alt={t(country.key)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              draggable={false}
            />
            <img
              src={country.flag}
              alt={`${t(country.key)} flag`}
              className="absolute bottom-3 right-3 w-10 h-7 rounded-sm shadow-md bg-white/20"
              draggable={false}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 flex items-end transition-colors duration-500">
              <div className="p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="text-white font-semibold drop-shadow-md">{t(country.key)}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* 弹窗 */}
      <AnimatePresence>
        {selectedCountry && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCountry(null)}
          >
            <motion.div
              className="relative bg-white rounded-xl shadow-2xl p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ y: 20, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 10, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl font-bold"
                onClick={() => setSelectedCountry(null)}
                aria-label={t('close')}
              >
                ✕
              </button>

              <header className="mb-4 text-center">
                <h2 className="text-2xl font-bold">{t(selectedCountry.key)}</h2>
                <p className="text-gray-600 mt-1">{t(`${selectedCountry.key}Overview`)}</p>
              </header>

              <div className="space-y-8">
                {selectedCountry.cities.map((city, i) => (
                  <section key={i}>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">{city.name}</h3>
                    <p className="text-gray-700 mb-3">{t(city.descriptionKey)}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
                      {city.photos.map((p, pi) => (
                        <div key={pi} className="rounded-xl overflow-hidden shadow-md">
                          <img
                            src={p.src}
                            alt={`${city.name} ${pi + 1}`}
                            className="w-full h-64 object-contain bg-gray-100 rounded-xl transition-transform duration-500 hover:scale-105"
                            draggable={false}
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
