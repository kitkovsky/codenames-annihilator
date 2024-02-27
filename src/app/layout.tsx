import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

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
}): React.ReactElement {
  return (
    <html lang="en-US">
      <body
        className={cn(
          GeistSans.variable,
          'bg-background font-sans text-foreground',
        )}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
