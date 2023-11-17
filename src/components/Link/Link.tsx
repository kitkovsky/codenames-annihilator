import { type PropsWithChildren } from 'react'
import NextLink, { type LinkProps as NextLinkProps } from 'next/link'
import cn from 'classnames'

export interface LinkProps extends NextLinkProps, PropsWithChildren {
  className?: string
}

export const Link = (props: LinkProps): JSX.Element => {
  const { className, children, ...rest } = props

  return (
    <NextLink
      {...rest}
      className={cn(className, 'text-white transition-colors hover:text-gray')}
    >
      {children}
    </NextLink>
  )
}
