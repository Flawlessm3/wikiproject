'use client'

import { Pencil, Eye } from 'lucide-react'
import { useWikiStore, selectIsEditorMode } from '@/store/wikiStore'
import { cn } from '@/lib/utils'

export function EditorModeToggle() {
  const isEditorMode = useWikiStore(selectIsEditorMode)
  const toggleEditorMode = useWikiStore(s => s.toggleEditorMode)

  return (
    <button
      onClick={toggleEditorMode}
      className={cn(
        'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors border',
        isEditorMode
          ? 'bg-accent text-white border-accent hover:bg-accent-hover'
          : 'text-text-muted bg-bg-elevated border-border hover:text-text-primary hover:border-border-strong'
      )}
      title={isEditorMode ? 'Выйти из режима редактирования' : 'Режим редактирования'}
      aria-label={isEditorMode ? 'Выйти из режима редактирования' : 'Войти в режим редактирования'}
    >
      {isEditorMode ? <Eye size={12} /> : <Pencil size={12} />}
      {isEditorMode ? 'Просмотр' : 'Редактор'}
    </button>
  )
}
