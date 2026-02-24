'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useWikiStore } from '@/store/wikiStore'
import { FormField, inputCls } from '../shared/FormField'

interface Props {
  block: { id: string; type: 'table'; headers: string[]; rows: string[][]; caption?: string }
  slug: string
  onClose: () => void
}

export function TableForm({ block, slug, onClose }: Props) {
  const { updateBlock } = useWikiStore()
  const [headers, setHeaders] = useState<string[]>([...block.headers])
  const [rows, setRows] = useState<string[][]>(block.rows.map(r => [...r]))
  const [caption, setCaption] = useState(block.caption ?? '')

  function handleSave() {
    updateBlock(slug, block.id, { headers, rows, caption: caption || undefined })
    onClose()
  }

  function addColumn() {
    setHeaders(prev => [...prev, ''])
    setRows(prev => prev.map(r => [...r, '']))
  }

  function removeColumn(colIdx: number) {
    if (headers.length <= 1) return
    setHeaders(prev => prev.filter((_, i) => i !== colIdx))
    setRows(prev => prev.map(r => r.filter((_, i) => i !== colIdx)))
  }

  function addRow() {
    setRows(prev => [...prev, Array(headers.length).fill('')])
  }

  function removeRow(rowIdx: number) {
    setRows(prev => prev.filter((_, i) => i !== rowIdx))
  }

  function updateHeader(colIdx: number, value: string) {
    setHeaders(prev => prev.map((h, i) => i === colIdx ? value : h))
  }

  function updateCell(rowIdx: number, colIdx: number, value: string) {
    setRows(prev => prev.map((row, ri) =>
      ri === rowIdx ? row.map((cell, ci) => ci === colIdx ? value : cell) : row
    ))
  }

  return (
    <div className="space-y-4">
      <FormField label="Заголовки столбцов">
        <div className="flex gap-2 flex-wrap">
          {headers.map((h, ci) => (
            <div key={ci} className="flex gap-1 items-center flex-1 min-w-[120px]">
              <input
                className={inputCls}
                value={h}
                onChange={e => updateHeader(ci, e.target.value)}
                placeholder={`Столбец ${ci + 1}`}
              />
              {headers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeColumn(ci)}
                  className="p-1.5 text-text-muted hover:text-red-400 hover:bg-red-400/10 rounded transition-colors flex-shrink-0"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addColumn}
            className="px-3 py-2 text-xs border border-dashed border-border rounded-md text-text-muted hover:text-text-secondary hover:border-border-strong transition-colors flex items-center gap-1"
          >
            <Plus size={12} /> Столбец
          </button>
        </div>
      </FormField>

      <FormField label="Строки">
        <div className="space-y-2 overflow-x-auto">
          {rows.map((row, ri) => (
            <div key={ri} className="flex gap-2 items-center">
              {row.map((cell, ci) => (
                <input
                  key={ci}
                  className={inputCls + ' flex-1 min-w-[80px]'}
                  value={cell}
                  onChange={e => updateCell(ri, ci, e.target.value)}
                  placeholder={`Ячейка ${ri + 1}×${ci + 1}`}
                />
              ))}
              <button
                type="button"
                onClick={() => removeRow(ri)}
                className="p-1.5 text-text-muted hover:text-red-400 hover:bg-red-400/10 rounded transition-colors flex-shrink-0"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRow}
            className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-border rounded-md text-xs text-text-muted hover:text-text-secondary hover:border-border-strong transition-colors"
          >
            <Plus size={12} /> Добавить строку
          </button>
        </div>
      </FormField>

      <FormField label="Подпись" hint="Необязательно">
        <input
          className={inputCls}
          value={caption}
          onChange={e => setCaption(e.target.value)}
          placeholder="Подпись к таблице..."
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
