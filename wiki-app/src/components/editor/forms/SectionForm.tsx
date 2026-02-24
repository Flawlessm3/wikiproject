'use client'

import { useState } from 'react'
import { useWikiStore } from '@/store/wikiStore'
import { FormField, inputCls, textareaCls } from '../shared/FormField'

interface Props {
  block: { id: string; type: 'section'; title: string; description?: string; children: unknown[] }
  slug: string
  onClose: () => void
}

export function SectionForm({ block, slug, onClose }: Props) {
  const { updateBlock } = useWikiStore()
  const [title, setTitle] = useState(block.title)
  const [description, setDescription] = useState(block.description ?? '')

  function handleSave() {
    updateBlock(slug, block.id, { title, description: description || undefined })
    onClose()
  }

  return (
    <div className="space-y-4">
      <FormField label="Название секции" required>
        <input
          className={inputCls}
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Название секции..."
          autoFocus
        />
      </FormField>

      <FormField label="Описание" hint="Необязательно">
        <textarea
          className={textareaCls}
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Краткое описание секции..."
          style={{ minHeight: 80 }}
        />
      </FormField>

      <p className="text-xs text-text-muted bg-bg-base border border-border rounded-md p-3">
        Дочерние блоки секции редактируются в режиме просмотра блоков внутри секции.
      </p>

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
