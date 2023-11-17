import type { Config } from 'tailwindcss'

export const tailwindColors = {
  white: '#e2e8f0',
  black: '#18181b',
  gray: '#d4d4d8',
  green: '#689d6a',
} as const

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: tailwindColors,
    fontFamily: {
      sans: ['var(--font-geist-sans)'],
    },
  },
  plugins: [],
}

export default config
