import type { Config } from 'tailwindcss'

export const colors = {
  white: '#e2e8f0',
  ['black-100']: '#0c0c0e',
  ['black-90']: '#18181b',
  ['black-80']: '#27272a',
  ['light-gray']: '#a1a1aa',
  ['lighter-gray']: '#d1d1d6',
  green: '#369b6e',
  red: '#7f1d1d',
}

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
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: colors['black-80'],
        input: colors['black-80'],
        ring: colors['lighter-gray'],
        background: colors['black-90'],
        foreground: colors.white,
        primary: {
          DEFAULT: colors.green,
          foreground: colors.white,
        },
        secondary: {
          DEFAULT: colors['black-80'],
          foreground: colors.white,
        },
        destructive: {
          DEFAULT: colors.red,
          foreground: colors.white,
        },
        muted: {
          DEFAULT: colors['black-80'],
          foreground: colors['light-gray'],
        },
        accent: {
          DEFAULT: colors['black-80'],
          foreground: colors.white,
        },
        popover: {
          DEFAULT: colors['black-90'],
          foreground: colors.white,
        },
        card: {
          DEFAULT: colors['black-90'],
          foreground: colors.white,
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  plugins: [require('tailwindcss-animate')],
}

export default config
