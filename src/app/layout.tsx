import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import cn from 'classnames'

import { Header } from '@components/layout/header'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Codenames Annihilator',
  icons: [{ rel: 'icon', url: '/favicon.svg' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-US">
      <body
        className={cn(
          GeistSans.variable,
          'h-full min-h-screen bg-black-90 font-sans text-white',
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}
