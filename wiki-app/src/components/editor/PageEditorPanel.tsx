'use client'

import { useState, useEffect, useMemo } from 'react'
import { X, FileText, Layers } from 'lucide-react'
import { useWikiStore, selectPage } from '@/store/wikiStore'
import { FormField, inputCls, textareaCls, selectCls } from './shared/FormField'
import { cn } from '@/lib/utils'

type Tab = 'meta' | 'blocks'

export function PageEditorPanel() {
  const editorPanelOpen = useWikiStore(s => s.editorPanelOpen)
  const currentSlug = useWikiStore(s => s.currentSlug)
  const setEditorPanelOpen = useWikiStore(s => s.setEditorPanelOpen)
  const updatePageMeta = useWikiStore(s => s.updatePageMeta)
  // Stabilize selector reference — creating a new function on every render would
  // cause useSyncExternalStore to reset its memo and trigger unnecessary re-renders.
  const pageSelector = useMemo(
    () => currentSlug ? selectPage(currentSlug) : () => null,
    [currentSlug]
  )
  const page = useWikiStore(pageSelector)

  const [tab, setTab] = useState<Tab>('meta')

  // Meta form state — synced when page changes
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('published')
  const [author, setAuthor] = useState('')
  const [badge, setBadge] = useState('')
  const [tags, setTags] = useState('')

  useEffect(() => {
    if (page) {
      setTitle(page.meta.title)
      setDescription(page.meta.description ?? '')
      setStatus(page.meta.status)
      setAuthor(page.meta.author ?? '')
      setBadge(page.meta.badge ?? '')
      setTags((page.meta.tags ?? []).join(', '))
    }
  }, [page])

  function handleSaveMeta() {
    if (!currentSlug) return
    updatePageMeta(currentSlug, {
      title,
      description: description || undefined,
      status,
      author: author || undefined,
      badge: badge || undefined,
      tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : undefined,
      updatedAt: new Date().toISOString().split('T')[0],
    })
  }

  if (!editorPanelOpen || !page) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20"
        onClick={() => setEditorPanelOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className={cn(
        'fixed top-0 right-0 bottom-0 z-50 flex flex-col',
        'w-full max-w-sm bg-bg-surface border-l border-border shadow-2xl',
        'transition-transform duration-300',
        editorPanelOpen ? 'translate-x-0' : 'translate-x-full',
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
          <h2 className="text-sm font-semibold text-text-primary">Редактор страницы</h2>
          <button
            onClick={() => setEditorPanelOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-md text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
            aria-label="Закрыть"
          >
            <X size={15} />
          </button>
        </div>

        {/* Slug indicator */}
        <div className="px-4 py-2 border-b border-border flex-shrink-0 bg-bg-base">
          <p className="text-[11px] text-text-disabled font-mono">{currentSlug}</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border flex-shrink-0">
          {([
            { id: 'meta', label: 'Метаданные', icon: FileText },
            { id: 'blocks', label: 'Блоки', icon: Layers },
          ] as const).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors',
                tab === id
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-text-muted hover:text-text-secondary',
              )}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {tab === 'meta' && (
            <div className="p-4 space-y-4">
              <FormField label="Заголовок страницы" required>
                <input
                  className={inputCls}
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Название страницы"
                />
              </FormField>

              <FormField label="Описание" hint="Краткое описание для SEO и поиска">
                <textarea
                  className={textareaCls}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Краткое описание страницы..."
                  style={{ minHeight: 70 }}
                />
              </FormField>

              <FormField label="Статус">
                <select
                  className={selectCls}
                  value={status}
                  onChange={e => setStatus(e.target.value as 'draft' | 'published')}
                >
                  <option value="published">Опубликована</option>
                  <option value="draft">Черновик</option>
                </select>
              </FormField>

              <FormField label="Автор" hint="Необязательно">
                <input
                  className={inputCls}
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  placeholder="Имя автора"
                />
              </FormField>

              <FormField label="Бейдж" hint="Необязательно, например: New, Beta">
                <input
                  className={inputCls}
                  value={badge}
                  onChange={e => setBadge(e.target.value)}
                  placeholder="New"
                />
              </FormField>

              <FormField label="Теги" hint="Через запятую">
                <input
                  className={inputCls}
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                  placeholder="плагин, команды, настройка"
                />
              </FormField>

              <button
                onClick={handleSaveMeta}
                className="w-full py-2 text-sm font-medium bg-accent text-white rounded-md hover:bg-accent-hover transition-colors"
              >
                Сохранить метаданные
              </button>
            </div>
          )}

          {tab === 'blocks' && (
            <div className="p-4">
              <p className="text-xs text-text-muted text-center py-8">
                Блоки редактируются прямо на странице.
                <br />
                Наведите на блок для появления элементов управления.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
