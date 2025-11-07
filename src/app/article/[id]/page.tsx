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
import { ArrowLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ArticleDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const article = mockArticles.find((a) => a.id === id)

  if (!article) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold text-[var(--fg-1)] mb-4">
            Artikel nicht gefunden
          </h1>
          <ButtonLink href="/">Zurück zum Dashboard</ButtonLink>
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
