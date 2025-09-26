import './globals.css'
import type { Metadata } from 'next'
import ClientHeader from './ClientHeader'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'My Website',
  description: 'Personal site with Next.js and i18n',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        {/* 顶部导航栏 - 半透明 */}
        <Suspense
          fallback={
            <header className="p-4 bg-black/10 text-white backdrop-blur-sm">
              Loading...
            </header>
          }
        >
          <ClientHeader />
        </Suspense>

        {/* 主体内容 */}
        <main className="pt-14 pb-14">{children}</main>

        {/* 页脚 - 半透明 */}
        <footer className="fixed bottom-0 left-0 w-full p-4
          bg-black/30 text-white text-center
          backdrop-blur-md shadow-inner z-40">
          © 2025 My Website
        </footer>

      </body>
    </html>
  )
}
