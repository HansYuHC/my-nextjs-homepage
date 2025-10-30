'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import PythonContent from './pythonContent'

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-[80vh]">
          <motion.div
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      }
    >
      <PythonContent />
    </Suspense>
  )
}
