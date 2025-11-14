'use client'

import { Suspense } from 'react'
import useTranslation from '../../lib/useTranslation'
import { motion } from 'framer-motion'

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactContent />
    </Suspense>
  )
}

function ContactContent() {
  const { t } = useTranslation()

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">

      {/* 标题，与其它页面一致 */}
      <h1 className="text-3xl font-bold text-center mb-12">
        {t('contact')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* 左侧联系方式 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <ContactItem title="Email" text="example@mail.com" icon="📩" />
          <ContactItem title="Phone" text="+49 123 456 789" icon="📞" />
          <ContactItem title="WeChat" text="mywechatid" icon="🟩" />
          <ContactItem title="LinkedIn" text="linkedin.com/in/example" icon="🔗" />
        </motion.div>

        {/* 右侧表单 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6 rounded-2xl shadow-lg border bg-white"
        >
          <ContactForm />
        </motion.div>

      </div>
    </div>
  )
}

/* ----------- 修复 TypeScript：给组件加 Props 类型 ----------- */
type ContactItemProps = {
  title: string
  text: string
  icon: React.ReactNode
}

function ContactItem({ title, text, icon }: ContactItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="p-5 border rounded-xl shadow-sm flex items-center gap-4 bg-white"
    >
      <span className="text-3xl">{icon}</span>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-600">{text}</p>
      </div>
    </motion.div>
  )
}


function ContactForm() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    await fetch('/api/send-email', {
      method: 'POST',
      body: formData,
    })

    alert('Your message has been sent!')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        name="name"
        placeholder="Your Name"
        className="w-full p-3 border rounded-lg"
        required
      />

      <input
        name="email"
        placeholder="Your Email"
        className="w-full p-3 border rounded-lg"
        required
      />

      <textarea
        name="message"
        placeholder="Your Message"
        rows={5}
        className="w-full p-3 border rounded-lg"
        required
      />

      <button
        type="submit"
        className="w-full p-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Send
      </button>
    </form>
  )
}
