'use client'

import { useState } from 'react'
import { useWikiStore } from '@/store/wikiStore'
import { FormField } from '../shared/FormField'

interface Props {
  block: { id: string; type: 'rawmd'; content: string }
  slug: string
  onClose: () => void
}

export function RawMDForm({ block, slug, onClose }: Props) {
  const { updateBlock } = useWikiStore()
  const [content, setContent] = useState(block.content)

  function handleSave() {
    updateBlock(slug, block.id, { content })
    onClose()
  }

  return (
    <div className="space-y-4">
      <FormField label="Markdown-содержимое" required>
        <textarea
          className="w-full px-3 py-2 text-sm bg-bg-base border border-border rounded-md text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors resize-y font-mono leading-relaxed"
          style={{ minHeight: 240 }}
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="# Markdown

Вы можете использовать **жирный**, *курсив*, `код` и другие элементы Markdown."
          autoFocus
          spellCheck={false}
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
