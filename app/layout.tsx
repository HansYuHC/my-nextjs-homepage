import './globals.css'
import type { Metadata } from 'next'
import ClientHeader from './ClientHeader'

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
    <html lang="en"> {/* 暂时静态，后续可动态化 */}
      <body>
        {/* Header 移到客户端组件 */}
        <ClientHeader />

        {/* Main */}
        <main className="p-8">{children}</main>

        {/* Footer */}
        <footer className="p-4 bg-gray-200 text-center">
          © 2025 My Website
        </footer>
      </body>
    </html>
  )
}