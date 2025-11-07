import { create } from 'zustand'

interface AppState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      // Update document class
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
      }
      return { theme: newTheme }
    }),
}))
