import type { Config } from 'tailwindcss'

export const tailwindColors = {
  white: '#e2e8f0',
  ['black-100']: '#0c0c0e',
  ['black-90']: '#18181b',
  green: '#369b6e',
} as const

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-geist-sans)'],
    },
    extend: {
      colors: tailwindColors,
    },
  },
  plugins: [],
}

export default config
