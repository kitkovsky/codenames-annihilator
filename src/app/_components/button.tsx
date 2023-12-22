import cn from 'classnames'

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string
}

export const Button = (props: ButtonProps): React.ReactNode => {
  const { children, className, ...rest } = props

  return (
    <button
      className={cn(
        className,
        'rounded-md bg-green px-4 py-2 font-medium text-white',
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
