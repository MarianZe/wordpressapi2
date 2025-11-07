'use client'

import { useState } from 'react'
import { Layout } from '@/components/Layout'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/Card'
import { UploadZone } from '@/components/UploadZone'
import { Button } from '@/components/Button'
import { ButtonLink } from '@/components/ButtonLink'
import { ProcessingStatus } from '@/components/ProcessingStatus'
import { ArrowLeft } from 'lucide-react'

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending')

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setStatus('pending')
  }

  const handleProcess = () => {
    if (!selectedFile) return

    setStatus('processing')

    // Simulate processing
    setTimeout(() => {
      setStatus('completed')
      alert('Artikel erfolgreich verarbeitet! In Phase 2 wird dies mit echter API-Logik ersetzt.')
    }, 2000)
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <ButtonLink variant="ghost" size="sm" href="/" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zum Dashboard
          </ButtonLink>
          <h1 className="text-3xl font-bold text-[var(--fg-1)] mb-2">
            Artikel hochladen
          </h1>
          <p className="text-[var(--fg-2)]">
            Lade eine .doc, .docx oder .txt Datei hoch, um sie automatisch zu
            formatieren
          </p>
        </div>

        {/* Upload Zone */}
        <Card>
          <CardHeader>
            <CardTitle>Datei auswählen</CardTitle>
            <CardDescription>
              Unterstützte Formate: .doc, .docx, .txt
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UploadZone onFileSelect={handleFileSelect} />
          </CardContent>
        </Card>

        {/* Selected File Info */}
        {selectedFile && (
          <Card>
            <CardHeader>
              <CardTitle>Ausgewählte Datei</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-[var(--bg-2)] rounded-[var(--radius-md)]">
                  <p className="text-sm font-medium text-[var(--fg-1)]">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-[var(--fg-3)] mt-1">
                    Größe: {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>

                <ProcessingStatus status={status} />

                <Button
                  onClick={handleProcess}
                  disabled={status === 'processing' || status === 'completed'}
                  className="w-full"
                >
                  {status === 'processing' && 'Wird verarbeitet...'}
                  {status === 'pending' && 'Jetzt verarbeiten'}
                  {status === 'completed' && 'Erfolgreich verarbeitet'}
                  {status === 'failed' && 'Erneut versuchen'}
                </Button>

                {status === 'completed' && (
                  <ButtonLink variant="secondary" href="/article/1" className="w-full">
                    Ergebnis ansehen
                  </ButtonLink>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}
