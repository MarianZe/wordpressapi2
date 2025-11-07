'use client'

import { Download } from 'lucide-react'
import { Button } from './Button'

interface ExportButtonProps {
  articleId: string
  filename: string
  format: 'docx' | 'txt'
  disabled?: boolean
}

export function ExportButton({
  articleId,
  filename,
  format,
  disabled,
}: ExportButtonProps) {
  const handleExport = () => {
    // This will be connected to API in Phase 2
    console.log(`Exporting ${filename} as ${format}`)
    alert(`Export-Funktion wird in Phase 2 implementiert`)
  }

  return (
    <Button onClick={handleExport} disabled={disabled}>
      <Download className="w-4 h-4 mr-2" />
      Als {format.toUpperCase()} exportieren
    </Button>
  )
}
