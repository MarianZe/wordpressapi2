'use client'

import { Upload } from 'lucide-react'
import { useCallback, useState } from 'react'
import { cn } from '@/lib/utils'

interface UploadZoneProps {
  onFileSelect: (file: File) => void
  accept?: string
}

export function UploadZone({
  onFileSelect,
  accept = '.doc,.docx,.txt',
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true)
    } else if (e.type === 'dragleave') {
      setIsDragging(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        onFileSelect(files[0])
      }
    },
    [onFileSelect]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        onFileSelect(files[0])
      }
    },
    [onFileSelect]
  )

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={cn(
        'relative border-2 border-dashed rounded-[var(--radius-lg)] p-12 transition-colors',
        isDragging
          ? 'border-[var(--accent)] bg-[var(--accent)]/10'
          : 'border-[var(--border)] bg-[var(--bg-1)]'
      )}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        <Upload
          className={cn(
            'w-12 h-12 mb-4 transition-colors',
            isDragging ? 'text-[var(--accent)]' : 'text-[var(--fg-3)]'
          )}
        />
        <p className="text-lg font-medium text-[var(--fg-1)] mb-2">
          Datei hochladen
        </p>
        <p className="text-sm text-[var(--fg-3)]">
          Ziehe eine Datei hierher oder klicke zum Auswählen
        </p>
        <p className="text-xs text-[var(--fg-3)] mt-2">
          Unterstützte Formate: .doc, .docx, .txt
        </p>
      </label>
    </div>
  )
}
