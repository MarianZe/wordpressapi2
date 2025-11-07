'use client'

import { Copy, Check } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from './Card'
import { Button } from './Button'
import { useState } from 'react'

interface HtmlOutputProps {
  html: string
}

export function HtmlOutput({ html }: HtmlOutputProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Generierter HTML-Code</CardTitle>
          <Button variant="secondary" size="sm" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Kopiert
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Kopieren
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-4 p-4 bg-[var(--bg-2)] rounded-[var(--radius-md)] max-h-96 overflow-y-auto">
          <pre className="text-xs text-[var(--fg-2)] whitespace-pre-wrap font-mono">
            <code>{html}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}
