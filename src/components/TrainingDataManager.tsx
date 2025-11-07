'use client'

import { Upload, Trash2, FileText } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card'
import { Button } from './Button'

interface TrainingArticle {
  id: string
  filename: string
  uploadedAt: string
}

interface TrainingDataManagerProps {
  articles: TrainingArticle[]
  onUpload: (file: File) => void
  onDelete: (id: string) => void
}

export function TrainingDataManager({
  articles,
  onUpload,
  onDelete,
}: TrainingDataManagerProps) {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onUpload(files[0])
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trainings-Daten</CardTitle>
        <CardDescription>
          Lade Referenz-Artikel hoch, um die Mustererkennung zu trainieren (20
          Artikel empfohlen)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-4 space-y-4">
          {/* Upload button */}
          <div>
            <input
              type="file"
              accept=".doc,.docx,.txt"
              onChange={handleFileSelect}
              className="hidden"
              id="training-upload"
            />
            <label
              htmlFor="training-upload"
              className="inline-flex items-center justify-center font-medium transition-colors cursor-pointer h-10 px-4 text-base rounded-[var(--radius-md)] bg-[var(--bg-2)] text-[var(--fg-1)] hover:bg-[var(--bg-3)] border border-[var(--border)]"
            >
              <Upload className="w-4 h-4 mr-2" />
              Referenz-Artikel hochladen
            </label>
          </div>

          {/* Article list */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-[var(--fg-2)]">
              Hochgeladene Artikel ({articles.length}/20)
            </p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="flex items-center justify-between p-3 bg-[var(--bg-2)] rounded-[var(--radius-md)] border border-[var(--border)]"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className="w-5 h-5 text-[var(--fg-3)] flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[var(--fg-1)] truncate">
                        {article.filename}
                      </p>
                      <p className="text-xs text-[var(--fg-3)]">
                        {new Date(article.uploadedAt).toLocaleDateString('de-DE')}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(article.id)}
                    className="flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4 text-[var(--danger)]" />
                  </Button>
                </div>
              ))}
              {articles.length === 0 && (
                <p className="text-sm text-[var(--fg-3)] text-center py-8">
                  Noch keine Artikel hochgeladen
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
