import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Article } from './mock-data'

interface AppState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  processedArticles: Article[]
  addProcessedArticle: (article: Article) => void
  getArticleById: (id: string) => Article | undefined
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
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
      addProcessedArticle: (article: Article) => {
        console.log('Adding article to store:', article.id)
        set((state) => {
          const updated = {
            processedArticles: [...state.processedArticles, article],
          }
          console.log('Store updated, total articles:', updated.processedArticles.length)
          return updated
        })
      },
      getArticleById: (id: string) => {
        const state = get()
        console.log('Getting article by ID:', id)
        console.log('Available articles:', state.processedArticles.map(a => a.id))
        const article = state.processedArticles.find((a) => a.id === id)
        console.log('Article found:', article ? 'YES' : 'NO')
        return article
      },

      _hasHydrated: false,
      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state })
      },
    }),
    {
      name: 'article-design-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        console.log('Store rehydrated with', state?.processedArticles.length || 0, 'articles')
        state?.setHasHydrated(true)
      },
    }
  )
)
