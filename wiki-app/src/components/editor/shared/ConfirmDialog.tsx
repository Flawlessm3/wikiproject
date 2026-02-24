'use client'

import { AlertTriangle } from 'lucide-react'
import { Dialog } from './Dialog'
import { cn } from '@/lib/utils'

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Подтвердить',
  cancelLabel = 'Отмена',
  destructive = false,
}: ConfirmDialogProps) {
  function handleConfirm() {
    onConfirm()
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="sm"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleConfirm}
            className={cn(
              'px-4 py-2 text-sm rounded-md font-medium transition-colors',
              destructive
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-accent text-white hover:bg-accent-hover'
            )}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex gap-3">
        {destructive && (
          <AlertTriangle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
        )}
        <p className="text-sm text-text-secondary leading-relaxed">{message}</p>
      </div>
    </Dialog>
  )
}
