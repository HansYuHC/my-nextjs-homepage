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
    <html lang="en"><body>
      <Suspense fallback={<header className="p-4 bg-gray-800 text-white">Loading...</header>}>
        <ClientHeader />
      </Suspense>
      <main className="p-8">{children}</main>
      <footer className="p-4 bg-gray-200 text-center">
        © 2025 My Website
      </footer>
    </body></html>
  )
}