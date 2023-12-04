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
        'bg-gray80 rounded-lg px-4 py-2 text-white transition-colors hover:bg-white hover:text-black',
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
