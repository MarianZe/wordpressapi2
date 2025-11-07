'use client'

import { useState } from 'react'
import { Layout } from '@/components/Layout'
import { Button } from '@/components/Button'
import { ButtonLink } from '@/components/ButtonLink'
import { TrainingDataManager } from '@/components/TrainingDataManager'
import { mockTrainingArticles } from '@/lib/mock-data'
import { ArrowLeft } from 'lucide-react'

export default function TrainingPage() {
  const [articles, setArticles] = useState(mockTrainingArticles)

  const handleUpload = (file: File) => {
    // Simulate upload - in Phase 2 this will call the API
    console.log('Uploading training article:', file.name)

    const newArticle = {
      id: `t${Date.now()}`,
      filename: file.name,
      uploadedAt: new Date().toISOString(),
    }

    setArticles([...articles, newArticle])
    alert(`Referenz-Artikel "${file.name}" hochgeladen! In Phase 2 wird dies mit echter API-Logik ersetzt.`)
  }

  const handleDelete = (id: string) => {
    // Simulate delete - in Phase 2 this will call the API
    if (confirm('Möchtest du diesen Referenz-Artikel wirklich löschen?')) {
      setArticles(articles.filter((a) => a.id !== id))
    }
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
            Trainings-Daten
          </h1>
          <p className="text-[var(--fg-2)]">
            Verwalte Referenz-Artikel für die Mustererkennung
          </p>
        </div>

        {/* Info Card */}
        <div className="p-6 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-[var(--radius-lg)]">
          <h2 className="text-lg font-semibold text-[var(--fg-1)] mb-2">
            Warum Trainings-Daten?
          </h2>
          <p className="text-sm text-[var(--fg-2)]">
            Die hochgeladenen Referenz-Artikel helfen der KI dabei, semantische
            Muster wie "Praxistipp", "Fun-Fact" oder "Wusstest Du schon?" zu
            erkennen und korrekt zu formatieren. Für optimale Ergebnisse empfehlen
            wir mindestens 20 Referenz-Artikel.
          </p>
        </div>

        {/* Training Data Manager */}
        <TrainingDataManager
          articles={articles}
          onUpload={handleUpload}
          onDelete={handleDelete}
        />
      </div>
    </Layout>
  )
}
