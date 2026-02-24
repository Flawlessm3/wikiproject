'use client'

import { useState } from 'react'
import { useWikiStore } from '@/store/wikiStore'
import { FormField, inputCls, selectCls } from '../shared/FormField'
import { DynamicList } from '../shared/DynamicList'
import type { ListItem } from '@/types/wiki'

interface Props {
  block: { id: string; type: 'list'; style: 'bullet' | 'ordered' | 'check'; items: ListItem[] }
  slug: string
  onClose: () => void
}

export function ListForm({ block, slug, onClose }: Props) {
  const { updateBlock } = useWikiStore()
  const [style, setStyle] = useState(block.style)
  const [items, setItems] = useState<ListItem[]>(block.items.map(i => ({ ...i })))

  function handleSave() {
    updateBlock(slug, block.id, { style, items })
    onClose()
  }

  function addItem() {
    setItems(prev => [...prev, { text: '' }])
  }

  function removeItem(index: number) {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  function updateItem(index: number, patch: Partial<ListItem>) {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, ...patch } : item))
  }

  return (
    <div className="space-y-4">
      <FormField label="Стиль списка" required>
        <select
          className={selectCls}
          value={style}
          onChange={e => setStyle(e.target.value as 'bullet' | 'ordered' | 'check')}
        >
          <option value="bullet">Маркированный</option>
          <option value="ordered">Нумерованный</option>
          <option value="check">Чеклист</option>
        </select>
      </FormField>

      <FormField label="Элементы списка" required>
        <DynamicList
          items={items}
          onAdd={addItem}
          onRemove={removeItem}
          minItems={1}
          addLabel="Добавить элемент"
          renderItem={(item, index) => (
            <div className="space-y-1">
              <input
                className={inputCls}
                value={item.text}
                onChange={e => updateItem(index, { text: e.target.value })}
                placeholder={`Элемент ${index + 1}...`}
                autoFocus={index === items.length - 1}
              />
              {style === 'check' && (
                <label className="flex items-center gap-2 text-xs text-text-muted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.checked ?? false}
                    onChange={e => updateItem(index, { checked: e.target.checked })}
                    className="accent-accent"
                  />
                  Отмечен
                </label>
              )}
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
