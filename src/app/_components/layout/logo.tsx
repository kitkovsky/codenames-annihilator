import NextLink from 'next/link'

import { cn } from '@utils/cn.utils'

export interface LogoProps {
  className?: string
  size?: 'sm' | 'lg'
}

export const Logo = (props: LogoProps): React.ReactElement => {
  const { className, size = 'sm' } = props

  return (
    <NextLink
      href="/"
      className={cn('group flex flex-col font-bold transition-all', className)}
    >
      <span
        className={cn(
          '!leading-none group-hover:text-foreground/85',
          { 'text-sm sm:text-base': size === 'sm' },
          { 'text-base sm:text-lg': size === 'lg' },
        )}
      >
        CODENAMES
      </span>
      <span
        className={cn(
          '!leading-none text-primary group-hover:text-primary/85',
          { 'text-lg sm:text-xl': size === 'sm' },
          { 'text-xl sm:text-2xl': size === 'lg' },
        )}
      >
        ANNIHILATOR
      </span>
    </NextLink>
  )
}
