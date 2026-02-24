'use client'

import { useState } from 'react'
import { useWikiStore } from '@/store/wikiStore'
import { FormField, inputCls, textareaCls } from '../shared/FormField'

interface Props {
  block: { id: string; type: 'quote'; content: string; author?: string }
  slug: string
  onClose: () => void
}

export function QuoteForm({ block, slug, onClose }: Props) {
  const { updateBlock } = useWikiStore()
  const [content, setContent] = useState(block.content)
  const [author, setAuthor] = useState(block.author ?? '')

  function handleSave() {
    updateBlock(slug, block.id, { content, author: author || undefined })
    onClose()
  }

  return (
    <div className="space-y-4">
      <FormField label="Текст цитаты" required>
        <textarea
          className={textareaCls}
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Текст цитаты..."
          style={{ minHeight: 100 }}
          autoFocus
        />
      </FormField>

      <FormField label="Автор" hint="Необязательно">
        <input
          className={inputCls}
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Имя автора"
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
