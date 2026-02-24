'use client'

import { useState } from 'react'
import { useWikiStore } from '@/store/wikiStore'
import { FormField, textareaCls } from '../shared/FormField'

interface Props {
  block: { id: string; type: 'paragraph'; content: string }
  slug: string
  onClose: () => void
}

export function ParagraphForm({ block, slug, onClose }: Props) {
  const { updateBlock } = useWikiStore()
  const [content, setContent] = useState(block.content)

  function handleSave() {
    updateBlock(slug, block.id, { content })
    onClose()
  }

  return (
    <div className="space-y-4">
      <FormField label="Текст" required>
        <textarea
          className={textareaCls}
          style={{ minHeight: 140 }}
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Введите текст параграфа..."
          autoFocus
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
