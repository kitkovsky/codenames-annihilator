import { type PropsWithChildren } from 'react'
import NextLink, { type LinkProps as NextLinkProps } from 'next/link'
import cn from 'classnames'

export interface LinkProps extends NextLinkProps, PropsWithChildren {
  type: 'primary' | 'clear'
  className?: string
}

const typeToClassName: Record<LinkProps['type'], string> = {
  primary: 'bg-green text-white rounded-md hover:bg-emerald-700',
  clear: 'hover:brightness-75',
}

export const Link = (props: LinkProps): React.ReactNode => {
  const { className, children, type, ...rest } = props

  return (
    <NextLink
      {...rest}
      className={cn(
        className,
        typeToClassName[type],
        'px-4 py-2 text-base font-medium transition-all',
      )}
    >
      {children}
    </NextLink>
  )
}
