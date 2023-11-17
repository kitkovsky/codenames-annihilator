import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import cn from 'classnames'
import './globals.css'

export const metadata: Metadata = {
  title: 'Codenames Annihilator',
}

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html lang="en">
      <body
        className={cn(
          GeistSans.variable,
          'mx-auto h-full max-h-screen w-screen max-w-screen-2xl bg-black px-4 font-sans md:px-6 lg:px-8',
        )}
      >
        {children}
      </body>
    </html>
  )
}
