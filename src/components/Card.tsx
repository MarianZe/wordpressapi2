import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-1)] p-6 shadow-sm',
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: CardProps) {
  return <div className={cn('flex flex-col space-y-1.5', className)} {...props} />
}

export function CardTitle({ className, ...props }: CardProps) {
  return (
    <h3
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }: CardProps) {
  return (
    <p className={cn('text-sm text-[var(--fg-3)]', className)} {...props} />
  )
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn('pt-0', className)} {...props} />
}
