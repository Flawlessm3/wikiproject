'use client'

import { useState } from 'react'
import { useWikiStore } from '@/store/wikiStore'
import { FormField, inputCls, textareaCls, selectCls } from '../shared/FormField'
import type { CalloutVariant } from '@/types/wiki'

interface Props {
  block: { id: string; type: 'callout'; variant: CalloutVariant; title?: string; content: string }
  slug: string
  onClose: () => void
}

export function CalloutForm({ block, slug, onClose }: Props) {
  const { updateBlock } = useWikiStore()
  const [variant, setVariant] = useState<CalloutVariant>(block.variant)
  const [title, setTitle] = useState(block.title ?? '')
  const [content, setContent] = useState(block.content)

  function handleSave() {
    updateBlock(slug, block.id, { variant, title: title || undefined, content })
    onClose()
  }

  return (
    <div className="space-y-4">
      <FormField label="Тип выноски" required>
        <select
          className={selectCls}
          value={variant}
          onChange={e => setVariant(e.target.value as CalloutVariant)}
        >
          <option value="info">Информация</option>
          <option value="tip">Совет</option>
          <option value="warning">Предупреждение</option>
          <option value="danger">Опасность</option>
          <option value="note">Заметка</option>
        </select>
      </FormField>

      <FormField label="Заголовок" hint="Необязательно">
        <input
          className={inputCls}
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Заголовок выноски..."
          autoFocus
        />
      </FormField>

      <FormField label="Текст" required>
        <textarea
          className={textareaCls}
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Текст выноски..."
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
