'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useWikiStore } from '@/store/wikiStore'
import { createBlock } from '@/lib/seedData'
import type { BlockType } from '@/types/wiki'
import { cn } from '@/lib/utils'

const BLOCK_GROUPS: { label: string; types: { type: BlockType; label: string; emoji: string }[] }[] = [
  {
    label: 'Текст',
    types: [
      { type: 'paragraph', label: 'Параграф', emoji: '¶' },
      { type: 'heading', label: 'Заголовок', emoji: 'H' },
      { type: 'list', label: 'Список', emoji: '•' },
      { type: 'quote', label: 'Цитата', emoji: '"' },
      { type: 'rawmd', label: 'Markdown', emoji: 'MD' },
    ],
  },
  {
    label: 'Медиа и структура',
    types: [
      { type: 'image', label: 'Изображение', emoji: '🖼' },
      { type: 'code', label: 'Код', emoji: '</>' },
      { type: 'table', label: 'Таблица', emoji: '⊞' },
      { type: 'divider', label: 'Разделитель', emoji: '—' },
      { type: 'section', label: 'Секция', emoji: '□' },
    ],
  },
  {
    label: 'Контент',
    types: [
      { type: 'callout', label: 'Выноска', emoji: '!' },
      { type: 'cards', label: 'Карточки', emoji: '⊡' },
      { type: 'stats', label: 'Статистика', emoji: '📊' },
      { type: 'linklist', label: 'Ссылки', emoji: '🔗' },
    ],
  },
  {
    label: 'Вики',
    types: [
      { type: 'faq', label: 'FAQ', emoji: '?' },
      { type: 'steps', label: 'Шаги', emoji: '1.' },
      { type: 'commands', label: 'Команды', emoji: '/' },
      { type: 'permissions', label: 'Права', emoji: '🔑' },
      { type: 'fileTree', label: 'Дерево файлов', emoji: '📁' },
      { type: 'recipe', label: 'Рецепт', emoji: '⚗' },
    ],
  },
]

interface AddBlockMenuProps {
  slug: string
  afterId?: string
  compact?: boolean
}

export function AddBlockMenu({ slug, afterId, compact = false }: AddBlockMenuProps) {
  const [open, setOpen] = useState(false)
  const { addBlock } = useWikiStore()

  function handleAdd(type: BlockType) {
    const block = createBlock(type)
    addBlock(slug, block, afterId)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className={cn(
          'flex items-center gap-1 text-text-muted hover:text-accent transition-colors',
          compact
            ? 'p-1 rounded hover:bg-bg-hover'
            : 'w-full justify-center py-2 border border-dashed border-border rounded-lg hover:border-accent/50 hover:bg-accent/5 text-xs'
        )}
        title="Добавить блок"
        aria-label="Добавить блок"
      >
        <Plus size={compact ? 14 : 12} />
        {!compact && 'Добавить блок'}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className={cn(
            'absolute z-50 mt-1 rounded-xl border border-border bg-bg-surface shadow-2xl p-3',
            'w-72',
            compact ? 'left-0' : 'left-1/2 -translate-x-1/2',
          )}>
            <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-2 px-1">
              Выберите тип блока
            </p>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {BLOCK_GROUPS.map(group => (
                <div key={group.label}>
                  <p className="text-[10px] text-text-disabled uppercase tracking-wider mb-1 px-1">{group.label}</p>
                  <div className="grid grid-cols-2 gap-1">
                    {group.types.map(({ type, label, emoji }) => (
                      <button
                        key={type}
                        onClick={() => handleAdd(type)}
                        className="flex items-center gap-2 px-2 py-2 rounded-md text-xs text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors text-left"
                      >
                        <span className="text-base w-5 text-center flex-shrink-0">{emoji}</span>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
