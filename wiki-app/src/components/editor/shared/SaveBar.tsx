'use client'

import { Save, Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import { useWikiStore, selectHasUnsavedChanges, selectIsSaving } from '@/store/wikiStore'
import { cn } from '@/lib/utils'

interface SaveBarProps {
  className?: string
}

export function SaveBar({ className }: SaveBarProps) {
  const { saveWikiData, saveError } = useWikiStore()
  const hasUnsavedChanges = useWikiStore(selectHasUnsavedChanges)
  const isSaving = useWikiStore(selectIsSaving)

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Status */}
      <div className="flex items-center gap-1.5 text-xs">
        {isSaving ? (
          <><Loader2 size={12} className="animate-spin text-accent" /><span className="text-text-muted">Сохранение…</span></>
        ) : saveError ? (
          <><AlertCircle size={12} className="text-red-400" /><span className="text-red-400">Ошибка</span></>
        ) : hasUnsavedChanges ? (
          <><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /><span className="text-amber-400">Несохранено</span></>
        ) : (
          <><CheckCircle size={12} className="text-emerald-500" /><span className="text-text-muted">Сохранено</span></>
        )}
      </div>

      {/* Button */}
      <button
        onClick={() => saveWikiData()}
        disabled={!hasUnsavedChanges || isSaving}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
          hasUnsavedChanges && !isSaving
            ? 'bg-accent text-white hover:bg-accent-hover'
            : 'bg-bg-elevated text-text-disabled cursor-not-allowed border border-border'
        )}
      >
        <Save size={12} />
        Сохранить
      </button>
    </div>
  )
}
