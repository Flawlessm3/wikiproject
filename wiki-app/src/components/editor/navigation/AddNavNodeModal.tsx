'use client'

import { useState } from 'react'
import { useWikiStore } from '@/store/wikiStore'
import { Dialog } from '../shared/Dialog'
import { FormField, inputCls, selectCls } from '../shared/FormField'
import type { NavNodeType } from '@/types/wiki'

interface AddNavNodeModalProps {
  open: boolean
  onClose: () => void
  parentId: string | null
}

export function AddNavNodeModal({ open, onClose, parentId }: AddNavNodeModalProps) {
  const { addNavNode } = useWikiStore()
  const [type, setType] = useState<NavNodeType>('page')
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [href, setHref] = useState('')
  const [external, setExternal] = useState(false)

  function reset() {
    setType('page')
    setTitle('')
    setSlug('')
    setHref('')
    setExternal(false)
  }

  function handleClose() {
    reset()
    onClose()
  }

  function handleAdd() {
    if (!title.trim()) return
    addNavNode(parentId, {
      type,
      title: title.trim(),
      order: 999,
      slug: type === 'page' ? (slug || title.toLowerCase().replace(/\s+/g, '-')) : undefined,
      href: type === 'link' ? href : undefined,
      external: type === 'link' ? external : undefined,
      children: type === 'group' ? [] : undefined,
      collapsible: type === 'group' ? true : undefined,
      defaultOpen: type === 'group' ? true : undefined,
    })
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title="Добавить элемент навигации"
      maxWidth="sm"
      footer={
        <>
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={handleAdd}
            disabled={!title.trim()}
            className="px-4 py-2 text-sm rounded-md font-medium bg-accent text-white hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Добавить
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <FormField label="Тип" required>
          <select
            className={selectCls}
            value={type}
            onChange={e => setType(e.target.value as NavNodeType)}
          >
            <option value="page">Страница</option>
            <option value="group">Группа</option>
            <option value="link">Внешняя ссылка</option>
          </select>
        </FormField>

        <FormField label="Название" required>
          <input
            className={inputCls}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Название элемента..."
            autoFocus
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
          />
        </FormField>

        {type === 'page' && (
          <FormField label="Slug страницы" hint="Оставьте пустым для автогенерации">
            <input
              className={inputCls + ' font-mono'}
              value={slug}
              onChange={e => setSlug(e.target.value)}
              placeholder="wiki/my-page"
            />
          </FormField>
        )}

        {type === 'link' && (
          <>
            <FormField label="URL" required>
              <input
                className={inputCls}
                value={href}
                onChange={e => setHref(e.target.value)}
                placeholder="https://..."
              />
            </FormField>
            <label className="flex items-center gap-2 text-xs text-text-muted cursor-pointer">
              <input
                type="checkbox"
                checked={external}
                onChange={e => setExternal(e.target.checked)}
                className="accent-accent"
              />
              Открывать в новой вкладке
            </label>
          </>
        )}
      </div>
    </Dialog>
  )
}
