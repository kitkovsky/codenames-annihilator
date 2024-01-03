import { type PropsWithChildren } from 'react'
import NextLink, { type LinkProps as NextLinkProps } from 'next/link'

import { buttonVariants } from '@components/ui/button'
import { cn } from '@utils/cn.utils'

export interface LinkProps extends NextLinkProps, PropsWithChildren {
  variant: 'default' | 'ghost' | 'clear' | 'custom'
  className?: string
}

const typeToClassName: Record<LinkProps['variant'], string> = {
  default: cn(buttonVariants({ variant: 'default' }), 'text-base'),
  ghost: cn(buttonVariants({ variant: 'ghost' })),
  clear:
    'hover:text-foreground/85 px-4 py-2 text-base font-medium transition-all',
  custom: '',
}

export const Link = (props: LinkProps): React.ReactNode => {
  const { className, children, variant: type, ...rest } = props

  return (
    <NextLink {...rest} className={cn(typeToClassName[type], className)}>
      {children}
    </NextLink>
  )
}
