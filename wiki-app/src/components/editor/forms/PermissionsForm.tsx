'use client'

import { useState } from 'react'
import { useWikiStore } from '@/store/wikiStore'
import { FormField, inputCls, textareaCls, selectCls } from '../shared/FormField'
import { DynamicList } from '../shared/DynamicList'
import type { PermissionItem } from '@/types/wiki'

interface Props {
  block: { id: string; type: 'permissions'; title?: string; items: PermissionItem[] }
  slug: string
  onClose: () => void
}

export function PermissionsForm({ block, slug, onClose }: Props) {
  const { updateBlock } = useWikiStore()
  const [title, setTitle] = useState(block.title ?? '')
  const [items, setItems] = useState<PermissionItem[]>(block.items.map(i => ({ ...i })))

  function handleSave() {
    updateBlock(slug, block.id, { title: title || undefined, items })
    onClose()
  }

  function addItem() {
    setItems(prev => [...prev, { node: '', description: '', default: 'op' }])
  }

  function removeItem(index: number) {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  function updateItem(index: number, patch: Partial<PermissionItem>) {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, ...patch } : item))
  }

  return (
    <div className="space-y-4">
      <FormField label="Заголовок блока" hint="Необязательно">
        <input
          className={inputCls}
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Права доступа..."
          autoFocus
        />
      </FormField>

      <FormField label="Права" required>
        <DynamicList
          items={items}
          onAdd={addItem}
          onRemove={removeItem}
          minItems={1}
          addLabel="Добавить право"
          renderItem={(item, index) => (
            <div className="space-y-2 p-3 bg-bg-base border border-border rounded-md">
              <div className="grid grid-cols-2 gap-2">
                <input
                  className={inputCls + ' font-mono text-xs'}
                  value={item.node}
                  onChange={e => updateItem(index, { node: e.target.value })}
                  placeholder="plugin.permission.node"
                />
                <select
                  className={selectCls}
                  value={item.default}
                  onChange={e => updateItem(index, { default: e.target.value as PermissionItem['default'] })}
                >
                  <option value="all">Все игроки</option>
                  <option value="op">Только OP</option>
                  <option value="none">Никто</option>
                </select>
              </div>
              <input
                className={inputCls}
                value={item.description}
                onChange={e => updateItem(index, { description: e.target.value })}
                placeholder="Описание права..."
              />
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
