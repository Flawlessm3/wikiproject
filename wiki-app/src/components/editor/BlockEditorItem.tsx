'use client'

import { useState } from 'react'
import { GripVertical, Pencil, Copy, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useWikiStore } from '@/store/wikiStore'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { BlockFormFor } from './forms/BlockFormFor'
import { ConfirmDialog } from './shared/ConfirmDialog'
import { Dialog } from './shared/Dialog'
import { AddBlockMenu } from './AddBlockMenu'
import type { ContentBlock } from '@/types/wiki'
import { cn } from '@/lib/utils'

const BLOCK_TYPE_LABELS: Record<string, string> = {
  paragraph: 'Параграф', heading: 'Заголовок', list: 'Список', table: 'Таблица',
  callout: 'Выноска', code: 'Код', faq: 'FAQ', commands: 'Команды',
  steps: 'Шаги', cards: 'Карточки', fileTree: 'Дерево файлов', permissions: 'Права',
  divider: 'Разделитель', image: 'Изображение', quote: 'Цитата', stats: 'Статистика',
  recipe: 'Рецепт', linklist: 'Ссылки', section: 'Секция', rawmd: 'Markdown',
}

interface BlockEditorItemProps {
  block: ContentBlock
  slug: string
}

export function BlockEditorItem({ block, slug }: BlockEditorItemProps) {
  const { deleteBlock, duplicateBlock } = useWikiStore()
  const [isEditing, setIsEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          'group relative rounded-lg border transition-all',
          isDragging
            ? 'border-accent shadow-lg opacity-80 bg-bg-elevated'
            : 'border-transparent hover:border-border bg-transparent',
        )}
      >
        {/* Block type label + controls (shown on hover) */}
        <div className={cn(
          'absolute -top-px left-0 right-0 flex items-center gap-1 px-2 py-1',
          'opacity-0 group-hover:opacity-100 transition-opacity',
          'bg-bg-surface border border-border rounded-t-lg z-10',
        )}>
          {/* Drag handle */}
          <button
            {...attributes}
            {...listeners}
            className="p-0.5 text-text-disabled hover:text-text-muted cursor-grab active:cursor-grabbing"
            aria-label="Перетащить блок"
          >
            <GripVertical size={13} />
          </button>

          <span className="text-[10px] text-text-disabled uppercase tracking-wide ml-1 flex-1">
            {BLOCK_TYPE_LABELS[block.type] ?? block.type}
          </span>

          {/* Actions */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 rounded text-text-muted hover:text-accent hover:bg-accent/10 transition-colors"
              title="Редактировать"
              aria-label="Редактировать блок"
            >
              <Pencil size={12} />
            </button>
            <button
              onClick={() => duplicateBlock(slug, block.id)}
              className="p-1 rounded text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
              title="Дублировать"
              aria-label="Дублировать блок"
            >
              <Copy size={12} />
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="p-1 rounded text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-colors"
              title="Удалить"
              aria-label="Удалить блок"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>

        {/* Block content */}
        <div className={cn(
          'group-hover:pt-6 transition-all',
          isDragging && 'pt-6',
        )}>
          <BlockRenderer block={block} />
        </div>

        {/* Add block below (shown on hover) */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-1">
          <AddBlockMenu slug={slug} afterId={block.id} compact />
        </div>
      </div>

      {/* Edit dialog */}
      <Dialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        title={`Редактировать: ${BLOCK_TYPE_LABELS[block.type] ?? block.type}`}
        maxWidth="lg"
      >
        <BlockFormFor
          block={block}
          slug={slug}
          onClose={() => setIsEditing(false)}
        />
      </Dialog>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={() => deleteBlock(slug, block.id)}
        title="Удалить блок"
        message={`Удалить блок «${BLOCK_TYPE_LABELS[block.type] ?? block.type}»? Это действие необратимо.`}
        confirmLabel="Удалить"
        destructive
      />
    </>
  )
}
