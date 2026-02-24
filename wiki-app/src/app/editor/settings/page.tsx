'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'
import { useWikiStore } from '@/store/wikiStore'
import { FormField, inputCls, textareaCls, selectCls } from '@/components/editor/shared/FormField'
import type { AccentColor, NavbarLink } from '@/types/wiki'

export const dynamic = 'force-dynamic'

const ACCENT_COLORS: { value: AccentColor; label: string; color: string }[] = [
  { value: 'indigo', label: 'Индиго', color: '#6366f1' },
  { value: 'violet', label: 'Фиолетовый', color: '#8b5cf6' },
  { value: 'blue', label: 'Синий', color: '#3b82f6' },
  { value: 'emerald', label: 'Изумрудный', color: '#10b981' },
  { value: 'rose', label: 'Розовый', color: '#f43f5e' },
  { value: 'amber', label: 'Янтарный', color: '#f59e0b' },
]

export default function SettingsPage() {
  const settings = useWikiStore(s => s.wikiData?.settings ?? null)
  const updateSettings = useWikiStore(s => s.updateSettings)
  const saveWikiData = useWikiStore(s => s.saveWikiData)
  const hasUnsavedChanges = useWikiStore(s => s.hasUnsavedChanges)
  const isSaving = useWikiStore(s => s.isSaving)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [logoText, setLogoText] = useState('')
  const [version, setVersion] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [defaultSlug, setDefaultSlug] = useState('')
  const [accentColor, setAccentColor] = useState<AccentColor>('indigo')
  const [navbarLinks, setNavbarLinks] = useState<NavbarLink[]>([])
  const [showThemeToggle, setShowThemeToggle] = useState(true)
  const [showSearch, setShowSearch] = useState(true)
  const [showGithub, setShowGithub] = useState(true)

  useEffect(() => {
    if (!settings) return
    setName(settings.name)
    setDescription(settings.description)
    setLogoText(settings.logoText)
    setVersion(settings.version ?? '')
    setGithubUrl(settings.githubUrl ?? '')
    setDefaultSlug(settings.defaultSlug)
    setAccentColor(settings.accentColor)
    setNavbarLinks(settings.navbarLinks.map(l => ({ ...l })))
    setShowThemeToggle(settings.showThemeToggle)
    setShowSearch(settings.showSearch)
    setShowGithub(settings.showGithub)
  }, [settings])

  function handleSave() {
    updateSettings({
      name,
      description,
      logoText,
      version: version || undefined,
      githubUrl: githubUrl || undefined,
      defaultSlug,
      accentColor,
      navbarLinks,
      showThemeToggle,
      showSearch,
      showGithub,
    })
    saveWikiData()
  }

  function addNavbarLink() {
    setNavbarLinks(prev => [...prev, { label: '', href: '' }])
  }

  function removeNavbarLink(i: number) {
    setNavbarLinks(prev => prev.filter((_, idx) => idx !== i))
  }

  function updateNavbarLink(i: number, patch: Partial<NavbarLink>) {
    setNavbarLinks(prev => prev.map((l, idx) => idx === i ? { ...l, ...patch } : l))
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <p className="text-text-muted text-sm">Загрузка...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Top bar */}
      <div className="border-b border-border bg-bg-surface sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/editor"
              className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
            >
              <ArrowLeft size={16} />
            </Link>
            <h1 className="text-sm font-semibold text-text-primary">Настройки сайта</h1>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-accent text-white rounded-md hover:bg-accent-hover transition-colors"
          >
            <Save size={13} />
            Сохранить
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6 space-y-6">
        {/* General */}
        <section className="bg-bg-surface border border-border rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-text-primary">Основные</h2>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Название сайта" required>
              <input className={inputCls} value={name} onChange={e => setName(e.target.value)} placeholder="Моя вики" />
            </FormField>
            <FormField label="Текст логотипа">
              <input className={inputCls} value={logoText} onChange={e => setLogoText(e.target.value)} placeholder="W" />
            </FormField>
          </div>

          <FormField label="Описание">
            <textarea className={textareaCls} value={description} onChange={e => setDescription(e.target.value)} placeholder="Описание вики..." style={{ minHeight: 60 }} />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Версия" hint="Необязательно">
              <input className={inputCls} value={version} onChange={e => setVersion(e.target.value)} placeholder="1.0.0" />
            </FormField>
            <FormField label="URL на GitHub" hint="Необязательно">
              <input className={inputCls} value={githubUrl} onChange={e => setGithubUrl(e.target.value)} placeholder="https://github.com/..." />
            </FormField>
          </div>

          <FormField label="Начальная страница" hint="Slug страницы по умолчанию">
            <input className={inputCls + ' font-mono'} value={defaultSlug} onChange={e => setDefaultSlug(e.target.value)} placeholder="wiki" />
          </FormField>
        </section>

        {/* Accent color */}
        <section className="bg-bg-surface border border-border rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-text-primary">Акцентный цвет</h2>
          <div className="flex flex-wrap gap-3">
            {ACCENT_COLORS.map(({ value, label, color }) => (
              <button
                key={value}
                onClick={() => setAccentColor(value)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                  accentColor === value
                    ? 'border-current shadow-sm'
                    : 'border-border text-text-muted hover:border-border-strong'
                }`}
                style={accentColor === value ? { color, borderColor: color } : undefined}
              >
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} />
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* Navbar */}
        <section className="bg-bg-surface border border-border rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-text-primary">Шапка навигации</h2>

          <div className="space-y-2">
            {[
              { label: 'Переключатель темы', value: showThemeToggle, set: setShowThemeToggle },
              { label: 'Поиск', value: showSearch, set: setShowSearch },
              { label: 'Кнопка GitHub', value: showGithub, set: setShowGithub },
            ].map(({ label, value, set }) => (
              <label key={label} className="flex items-center justify-between py-1 cursor-pointer">
                <span className="text-sm text-text-secondary">{label}</span>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={e => set(e.target.checked)}
                  className="accent-accent w-4 h-4"
                />
              </label>
            ))}
          </div>

          <div className="pt-2 border-t border-border">
            <p className="text-xs text-text-muted mb-3">Ссылки в шапке</p>
            <div className="space-y-2">
              {navbarLinks.map((link, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    className={inputCls + ' flex-1'}
                    value={link.label}
                    onChange={e => updateNavbarLink(i, { label: e.target.value })}
                    placeholder="Название"
                  />
                  <input
                    className={inputCls + ' flex-1'}
                    value={link.href}
                    onChange={e => updateNavbarLink(i, { href: e.target.value })}
                    placeholder="/docs или https://..."
                  />
                  <button
                    onClick={() => removeNavbarLink(i)}
                    className="p-1.5 text-text-muted hover:text-red-400 hover:bg-red-400/10 rounded transition-colors flex-shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={addNavbarLink}
                className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-border rounded-md text-xs text-text-muted hover:text-text-secondary hover:border-border-strong transition-colors"
              >
                <Plus size={12} /> Добавить ссылку
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
