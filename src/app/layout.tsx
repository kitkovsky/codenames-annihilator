import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import cn from 'classnames'

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
    <html lang="en">
      <body
        className={cn(
          GeistSans.variable,
          'mx-auto h-full max-h-screen w-screen max-w-screen-2xl bg-black px-4 font-sans text-white md:px-6 lg:px-8',
        )}
      >
        {children}
      </body>
    </html>
  )
}
