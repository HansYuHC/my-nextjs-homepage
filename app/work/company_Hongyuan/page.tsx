'use client'

import useTranslation from '../../../lib/useTranslation'
import { motion } from 'framer-motion'

export default function CompanyAPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-10 text-center">
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {t('company_Hongyuan')}
      </motion.h1>

      <motion.p
        className="text-gray-700 max-w-2xl whitespace-pre-line"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {t('company_Hongyuan_work')}
      </motion.p>

      <motion.img
        src="/images/lolin_factory.jpg"
        alt="Lolin Factory"
        className="mt-8 rounded-2xl shadow-lg w-full max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      />
    </div>
  )
}
