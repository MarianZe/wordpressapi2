import { create } from 'zustand'
import { Article } from './mock-data'

interface AppState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  processedArticles: Article[]
  addProcessedArticle: (article: Article) => void
  getArticleById: (id: string) => Article | undefined
}

export const useAppStore = create<AppState>((set, get) => ({
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

  processedArticles: [],
  addProcessedArticle: (article: Article) =>
    set((state) => ({
      processedArticles: [...state.processedArticles, article],
    })),
  getArticleById: (id: string) => {
    const state = get()
    return state.processedArticles.find((a) => a.id === id)
  },
}))
