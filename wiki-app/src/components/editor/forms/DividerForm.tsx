'use client'

import { useWikiStore } from '@/store/wikiStore'

interface Props {
  block: { id: string; type: 'divider' }
  slug: string
  onClose: () => void
}

export function DividerForm({ block, slug, onClose }: Props) {
  return (
    <div className="space-y-4">
      <div className="py-4 flex items-center gap-4">
        <div className="flex-1 border-t border-border" />
        <span className="text-xs text-text-disabled">Разделитель</span>
        <div className="flex-1 border-t border-border" />
      </div>
      <p className="text-sm text-text-muted text-center">
        Этот блок не имеет настраиваемых параметров.
      </p>
      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors"
        >
          Закрыть
        </button>
      </div>
    </div>
  )
}
