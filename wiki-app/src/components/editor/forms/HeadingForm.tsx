'use client'

import { useState } from 'react'
import { useWikiStore } from '@/store/wikiStore'
import { FormField, inputCls, selectCls } from '../shared/FormField'

interface Props {
  block: { id: string; type: 'heading'; level: 2 | 3 | 4; text: string; anchor?: string }
  slug: string
  onClose: () => void
}

export function HeadingForm({ block, slug, onClose }: Props) {
  const { updateBlock } = useWikiStore()
  const [text, setText] = useState(block.text)
  const [level, setLevel] = useState<2 | 3 | 4>(block.level)
  const [anchor, setAnchor] = useState(block.anchor ?? '')

  function handleSave() {
    updateBlock(slug, block.id, { text, level, anchor: anchor || undefined })
    onClose()
  }

  return (
    <div className="space-y-4">
      <FormField label="Уровень заголовка" required>
        <select
          className={selectCls}
          value={level}
          onChange={e => setLevel(Number(e.target.value) as 2 | 3 | 4)}
        >
          <option value={2}>H2 — Основной раздел</option>
          <option value={3}>H3 — Подраздел</option>
          <option value={4}>H4 — Подподраздел</option>
        </select>
      </FormField>

      <FormField label="Текст заголовка" required>
        <input
          className={inputCls}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Текст заголовка..."
          autoFocus
        />
      </FormField>

      <FormField label="Якорь (anchor)" hint="Используется для ссылок на раздел. Оставьте пустым для автогенерации.">
        <input
          className={inputCls}
          value={anchor}
          onChange={e => setAnchor(e.target.value)}
          placeholder="my-section-anchor"
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
