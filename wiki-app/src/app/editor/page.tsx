'use client'

import Link from 'next/link'
import { FileText, Navigation, Settings, Download, Plus, Globe, Clock } from 'lucide-react'
import { useWikiStore } from '@/store/wikiStore'

export const dynamic = 'force-dynamic'

export default function EditorDashboard() {
  const wikiData = useWikiStore(s => s.wikiData)
  const hasUnsavedChanges = useWikiStore(s => s.hasUnsavedChanges)
  const saveWikiData = useWikiStore(s => s.saveWikiData)

  const pageCount = wikiData ? Object.keys(wikiData.pages).length : 0
  const navCount = wikiData ? wikiData.navigation.length : 0

  const tools = [
    {
      href: '/editor/navigation',
      icon: Navigation,
      label: 'Навигация',
      description: 'Управление деревом навигации: группы, страницы, ссылки',
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    },
    {
      href: '/editor/settings',
      icon: Settings,
      label: 'Настройки',
      description: 'Название сайта, акцентный цвет, ссылки в шапке',
      color: 'text-violet-400',
      bg: 'bg-violet-400/10',
    },
    {
      href: '/editor/export',
      icon: Download,
      label: 'Экспорт / Импорт',
      description: 'Скачать данные вики, импортировать JSON, сбросить до демо',
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
    },
  ]

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Top bar */}
      <div className="border-b border-border bg-bg-surface">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
              <FileText size={16} className="text-accent" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-text-primary">Редактор вики</h1>
              <p className="text-xs text-text-muted">{wikiData?.settings.name ?? '—'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasUnsavedChanges && (
              <button
                onClick={saveWikiData}
                className="px-3 py-1.5 text-xs font-medium bg-accent text-white rounded-md hover:bg-accent-hover transition-colors"
              >
                Сохранить изменения
              </button>
            )}
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-muted hover:text-text-primary border border-border rounded-md hover:bg-bg-hover transition-colors"
            >
              <Globe size={13} />
              На сайт
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Страниц', value: pageCount, icon: FileText },
            { label: 'Разделов навигации', value: navCount, icon: Navigation },
            { label: 'Несохранённых изменений', value: hasUnsavedChanges ? 'Есть' : 'Нет', icon: Clock },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-bg-surface border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} className="text-text-muted" />
                <span className="text-xs text-text-muted">{label}</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">{value}</p>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div>
          <h2 className="text-xs font-medium text-text-muted uppercase tracking-wide mb-3">Инструменты</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {tools.map(({ href, icon: Icon, label, description, color, bg }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col gap-3 p-4 bg-bg-surface border border-border rounded-xl hover:border-border-strong hover:bg-bg-elevated transition-all group"
              >
                <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
                  <Icon size={18} className={color} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">{label}</p>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent pages */}
        {wikiData && (
          <div>
            <h2 className="text-xs font-medium text-text-muted uppercase tracking-wide mb-3">Страницы вики</h2>
            <div className="bg-bg-surface border border-border rounded-xl overflow-hidden">
              {Object.values(wikiData.pages).map((page, i, arr) => (
                <Link
                  key={page.id}
                  href={`/docs/${page.meta.slug}`}
                  className={`flex items-center justify-between px-4 py-3 hover:bg-bg-hover transition-colors ${i < arr.length - 1 ? 'border-b border-border' : ''}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText size={14} className="text-text-muted flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-text-primary truncate">{page.meta.title}</p>
                      <p className="text-xs text-text-muted font-mono truncate">{page.meta.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {page.meta.status === 'draft' && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-400/10 text-yellow-400 font-medium">Черновик</span>
                    )}
                    <span className="text-xs text-text-disabled">{page.blocks.length} блоков</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
