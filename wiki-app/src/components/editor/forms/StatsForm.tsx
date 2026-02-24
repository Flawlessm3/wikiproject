'use client'

import { useState } from 'react'
import { useWikiStore } from '@/store/wikiStore'
import { FormField, inputCls } from '../shared/FormField'
import { DynamicList } from '../shared/DynamicList'
import type { StatItem } from '@/types/wiki'

interface Props {
  block: { id: string; type: 'stats'; title?: string; items: StatItem[] }
  slug: string
  onClose: () => void
}

export function StatsForm({ block, slug, onClose }: Props) {
  const { updateBlock } = useWikiStore()
  const [title, setTitle] = useState(block.title ?? '')
  const [items, setItems] = useState<StatItem[]>(block.items.map(i => ({ ...i })))

  function handleSave() {
    updateBlock(slug, block.id, { title: title || undefined, items })
    onClose()
  }

  function addItem() {
    setItems(prev => [...prev, { label: '', value: '' }])
  }

  function removeItem(index: number) {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  function updateItem(index: number, patch: Partial<StatItem>) {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, ...patch } : item))
  }

  return (
    <div className="space-y-4">
      <FormField label="Заголовок блока" hint="Необязательно">
        <input
          className={inputCls}
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Статистика..."
          autoFocus
        />
      </FormField>

      <FormField label="Статистика" required>
        <DynamicList
          items={items}
          onAdd={addItem}
          onRemove={removeItem}
          minItems={1}
          addLabel="Добавить показатель"
          renderItem={(item, index) => (
            <div className="grid grid-cols-3 gap-2">
              <input
                className={inputCls}
                value={item.label}
                onChange={e => updateItem(index, { label: e.target.value })}
                placeholder="Метка"
              />
              <input
                className={inputCls}
                value={item.value}
                onChange={e => updateItem(index, { value: e.target.value })}
                placeholder="Значение"
              />
              <input
                className={inputCls}
                value={item.unit ?? ''}
                onChange={e => updateItem(index, { unit: e.target.value || undefined })}
                placeholder="Единица"
              />
            </div>
          )}
        />
      </FormField>

      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors"
        >
          Отмена
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm rounded-md font-medium bg-accent text-white hover:bg-accent-hover transition-colors"
        >
          Сохранить
        </button>
      </div>
    </div>
  )
}
