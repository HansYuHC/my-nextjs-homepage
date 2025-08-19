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
    <html lang="en"><body>
      <ClientHeader />
      <main className="p-8">{children}</main>
      <footer className="p-4 bg-gray-200 text-center">
        © 2025 My Website
      </footer>
    </body></html>
  )
}