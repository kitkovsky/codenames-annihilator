import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'

import { Header } from '@components/layout/header'
import { cn } from '@utils/cn.utils'
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
          'h-full min-h-screen bg-background font-sans text-foreground',
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}
