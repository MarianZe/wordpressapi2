'use client'

import { Moon, Sun } from 'lucide-react'
import { Button } from './Button'
import { useAppStore } from '@/lib/store'

export function ThemeToggle() {
  const { theme, toggleTheme } = useAppStore()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </Button>
  )
}
