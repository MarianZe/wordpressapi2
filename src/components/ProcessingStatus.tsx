'use client'

import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProcessingStatusProps {
  status: 'pending' | 'processing' | 'completed' | 'failed'
}

export function ProcessingStatus({ status }: ProcessingStatusProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] border',
        {
          'border-[var(--border)] bg-[var(--bg-2)]': status === 'pending',
          'border-[var(--accent)] bg-[var(--accent)]/10':
            status === 'processing',
          'border-[var(--success)] bg-[var(--success)]/10':
            status === 'completed',
          'border-[var(--danger)] bg-[var(--danger)]/10': status === 'failed',
        }
      )}
    >
      {status === 'pending' && (
        <>
          <div className="w-5 h-5 rounded-full border-2 border-[var(--border)]" />
          <span className="text-[var(--fg-2)]">Bereit zur Verarbeitung</span>
        </>
      )}
      {status === 'processing' && (
        <>
          <Loader2 className="w-5 h-5 text-[var(--accent)] animate-spin" />
          <span className="text-[var(--fg-1)]">Wird verarbeitet...</span>
        </>
      )}
      {status === 'completed' && (
        <>
          <CheckCircle className="w-5 h-5 text-[var(--success)]" />
          <span className="text-[var(--fg-1)]">Erfolgreich verarbeitet</span>
        </>
      )}
      {status === 'failed' && (
        <>
          <XCircle className="w-5 h-5 text-[var(--danger)]" />
          <span className="text-[var(--fg-1)]">Verarbeitung fehlgeschlagen</span>
        </>
      )}
    </div>
  )
}
