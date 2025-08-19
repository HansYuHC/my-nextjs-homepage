'use client'
import useTranslation from '../../lib/useTranslation'

export default function AboutPage() {
  const { t } = useTranslation()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('about')}</h1>
      <p>
        我是一名工程师/开发者，这里可以写个人简介。
        （例如教育背景、兴趣爱好、职业目标等。）
      </p>
    </div>
  )
}
