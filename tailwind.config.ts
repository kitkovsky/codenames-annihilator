import type { Config } from 'tailwindcss'

export const colors = {
  white: '#e2e8f0',
  ['black-100']: '#0c0c0e',
  ['black-90']: '#18181b',
  ['black-80']: '#27272a',
  ['gray-100']: '#3f3f46',
  ['light-gray']: '#a1a1aa',
  ['lighter-gray']: '#d1d1d6',
  green: '#369b6e',
  red: '#cc241d',
  blue: '#52a9ff',
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
      ...colors,
    },
    extend: {
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
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': colors.white,
            '--tw-prose-headings': colors.white,
            '--tw-prose-lead': colors.white,
            '--tw-prose-links': colors.white,
            '--tw-prose-bold': colors.white,
            '--tw-prose-counters': colors.white,
            '--tw-prose-bullets': colors.white,
            '--tw-prose-hr': colors.white,
            '--tw-prose-quotes': colors.white,
            '--tw-prose-quote-borders': colors.white,
            '--tw-prose-captions': colors.white,
            '--tw-prose-code': colors.white,
            '--tw-prose-pre-code': colors.white,
            '--tw-prose-pre-bg': colors.white,
            '--tw-prose-th-borders': colors.white,
            '--tw-prose-td-borders': colors.white,
          },
        },
      }),
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}

export default config
