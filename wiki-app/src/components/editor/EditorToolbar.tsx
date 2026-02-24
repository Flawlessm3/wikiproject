'use client'

import Link from 'next/link'
import { Save, Loader2, AlertCircle, CheckCircle, Layout, Navigation, Settings, Download } from 'lucide-react'
import { useWikiStore, selectHasUnsavedChanges, selectIsSaving } from '@/store/wikiStore'
import { cn } from '@/lib/utils'

/**
 * EditorToolbar — floating bottom bar shown when editor mode is active.
 * Shows save status + links to editor screens.
 */
export function EditorToolbar() {
  const { saveWikiData, saveError } = useWikiStore()
  const hasUnsavedChanges = useWikiStore(selectHasUnsavedChanges)
  const isSaving = useWikiStore(selectIsSaving)

  return (
    <div className={cn(
      'fixed bottom-0 left-0 right-0 z-50',
      'h-12 flex items-center gap-3 px-4',
      'bg-bg-surface border-t border-accent/30',
      'shadow-[0_-2px_20px_rgba(0,0,0,0.3)]',
    )}>
      {/* Status indicator */}
      <div className="flex items-center gap-2 text-xs min-w-[160px]">
        {isSaving ? (
          <>
            <Loader2 size={12} className="animate-spin text-accent" />
            <span className="text-text-muted">Сохранение…</span>
          </>
        ) : saveError ? (
          <>
            <AlertCircle size={12} className="text-red-500" />
            <span className="text-red-400 truncate max-w-[140px]">Ошибка сохранения</span>
          </>
        ) : hasUnsavedChanges ? (
          <>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400">Несохранённые изменения</span>
          </>
        ) : (
          <>
            <CheckCircle size={12} className="text-emerald-500" />
            <span className="text-text-muted">Сохранено</span>
          </>
        )}
      </div>

      {/* Save button */}
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

      <div className="w-px h-6 bg-border mx-1" />

      {/* Editor links */}
      <nav className="flex items-center gap-1" aria-label="Редактор">
        <Link
          href="/editor"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
        >
          <Layout size={12} />
          Дашборд
        </Link>
        <Link
          href="/editor/navigation"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
        >
          <Navigation size={12} />
          Навигация
        </Link>
        <Link
          href="/editor/settings"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
        >
          <Settings size={12} />
          Настройки
        </Link>
        <Link
          href="/editor/export"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
        >
          <Download size={12} />
          Экспорт
        </Link>
      </nav>

      <div className="ml-auto flex items-center gap-1 text-[10px] text-text-disabled">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        Режим редактирования
      </div>
    </div>
  )
}
