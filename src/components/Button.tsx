import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            // Variants
            'bg-[var(--accent)] text-[var(--accent-fg)] hover:bg-[var(--accent-hover)]':
              variant === 'primary',
            'bg-[var(--bg-2)] text-[var(--fg-1)] hover:bg-[var(--bg-3)] border border-[var(--border)]':
              variant === 'secondary',
            'bg-transparent text-[var(--fg-2)] hover:bg-[var(--bg-2)] hover:text-[var(--fg-1)]':
              variant === 'ghost',

            // Sizes
            'h-8 px-3 text-sm rounded-[var(--radius-md)]': size === 'sm',
            'h-10 px-4 text-base rounded-[var(--radius-md)]': size === 'md',
            'h-12 px-6 text-lg rounded-[var(--radius-lg)]': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
