// Mock data for Article to Design Automatisierung

export interface Article {
  id: string
  filename: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  uploadedAt: string
  processedAt: string | null
  originalContent: string
  processedHtml: string | null
}

export interface TrainingArticle {
  id: string
  filename: string
  uploadedAt: string
}

export const mockArticles: Article[] = [
  {
    id: '1',
    filename: 'Digitalisierung_Bildung_2024.docx',
    status: 'completed',
    uploadedAt: '2025-10-20T14:30:00Z',
    processedAt: '2025-10-20T14:30:25Z',
    originalContent: `# Digitalisierung in der Bildung

Die Digitalisierung revolutioniert das Bildungswesen. Moderne Lernmethoden ermöglichen personalisiertes Lernen und fördern die individuelle Entwicklung der Lernenden.

Praxistipp: Beginne mit kleinen Schritten: Integriere zunächst ein digitales Tool pro Monat in deinen Unterricht. So können sich Lehrende und Lernende schrittweise an die neuen Technologien gewöhnen.

Wusstest Du schon? Studien zeigen, dass digitale Lerntools die Motivation um bis zu 30% steigern können, wenn sie richtig eingesetzt werden.

## Die wichtigsten Vorteile

- **Flexibilität**: Lernen ist nicht mehr an feste Zeiten gebunden
- **Individualisierung**: Jeder kann in seinem eigenen Tempo lernen
- **Interaktivität**: Digitale Tools fördern die aktive Teilnahme`,
    processedHtml: `<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading">Digitalisierung in der Bildung</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Die Digitalisierung revolutioniert das Bildungswesen. Moderne Lernmethoden ermöglichen personalisiertes Lernen und fördern die individuelle Entwicklung der Lernenden.</p>
<!-- /wp:paragraph -->

<!-- wp:roelmagdaleno/callout-block {"style":{"color":{"background":"#e0f2fe","text":"#063753","link":"#0c4a6e"}},"iconColorValue":"#063753"} -->
<div style="color:#063753;background-color:#e4f2e1" class="wp-block-roelmagdaleno-callout-block has-text-color has-background"><div><!-- wp:paragraph -->
<p align="center"><strong>Praxistipp</strong></br><em>Beginne mit kleinen Schritten: Integriere zunächst ein digitales Tool pro Monat in deinen Unterricht. So können sich Lehrende und Lernende schrittweise an die neuen Technologien gewöhnen.</em></p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:roelmagdaleno/callout-block -->

<!-- wp:roelmagdaleno/callout-block {"style":{"color":{"background":"#e0f2fe","text":"#063753","link":"#0c4a6e"}},"iconColorValue":"#063753"} -->
<div style="color:#063753;background-color:#dfe7f2" class="wp-block-roelmagdaleno-callout-block has-text-color has-background"><div><!-- wp:paragraph -->
<p><strong>🧠 Wusstest Du schon?</strong> Studien zeigen, dass digitale Lerntools die Motivation um bis zu 30% steigern können, wenn sie richtig eingesetzt werden.</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:roelmagdaleno/callout-block -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Die wichtigsten Vorteile</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul class="wp-block-list">
  <!-- wp:list-item -->
  <li><strong>Flexibilität</strong>: Lernen ist nicht mehr an feste Zeiten gebunden</li>
  <!-- /wp:list-item -->
  <!-- wp:list-item -->
  <li><strong>Individualisierung</strong>: Jeder kann in seinem eigenen Tempo lernen</li>
  <!-- /wp:list-item -->
  <!-- wp:list-item -->
  <li><strong>Interaktivität</strong>: Digitale Tools fördern die aktive Teilnahme</li>
  <!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:block {"ref":278} /-->`,
  },
  {
    id: '2',
    filename: 'Lernmethoden_Modern.txt',
    status: 'processing',
    uploadedAt: '2025-10-22T09:15:00Z',
    processedAt: null,
    originalContent: `Moderne Lernmethoden für das 21. Jahrhundert

In einer sich schnell verändernden Welt müssen auch unsere Lernmethoden angepasst werden...`,
    processedHtml: null,
  },
  {
    id: '3',
    filename: 'Praxisbeispiele_KI.doc',
    status: 'pending',
    uploadedAt: '2025-10-23T11:00:00Z',
    processedAt: null,
    originalContent: `Künstliche Intelligenz im Klassenzimmer

KI-gestützte Lernsysteme bieten personalisierte Lernpfade und adaptive Aufgaben...`,
    processedHtml: null,
  },
  {
    id: '4',
    filename: 'Gamification_Bildung.docx',
    status: 'failed',
    uploadedAt: '2025-10-21T16:45:00Z',
    processedAt: '2025-10-21T16:45:10Z',
    originalContent: `Gamification in der Bildung`,
    processedHtml: null,
  },
]

export const mockTrainingArticles: TrainingArticle[] = [
  {
    id: 't1',
    filename: 'Referenz_FunFact_01.docx',
    uploadedAt: '2025-10-15T10:00:00Z',
  },
  {
    id: 't2',
    filename: 'Referenz_Praxisbeispiel_01.docx',
    uploadedAt: '2025-10-15T10:05:00Z',
  },
  {
    id: 't3',
    filename: 'Referenz_FAQ_01.docx',
    uploadedAt: '2025-10-15T10:10:00Z',
  },
  {
    id: 't4',
    filename: 'Referenz_Struktur_01.docx',
    uploadedAt: '2025-10-15T10:15:00Z',
  },
  {
    id: 't5',
    filename: 'Referenz_Praxistipp_01.docx',
    uploadedAt: '2025-10-15T10:20:00Z',
  },
]
