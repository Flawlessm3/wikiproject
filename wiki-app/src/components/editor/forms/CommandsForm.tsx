'use client'

import { useState } from 'react'
import { useWikiStore } from '@/store/wikiStore'
import { FormField, inputCls, selectCls } from '../shared/FormField'
import { DynamicList } from '../shared/DynamicList'
import type { CommandItem } from '@/types/wiki'

interface Props {
  block: { id: string; type: 'commands'; title?: string; category?: string; items: CommandItem[] }
  slug: string
  onClose: () => void
}

export function CommandsForm({ block, slug, onClose }: Props) {
  const { updateBlock } = useWikiStore()
  const [title, setTitle] = useState(block.title ?? '')
  const [category, setCategory] = useState(block.category ?? '')
  const [items, setItems] = useState<CommandItem[]>(block.items.map(i => ({ ...i })))

  function handleSave() {
    updateBlock(slug, block.id, {
      title: title || undefined,
      category: category || undefined,
      items,
    })
    onClose()
  }

  function addItem() {
    setItems(prev => [...prev, { command: '', description: '' }])
  }

  function removeItem(index: number) {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  function updateItem(index: number, patch: Partial<CommandItem>) {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, ...patch } : item))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Заголовок блока" hint="Необязательно">
          <input
            className={inputCls}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Команды..."
            autoFocus
          />
        </FormField>
        <FormField label="Категория" hint="Необязательно">
          <input
            className={inputCls}
            value={category}
            onChange={e => setCategory(e.target.value)}
            placeholder="Например: Основные"
          />
        </FormField>
      </div>

      <FormField label="Команды" required>
        <DynamicList
          items={items}
          onAdd={addItem}
          onRemove={removeItem}
          minItems={1}
          addLabel="Добавить команду"
          renderItem={(item, index) => (
            <div className="space-y-2 p-3 bg-bg-base border border-border rounded-md">
              <div className="grid grid-cols-2 gap-2">
                <input
                  className={inputCls + ' font-mono'}
                  value={item.command}
                  onChange={e => updateItem(index, { command: e.target.value })}
                  placeholder="/команда"
                />
                <input
                  className={inputCls}
                  value={item.description}
                  onChange={e => updateItem(index, { description: e.target.value })}
                  placeholder="Описание"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  className={inputCls + ' font-mono text-xs'}
                  value={item.usage ?? ''}
                  onChange={e => updateItem(index, { usage: e.target.value || undefined })}
                  placeholder="/команда [аргумент]"
                />
                <input
                  className={inputCls + ' text-xs'}
                  value={item.permission ?? ''}
                  onChange={e => updateItem(index, { permission: e.target.value || undefined })}
                  placeholder="plugin.command"
                />
              </div>
              <select
                className={selectCls + ' text-xs'}
                value={item.permissionDefault ?? ''}
                onChange={e => updateItem(index, { permissionDefault: (e.target.value || undefined) as CommandItem['permissionDefault'] })}
              >
                <option value="">Права по умолчанию...</option>
                <option value="all">Все игроки</option>
                <option value="op">Только OP</option>
                <option value="none">Никто</option>
              </select>
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
