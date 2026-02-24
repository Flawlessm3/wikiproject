'use client'

import { useState } from 'react'
import { useWikiStore } from '@/store/wikiStore'
import { FormField, inputCls, textareaCls } from '../shared/FormField'
import { DynamicList } from '../shared/DynamicList'
import type { FAQItem } from '@/types/wiki'

interface Props {
  block: { id: string; type: 'faq'; title?: string; items: FAQItem[] }
  slug: string
  onClose: () => void
}

export function FAQForm({ block, slug, onClose }: Props) {
  const { updateBlock } = useWikiStore()
  const [title, setTitle] = useState(block.title ?? '')
  const [items, setItems] = useState<FAQItem[]>(block.items.map(i => ({ ...i })))

  function handleSave() {
    updateBlock(slug, block.id, { title: title || undefined, items })
    onClose()
  }

  function addItem() {
    setItems(prev => [...prev, { question: '', answer: '' }])
  }

  function removeItem(index: number) {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  function updateItem(index: number, patch: Partial<FAQItem>) {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, ...patch } : item))
  }

  return (
    <div className="space-y-4">
      <FormField label="Заголовок блока" hint="Необязательно">
        <input
          className={inputCls}
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Часто задаваемые вопросы"
          autoFocus
        />
      </FormField>

      <FormField label="Вопросы и ответы" required>
        <DynamicList
          items={items}
          onAdd={addItem}
          onRemove={removeItem}
          minItems={1}
          addLabel="Добавить вопрос"
          renderItem={(item, index) => (
            <div className="space-y-2 p-3 bg-bg-base border border-border rounded-md">
              <input
                className={inputCls}
                value={item.question}
                onChange={e => updateItem(index, { question: e.target.value })}
                placeholder="Вопрос..."
              />
              <textarea
                className={textareaCls}
                value={item.answer}
                onChange={e => updateItem(index, { answer: e.target.value })}
                placeholder="Ответ..."
                style={{ minHeight: 80 }}
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
