'use client'

import { useState } from 'react'
import { Plus, Trash2, Folder, File } from 'lucide-react'
import { useWikiStore } from '@/store/wikiStore'
import { FormField, inputCls } from '../shared/FormField'
import type { FileTreeNode } from '@/types/wiki'

interface Props {
  block: { id: string; type: 'fileTree'; title?: string; root: FileTreeNode[] }
  slug: string
  onClose: () => void
}

function NodeEditor({
  node,
  onChange,
  onRemove,
  depth = 0,
}: {
  node: FileTreeNode
  onChange: (n: FileTreeNode) => void
  onRemove: () => void
  depth?: number
}) {
  function addChild() {
    onChange({ ...node, children: [...(node.children ?? []), { name: '', type: 'file' }] })
  }
  function updateChild(index: number, child: FileTreeNode) {
    onChange({ ...node, children: (node.children ?? []).map((c, i) => i === index ? child : c) })
  }
  function removeChild(index: number) {
    onChange({ ...node, children: (node.children ?? []).filter((_, i) => i !== index) })
  }

  return (
    <div style={{ marginLeft: depth * 16 }} className="space-y-1">
      <div className="flex items-center gap-2 group">
        <select
          className="text-xs px-1.5 py-1 bg-bg-base border border-border rounded text-text-muted"
          value={node.type}
          onChange={e => onChange({ ...node, type: e.target.value as 'file' | 'dir', children: e.target.value === 'dir' ? (node.children ?? []) : undefined })}
        >
          <option value="file">file</option>
          <option value="dir">dir</option>
        </select>
        <input
          className={inputCls + ' flex-1 text-sm'}
          value={node.name}
          onChange={e => onChange({ ...node, name: e.target.value })}
          placeholder="Имя..."
        />
        <input
          className={inputCls + ' flex-1 text-xs'}
          value={node.description ?? ''}
          onChange={e => onChange({ ...node, description: e.target.value || undefined })}
          placeholder="Описание"
        />
        {node.type === 'dir' && (
          <button type="button" onClick={addChild} className="p-1 text-text-muted hover:text-accent transition-colors">
            <Plus size={13} />
          </button>
        )}
        <button type="button" onClick={onRemove} className="p-1 text-text-muted hover:text-red-400 transition-colors">
          <Trash2 size={13} />
        </button>
      </div>
      {node.type === 'dir' && node.children?.map((child, i) => (
        <NodeEditor
          key={i}
          node={child}
          onChange={c => updateChild(i, c)}
          onRemove={() => removeChild(i)}
          depth={depth + 1}
        />
      ))}
    </div>
  )
}

export function FileTreeForm({ block, slug, onClose }: Props) {
  const { updateBlock } = useWikiStore()
  const [title, setTitle] = useState(block.title ?? '')
  const [root, setRoot] = useState<FileTreeNode[]>(block.root.map(n => ({ ...n })))

  function handleSave() {
    updateBlock(slug, block.id, { title: title || undefined, root })
    onClose()
  }

  function addRoot() {
    setRoot(prev => [...prev, { name: '', type: 'file' }])
  }

  function updateRoot(index: number, node: FileTreeNode) {
    setRoot(prev => prev.map((n, i) => i === index ? node : n))
  }

  function removeRoot(index: number) {
    setRoot(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <FormField label="Заголовок" hint="Необязательно">
        <input
          className={inputCls}
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Структура проекта..."
          autoFocus
        />
      </FormField>

      <FormField label="Дерево файлов">
        <div className="space-y-1 p-3 bg-bg-base border border-border rounded-md">
          {root.map((node, i) => (
            <NodeEditor
              key={i}
              node={node}
              onChange={n => updateRoot(i, n)}
              onRemove={() => removeRoot(i)}
            />
          ))}
          <button
            type="button"
            onClick={addRoot}
            className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-border rounded-md text-xs text-text-muted hover:text-text-secondary transition-colors mt-2"
          >
            <Plus size={12} /> Добавить элемент
          </button>
        </div>
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
