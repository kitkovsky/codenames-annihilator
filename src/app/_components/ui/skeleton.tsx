import { cn } from '@utils/cn.utils'

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}

export { Skeleton }
