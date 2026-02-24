'use client'

import { Plus, Trash2, GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DynamicListProps<T> {
  items: T[]
  onAdd: () => void
  onRemove: (index: number) => void
  onMove?: (from: number, to: number) => void
  renderItem: (item: T, index: number) => React.ReactNode
  addLabel?: string
  className?: string
  minItems?: number
}

export function DynamicList<T>({
  items,
  onAdd,
  onRemove,
  onMove,
  renderItem,
  addLabel = 'Добавить',
  className,
  minItems = 0,
}: DynamicListProps<T>) {
  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 items-start group">
          {onMove && (
            <button
              type="button"
              className="mt-2 p-1 text-text-disabled hover:text-text-muted cursor-grab active:cursor-grabbing flex-shrink-0"
              title="Перетащить"
              aria-label="Перетащить элемент"
            >
              <GripVertical size={14} />
            </button>
          )}

          <div className="flex-1 min-w-0">
            {renderItem(item, index)}
          </div>

          <button
            type="button"
            onClick={() => onRemove(index)}
            disabled={items.length <= minItems}
            className={cn(
              'mt-2 p-1.5 rounded-md transition-colors flex-shrink-0',
              items.length <= minItems
                ? 'text-text-disabled cursor-not-allowed'
                : 'text-text-muted hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100'
            )}
            title="Удалить"
            aria-label="Удалить элемент"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-border rounded-md text-xs text-text-muted hover:text-text-secondary hover:border-border-strong transition-colors"
      >
        <Plus size={12} />
        {addLabel}
      </button>
    </div>
  )
}
