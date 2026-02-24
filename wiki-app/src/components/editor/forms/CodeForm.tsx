'use client'

import { useState } from 'react'
import { useWikiStore } from '@/store/wikiStore'
import { FormField, inputCls, selectCls } from '../shared/FormField'

const LANGUAGES = [
  '', 'bash', 'shell', 'javascript', 'typescript', 'tsx', 'jsx',
  'python', 'java', 'kotlin', 'go', 'rust', 'cpp', 'c', 'csharp',
  'php', 'ruby', 'swift', 'yaml', 'json', 'toml', 'xml', 'html',
  'css', 'scss', 'sql', 'graphql', 'dockerfile', 'nginx', 'apache',
  'properties', 'ini', 'diff', 'markdown', 'text',
]

interface Props {
  block: { id: string; type: 'code'; language?: string; filename?: string; content: string }
  slug: string
  onClose: () => void
}

export function CodeForm({ block, slug, onClose }: Props) {
  const { updateBlock } = useWikiStore()
  const [language, setLanguage] = useState(block.language ?? '')
  const [filename, setFilename] = useState(block.filename ?? '')
  const [content, setContent] = useState(block.content)

  function handleSave() {
    updateBlock(slug, block.id, {
      language: language || undefined,
      filename: filename || undefined,
      content,
    })
    onClose()
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Язык">
          <select
            className={selectCls}
            value={language}
            onChange={e => setLanguage(e.target.value)}
          >
            <option value="">Без подсветки</option>
            {LANGUAGES.filter(Boolean).map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Имя файла" hint="Необязательно">
          <input
            className={inputCls}
            value={filename}
            onChange={e => setFilename(e.target.value)}
            placeholder="config.yml"
          />
        </FormField>
      </div>

      <FormField label="Код" required>
        <textarea
          className="w-full px-3 py-2 text-sm bg-bg-base border border-border rounded-md text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors resize-y font-mono leading-relaxed"
          style={{ minHeight: 200 }}
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="// Введите код..."
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
