'use client'

import { useState } from 'react'
import {
  ChevronDown, ChevronRight, Plus, Pencil, Trash2,
  ArrowUp, ArrowDown, FileText, FolderOpen, ExternalLink,
} from 'lucide-react'
import { useWikiStore } from '@/store/wikiStore'
import { ConfirmDialog } from '../shared/ConfirmDialog'
import { AddNavNodeModal } from './AddNavNodeModal'
import { FormField, inputCls, selectCls } from '../shared/FormField'
import { cn } from '@/lib/utils'
import type { NavNode } from '@/types/wiki'

const TYPE_ICONS = {
  page: FileText,
  group: FolderOpen,
  link: ExternalLink,
}

interface NavNodeItemProps {
  node: NavNode
  depth?: number
  isFirst: boolean
  isLast: boolean
}

export function NavNodeItem({ node, depth = 0, isFirst, isLast }: NavNodeItemProps) {
  const { updateNavNode, deleteNavNode, moveNavNodeUp, moveNavNodeDown } = useWikiStore()
  const [expanded, setExpanded] = useState(true)
  const [editing, setEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [addingChild, setAddingChild] = useState(false)

  // Edit form state
  const [editTitle, setEditTitle] = useState(node.title)
  const [editSlug, setEditSlug] = useState(node.slug ?? '')
  const [editHref, setEditHref] = useState(node.href ?? '')
  const [editBadge, setEditBadge] = useState(node.badge ?? '')
  const [editHidden, setEditHidden] = useState(node.hidden ?? false)

  const Icon = TYPE_ICONS[node.type]
  const hasChildren = node.type === 'group' && (node.children?.length ?? 0) > 0

  function handleSaveEdit() {
    updateNavNode(node.id, {
      title: editTitle,
      slug: node.type === 'page' ? (editSlug || undefined) : undefined,
      href: node.type === 'link' ? (editHref || undefined) : undefined,
      badge: editBadge || undefined,
      hidden: editHidden || undefined,
    })
    setEditing(false)
  }

  return (
    <div>
      <div
        style={{ paddingLeft: depth * 20 }}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg group',
          editing ? 'bg-bg-elevated border border-accent/30' : 'hover:bg-bg-hover',
        )}
      >
        {/* Expand toggle for groups */}
        {node.type === 'group' ? (
          <button
            onClick={() => setExpanded(v => !v)}
            className="p-0.5 text-text-muted hover:text-text-secondary transition-colors flex-shrink-0"
          >
            {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        ) : (
          <span className="w-5 flex-shrink-0" />
        )}

        <Icon size={14} className="text-text-muted flex-shrink-0" />

        {editing ? (
          <div className="flex-1 space-y-2 py-1">
            <input
              className={inputCls + ' text-xs'}
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              placeholder="Название"
              autoFocus
            />
            {node.type === 'page' && (
              <input
                className={inputCls + ' text-xs font-mono'}
                value={editSlug}
                onChange={e => setEditSlug(e.target.value)}
                placeholder="slug/страницы"
              />
            )}
            {node.type === 'link' && (
              <input
                className={inputCls + ' text-xs'}
                value={editHref}
                onChange={e => setEditHref(e.target.value)}
                placeholder="https://..."
              />
            )}
            <div className="flex items-center gap-3">
              <input
                className={inputCls + ' text-xs flex-1'}
                value={editBadge}
                onChange={e => setEditBadge(e.target.value)}
                placeholder="Бейдж"
              />
              <label className="flex items-center gap-1.5 text-xs text-text-muted cursor-pointer flex-shrink-0">
                <input
                  type="checkbox"
                  checked={editHidden}
                  onChange={e => setEditHidden(e.target.checked)}
                  className="accent-accent"
                />
                Скрыт
              </label>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSaveEdit}
                className="px-3 py-1 text-xs font-medium bg-accent text-white rounded transition-colors hover:bg-accent-hover"
              >
                Сохранить
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-3 py-1 text-xs text-text-muted hover:text-text-secondary transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        ) : (
          <>
            <span className="flex-1 text-sm text-text-primary truncate">
              {node.title}
              {node.badge && (
                <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-accent/15 text-accent font-medium">{node.badge}</span>
              )}
              {node.hidden && (
                <span className="ml-2 text-[10px] text-text-disabled">(скрыт)</span>
              )}
            </span>

            {node.type === 'page' && node.slug && (
              <span className="text-[11px] text-text-disabled font-mono truncate max-w-[120px] flex-shrink-0">
                {node.slug}
              </span>
            )}

            {/* Actions (shown on hover) */}
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
              {node.type === 'group' && (
                <button
                  onClick={() => setAddingChild(true)}
                  className="p-1 rounded text-text-muted hover:text-accent hover:bg-accent/10 transition-colors"
                  title="Добавить дочерний элемент"
                >
                  <Plus size={13} />
                </button>
              )}
              <button
                onClick={() => moveNavNodeUp(node.id)}
                disabled={isFirst}
                className="p-1 rounded text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors disabled:opacity-30"
                title="Переместить вверх"
              >
                <ArrowUp size={13} />
              </button>
              <button
                onClick={() => moveNavNodeDown(node.id)}
                disabled={isLast}
                className="p-1 rounded text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors disabled:opacity-30"
                title="Переместить вниз"
              >
                <ArrowDown size={13} />
              </button>
              <button
                onClick={() => setEditing(true)}
                className="p-1 rounded text-text-muted hover:text-accent hover:bg-accent/10 transition-colors"
                title="Редактировать"
              >
                <Pencil size={13} />
              </button>
              <button
                onClick={() => setConfirmDelete(true)}
                className="p-1 rounded text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-colors"
                title="Удалить"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Children */}
      {node.type === 'group' && expanded && node.children && (
        <div>
          {node.children.map((child, i) => (
            <NavNodeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              isFirst={i === 0}
              isLast={i === node.children!.length - 1}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={() => deleteNavNode(node.id)}
        title="Удалить элемент навигации"
        message={`Удалить «${node.title}»?${node.type === 'group' ? ' Все дочерние элементы также будут удалены.' : ''}`}
        confirmLabel="Удалить"
        destructive
      />

      <AddNavNodeModal
        open={addingChild}
        onClose={() => setAddingChild(false)}
        parentId={node.id}
      />
    </div>
  )
}
