'use client'

import { Layout } from '@/components/Layout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card'
import { Button } from '@/components/Button'
import { ButtonLink } from '@/components/ButtonLink'
import { mockArticles } from '@/lib/mock-data'
import { FileText, Clock, CheckCircle, XCircle, Eye, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Dashboard() {
  const totalArticles = mockArticles.length
  const completedArticles = mockArticles.filter((a) => a.status === 'completed').length
  const processingArticles = mockArticles.filter((a) => a.status === 'processing').length
  const failedArticles = mockArticles.filter((a) => a.status === 'failed').length

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[var(--fg-1)] mb-2">Dashboard</h1>
          <p className="text-[var(--fg-2)]">
            Übersicht über alle hochgeladenen und verarbeiteten Artikel
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            icon={<FileText className="w-5 h-5" />}
            label="Gesamt"
            value={totalArticles}
            color="var(--fg-2)"
          />
          <StatCard
            icon={<CheckCircle className="w-5 h-5" />}
            label="Abgeschlossen"
            value={completedArticles}
            color="var(--success)"
          />
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            label="In Bearbeitung"
            value={processingArticles}
            color="var(--accent)"
          />
          <StatCard
            icon={<XCircle className="w-5 h-5" />}
            label="Fehlgeschlagen"
            value={failedArticles}
            color="var(--danger)"
          />
        </div>

        {/* Articles List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Artikel</CardTitle>
              <ButtonLink size="sm" href="/upload">
                Neuen Artikel hochladen
              </ButtonLink>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-4 space-y-3">
              {mockArticles.map((article) => (
                <div
                  key={article.id}
                  className="flex items-center justify-between p-4 bg-[var(--bg-2)] rounded-[var(--radius-md)] border border-[var(--border)]"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <FileText className="w-5 h-5 text-[var(--fg-3)] flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[var(--fg-1)] truncate">
                        {article.filename}
                      </p>
                      <p className="text-xs text-[var(--fg-3)]">
                        Hochgeladen:{' '}
                        {new Date(article.uploadedAt).toLocaleString('de-DE')}
                      </p>
                    </div>
                    <StatusBadge status={article.status} />
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <ButtonLink variant="secondary" size="sm" href={`/article/${article.id}`}>
                      <Eye className="w-4 h-4" />
                    </ButtonLink>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => alert('Löschen-Funktion wird implementiert')}
                    >
                      <Trash2 className="w-4 h-4 text-[var(--danger)]" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: number
  color: string
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-[var(--radius-md)]"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {icon}
          </div>
          <div>
            <p className="text-2xl font-bold text-[var(--fg-1)]">{value}</p>
            <p className="text-sm text-[var(--fg-3)]">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatusBadge({
  status,
}: {
  status: 'pending' | 'processing' | 'completed' | 'failed'
}) {
  return (
    <span
      className={cn(
        'px-2 py-1 text-xs font-medium rounded-[var(--radius-md)]',
        {
          'bg-[var(--bg-3)] text-[var(--fg-2)]': status === 'pending',
          'bg-[var(--accent)]/20 text-[var(--accent)]': status === 'processing',
          'bg-[var(--success)]/20 text-[var(--success)]': status === 'completed',
          'bg-[var(--danger)]/20 text-[var(--danger)]': status === 'failed',
        }
      )}
    >
      {status === 'pending' && 'Ausstehend'}
      {status === 'processing' && 'In Bearbeitung'}
      {status === 'completed' && 'Abgeschlossen'}
      {status === 'failed' && 'Fehlgeschlagen'}
    </span>
  )
}
