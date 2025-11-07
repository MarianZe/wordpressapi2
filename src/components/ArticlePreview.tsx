import { Card, CardHeader, CardTitle, CardContent } from './Card'

interface ArticlePreviewProps {
  filename: string
  content: string
}

export function ArticlePreview({ filename, content }: ArticlePreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Original-Artikel</CardTitle>
        <p className="text-sm text-[var(--fg-3)] mt-2">{filename}</p>
      </CardHeader>
      <CardContent>
        <div className="mt-4 p-4 bg-[var(--bg-2)] rounded-[var(--radius-md)] max-h-96 overflow-y-auto">
          <pre className="text-sm text-[var(--fg-2)] whitespace-pre-wrap font-mono">
            {content}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}
