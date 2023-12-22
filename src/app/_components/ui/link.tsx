import { type PropsWithChildren } from 'react'
import NextLink, { type LinkProps as NextLinkProps } from 'next/link'

import { buttonVariants } from '@components/ui/button'
import { cn } from '@utils/cn.utils'

export interface LinkProps extends NextLinkProps, PropsWithChildren {
  type: 'default' | 'clear'
  className?: string
}

const typeToClassName: Record<LinkProps['type'], string> = {
  default: cn(buttonVariants({ variant: 'default' }), 'text-base'),
  clear:
    'hover:text-foreground/85 px-4 py-2 text-base font-medium transition-all',
}

export const Link = (props: LinkProps): React.ReactNode => {
  const { className, children, type, ...rest } = props

  return (
    <NextLink {...rest} className={cn(typeToClassName[type], className)}>
      {children}
    </NextLink>
  )
}
