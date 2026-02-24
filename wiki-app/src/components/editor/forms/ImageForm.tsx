'use client'

import { useState } from 'react'
import { useWikiStore } from '@/store/wikiStore'
import { FormField, inputCls } from '../shared/FormField'

interface Props {
  block: { id: string; type: 'image'; src: string; alt: string; caption?: string }
  slug: string
  onClose: () => void
}

export function ImageForm({ block, slug, onClose }: Props) {
  const { updateBlock } = useWikiStore()
  const [src, setSrc] = useState(block.src)
  const [alt, setAlt] = useState(block.alt)
  const [caption, setCaption] = useState(block.caption ?? '')

  function handleSave() {
    updateBlock(slug, block.id, { src, alt, caption: caption || undefined })
    onClose()
  }

  return (
    <div className="space-y-4">
      <FormField label="URL изображения" required>
        <input
          className={inputCls}
          value={src}
          onChange={e => setSrc(e.target.value)}
          placeholder="https://example.com/image.png"
          autoFocus
        />
      </FormField>

      {src && (
        <div className="rounded-md overflow-hidden border border-border bg-bg-base p-2">
          <img src={src} alt={alt || 'Preview'} className="max-h-48 mx-auto object-contain" />
        </div>
      )}

      <FormField label="Alt-текст" required hint="Описание изображения для доступности">
        <input
          className={inputCls}
          value={alt}
          onChange={e => setAlt(e.target.value)}
          placeholder="Описание изображения"
        />
      </FormField>

      <FormField label="Подпись" hint="Необязательно">
        <input
          className={inputCls}
          value={caption}
          onChange={e => setCaption(e.target.value)}
          placeholder="Подпись под изображением..."
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
