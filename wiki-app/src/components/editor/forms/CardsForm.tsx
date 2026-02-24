'use client'

import { useState } from 'react'
import { useWikiStore } from '@/store/wikiStore'
import { FormField, inputCls, textareaCls, selectCls } from '../shared/FormField'
import { DynamicList } from '../shared/DynamicList'
import type { CardItem } from '@/types/wiki'

interface Props {
  block: { id: string; type: 'cards'; columns?: 2 | 3 | 4; items: CardItem[] }
  slug: string
  onClose: () => void
}

export function CardsForm({ block, slug, onClose }: Props) {
  const { updateBlock } = useWikiStore()
  const [columns, setColumns] = useState<2 | 3 | 4>(block.columns ?? 3)
  const [items, setItems] = useState<CardItem[]>(block.items.map(i => ({ ...i })))

  function handleSave() {
    updateBlock(slug, block.id, { columns, items })
    onClose()
  }

  function addItem() {
    setItems(prev => [...prev, { title: '' }])
  }

  function removeItem(index: number) {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  function updateItem(index: number, patch: Partial<CardItem>) {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, ...patch } : item))
  }

  return (
    <div className="space-y-4">
      <FormField label="Количество столбцов">
        <select
          className={selectCls}
          value={columns}
          onChange={e => setColumns(Number(e.target.value) as 2 | 3 | 4)}
        >
          <option value={2}>2 столбца</option>
          <option value={3}>3 столбца</option>
          <option value={4}>4 столбца</option>
        </select>
      </FormField>

      <FormField label="Карточки" required>
        <DynamicList
          items={items}
          onAdd={addItem}
          onRemove={removeItem}
          minItems={1}
          addLabel="Добавить карточку"
          renderItem={(item, index) => (
            <div className="space-y-2 p-3 bg-bg-base border border-border rounded-md">
              <div className="grid grid-cols-2 gap-2">
                <input
                  className={inputCls}
                  value={item.title}
                  onChange={e => updateItem(index, { title: e.target.value })}
                  placeholder="Название карточки"
                />
                <input
                  className={inputCls}
                  value={item.badge ?? ''}
                  onChange={e => updateItem(index, { badge: e.target.value || undefined })}
                  placeholder="Бейдж (необязательно)"
                />
              </div>
              <textarea
                className={textareaCls}
                value={item.description ?? ''}
                onChange={e => updateItem(index, { description: e.target.value || undefined })}
                placeholder="Описание карточки..."
                style={{ minHeight: 60 }}
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  className={inputCls}
                  value={item.href ?? ''}
                  onChange={e => updateItem(index, { href: e.target.value || undefined })}
                  placeholder="Ссылка (необязательно)"
                />
                <input
                  className={inputCls}
                  value={item.icon ?? ''}
                  onChange={e => updateItem(index, { icon: e.target.value || undefined })}
                  placeholder="Иконка (emoji)"
                />
              </div>
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
