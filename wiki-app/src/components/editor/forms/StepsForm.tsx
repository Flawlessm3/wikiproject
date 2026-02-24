'use client'

import { useState } from 'react'
import { useWikiStore } from '@/store/wikiStore'
import { FormField, inputCls, textareaCls } from '../shared/FormField'
import { DynamicList } from '../shared/DynamicList'
import type { StepItem } from '@/types/wiki'

interface Props {
  block: { id: string; type: 'steps'; title?: string; items: StepItem[] }
  slug: string
  onClose: () => void
}

export function StepsForm({ block, slug, onClose }: Props) {
  const { updateBlock } = useWikiStore()
  const [title, setTitle] = useState(block.title ?? '')
  const [items, setItems] = useState<StepItem[]>(block.items.map(i => ({ ...i })))

  function handleSave() {
    updateBlock(slug, block.id, { title: title || undefined, items })
    onClose()
  }

  function addItem() {
    setItems(prev => [...prev, { title: '' }])
  }

  function removeItem(index: number) {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  function updateItem(index: number, patch: Partial<StepItem>) {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, ...patch } : item))
  }

  return (
    <div className="space-y-4">
      <FormField label="Заголовок блока" hint="Необязательно">
        <input
          className={inputCls}
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Установка..."
          autoFocus
        />
      </FormField>

      <FormField label="Шаги" required>
        <DynamicList
          items={items}
          onAdd={addItem}
          onRemove={removeItem}
          minItems={1}
          addLabel="Добавить шаг"
          renderItem={(item, index) => (
            <div className="space-y-2 p-3 bg-bg-base border border-border rounded-md">
              <input
                className={inputCls}
                value={item.title}
                onChange={e => updateItem(index, { title: e.target.value })}
                placeholder={`Шаг ${index + 1}: Название...`}
              />
              <textarea
                className={textareaCls}
                value={item.description ?? ''}
                onChange={e => updateItem(index, { description: e.target.value || undefined })}
                placeholder="Описание шага..."
                style={{ minHeight: 60 }}
              />
              <textarea
                className="w-full px-3 py-2 text-sm bg-bg-base border border-border rounded-md text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors resize-y font-mono leading-relaxed"
                value={item.code ?? ''}
                onChange={e => updateItem(index, { code: e.target.value || undefined })}
                placeholder="# Код для этого шага (необязательно)"
                style={{ minHeight: 60 }}
              />
              <input
                className={inputCls + ' text-xs'}
                value={item.note ?? ''}
                onChange={e => updateItem(index, { note: e.target.value || undefined })}
                placeholder="Примечание (необязательно)"
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
