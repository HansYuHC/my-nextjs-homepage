'use client'
import useTranslation from '../../lib/useTranslation'

export default function ContactPage() {
  const { t } = useTranslation()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('contact')}</h1>
      <p>可以通过以下方式联系我：</p>
      <ul className="list-disc pl-6 mt-2">
        <li>Email: example@mail.com</li>
        <li>LinkedIn: linkedin.com/in/example</li>
        <li>WeChat: mywechatid</li>
      </ul>
    </div>
  )
}
