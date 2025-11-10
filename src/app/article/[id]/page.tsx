'use client'

import { use } from 'react'
import { Layout } from '@/components/Layout'
import { Button } from '@/components/Button'
import { ButtonLink } from '@/components/ButtonLink'
import { ArticlePreview } from '@/components/ArticlePreview'
import { HtmlOutput } from '@/components/HtmlOutput'
import { ExportButton } from '@/components/ExportButton'
import { ProcessingStatus } from '@/components/ProcessingStatus'
import { mockArticles } from '@/lib/mock-data'
import { useAppStore } from '@/lib/store'
import { ArrowLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ArticleDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const processedArticles = useAppStore((state) => state.processedArticles)
  const getArticleById = useAppStore((state) => state.getArticleById)
  const hasHydrated = useAppStore((state) => state._hasHydrated)

  // Debug logging
  console.log('=== Article Detail Page Debug ===')
  console.log('Article ID from URL:', id)
  console.log('Store has hydrated:', hasHydrated)
  console.log('Processed articles in store:', processedArticles)
  console.log('Store length:', processedArticles.length)

  // Show loading state while store is rehydrating from localStorage
  if (!hasHydrated) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-[var(--bg-2)] rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-[var(--bg-2)] rounded w-64 mx-auto"></div>
          </div>
          <p className="text-[var(--fg-3)] mt-4 text-sm">
            Lade Artikel...
          </p>
        </div>
      </Layout>
    )
  }

  // Try to find article in store first, then fall back to mock data
  const storeArticle = getArticleById(id)
  const mockArticle = mockArticles.find((a) => a.id === id)
  const article = storeArticle || mockArticle

  console.log('Store article:', storeArticle ? 'Found' : 'Not found')
  console.log('Mock article:', mockArticle ? 'Found' : 'Not found')
  console.log('Final article:', article ? 'Found' : 'Not found')
  console.log('=== End Debug ===')

  if (!article) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold text-[var(--fg-1)] mb-4">
            Artikel nicht gefunden
          </h1>
          <p className="text-[var(--fg-3)] mb-4">
            ID: {id}
          </p>
          <p className="text-xs text-[var(--fg-3)] mb-4">
            Store hat {processedArticles.length} Artikel(n)
          </p>
          <details className="text-xs text-left max-w-md mx-auto mt-4">
            <summary className="cursor-pointer text-[var(--fg-2)] hover:text-[var(--fg-1)]">
              Debug Info anzeigen
            </summary>
            <pre className="mt-2 p-4 bg-[var(--bg-2)] rounded text-[var(--fg-3)] overflow-auto">
              {JSON.stringify({
                searchingFor: id,
                availableIds: processedArticles.map(a => a.id),
                storeHydrated: hasHydrated
              }, null, 2)}
            </pre>
          </details>
          <ButtonLink href="/" className="mt-4">Zurück zum Dashboard</ButtonLink>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <ButtonLink variant="ghost" size="sm" href="/" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zum Dashboard
          </ButtonLink>
          <h1 className="text-3xl font-bold text-[var(--fg-1)] mb-2">
            {article.filename}
          </h1>
          <p className="text-sm text-[var(--fg-3)]">
            Hochgeladen: {new Date(article.uploadedAt).toLocaleString('de-DE')}
            {article.processedAt && (
              <>
                {' • '}
                Verarbeitet:{' '}
                {new Date(article.processedAt).toLocaleString('de-DE')}
              </>
            )}
          </p>
        </div>

        {/* Status */}
        <ProcessingStatus status={article.status} />

        {/* Content Grid */}
        {article.status === 'completed' && article.processedHtml && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ArticlePreview
                filename={article.filename}
                content={article.originalContent}
              />
              <HtmlOutput html={article.processedHtml} />
            </div>

            {/* Export Buttons */}
            <div className="flex gap-4">
              <ExportButton
                articleId={article.id}
                filename={article.filename}
                format="docx"
              />
              <ExportButton
                articleId={article.id}
                filename={article.filename}
                format="txt"
              />
            </div>
          </>
        )}

        {article.status === 'processing' && (
          <div className="text-center py-12">
            <p className="text-[var(--fg-2)]">
              Dein Artikel wird gerade verarbeitet. Dies kann einige Sekunden dauern...
            </p>
          </div>
        )}

        {article.status === 'failed' && (
          <div className="text-center py-12">
            <p className="text-[var(--danger)] mb-4">
              Bei der Verarbeitung ist ein Fehler aufgetreten.
            </p>
            <Button>Erneut verarbeiten</Button>
          </div>
        )}

        {article.status === 'pending' && (
          <div className="text-center py-12">
            <p className="text-[var(--fg-2)] mb-4">
              Dieser Artikel wartet auf Verarbeitung.
            </p>
            <Button>Jetzt verarbeiten</Button>
          </div>
        )}
      </div>
    </Layout>
  )
}
