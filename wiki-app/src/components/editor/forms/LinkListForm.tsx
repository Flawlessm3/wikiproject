'use client'

import { useState } from 'react'
import { useWikiStore } from '@/store/wikiStore'
import { FormField, inputCls } from '../shared/FormField'
import { DynamicList } from '../shared/DynamicList'
import type { LinkListItem } from '@/types/wiki'

interface Props {
  block: { id: string; type: 'linklist'; title?: string; items: LinkListItem[] }
  slug: string
  onClose: () => void
}

export function LinkListForm({ block, slug, onClose }: Props) {
  const { updateBlock } = useWikiStore()
  const [title, setTitle] = useState(block.title ?? '')
  const [items, setItems] = useState<LinkListItem[]>(block.items.map(i => ({ ...i })))

  function handleSave() {
    updateBlock(slug, block.id, { title: title || undefined, items })
    onClose()
  }

  function addItem() {
    setItems(prev => [...prev, { title: '', href: '' }])
  }

  function removeItem(index: number) {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  function updateItem(index: number, patch: Partial<LinkListItem>) {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, ...patch } : item))
  }

  return (
    <div className="space-y-4">
      <FormField label="Заголовок блока" hint="Необязательно">
        <input
          className={inputCls}
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Полезные ссылки..."
          autoFocus
        />
      </FormField>

      <FormField label="Ссылки" required>
        <DynamicList
          items={items}
          onAdd={addItem}
          onRemove={removeItem}
          minItems={1}
          addLabel="Добавить ссылку"
          renderItem={(item, index) => (
            <div className="space-y-2 p-3 bg-bg-base border border-border rounded-md">
              <div className="grid grid-cols-2 gap-2">
                <input
                  className={inputCls}
                  value={item.title}
                  onChange={e => updateItem(index, { title: e.target.value })}
                  placeholder="Название ссылки"
                />
                <input
                  className={inputCls}
                  value={item.href}
                  onChange={e => updateItem(index, { href: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <input
                  className={inputCls}
                  value={item.description ?? ''}
                  onChange={e => updateItem(index, { description: e.target.value || undefined })}
                  placeholder="Описание (необязательно)"
                />
                <label className="flex items-center gap-2 text-xs text-text-muted cursor-pointer px-1">
                  <input
                    type="checkbox"
                    checked={item.external ?? false}
                    onChange={e => updateItem(index, { external: e.target.checked })}
                    className="accent-accent"
                  />
                  Внешняя ссылка
                </label>
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
