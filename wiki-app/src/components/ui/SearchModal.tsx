'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, X, ArrowRight, Hash } from 'lucide-react'
import Link from 'next/link'
import { cn }              from '@/lib/utils'
import { flatNavigation }  from '@/lib/navigation'
import { uiLabels }        from 'content/config/ui-labels'
import { wikiConfig }      from 'content/config/wiki.config'

// ─── Search Trigger Button (in Navbar) ───────────────────────────────────────

export function SearchTrigger() {
  const [open, setOpen] = useState(false)
  const labels = uiLabels.search

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      {/* Desktop: full button */}
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-text-muted bg-bg-elevated border border-border rounded-md hover:border-border-strong hover:bg-bg-hover transition-colors min-w-[160px]"
        aria-label="Открыть поиск"
      >
        <Search size={13} />
        <span className="flex-1 text-left">{labels.triggerLabel}</span>
        <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-bg-overlay border border-border rounded hidden md:inline">
          {labels.shortcut}
        </kbd>
      </button>

      {/* Mobile: icon only */}
      <button
        onClick={() => setOpen(true)}
        className="sm:hidden w-8 h-8 flex items-center justify-center rounded-md text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
        aria-label="Поиск"
      >
        <Search size={16} />
      </button>

      {open && <SearchModal onClose={() => setOpen(false)} />}
    </>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const labels = uiLabels.search
  const base = wikiConfig.docs.baseRoute

  useEffect(() => {
    inputRef.current?.focus()
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const results = query.trim().length > 0
    ? flatNavigation.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Поиск по вики"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-bg-elevated border border-border-strong rounded-xl shadow-xl overflow-hidden animate-fade-in">
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search size={18} className="text-text-muted flex-shrink-0" />
          <input
            ref={inputRef}
            type="search"
            className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted outline-none text-base"
            placeholder={labels.placeholder}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-xs font-medium text-text-muted px-2 py-1 border border-border rounded hover:bg-bg-hover transition-colors"
            aria-label="Закрыть поиск"
          >
            <X size={12} /> Esc
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          {query.trim() === '' && (
            <p className="text-sm text-text-muted text-center py-8">
              {labels.empty}
            </p>
          )}

          {query.trim() !== '' && results.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-text-muted">
                {labels.noResults}{' '}
                <strong>&ldquo;{query}&rdquo;</strong>
              </p>
              <p className="text-xs text-text-disabled mt-1">{labels.noResultsHint}</p>
            </div>
          )}

          {results.map(item => (
            <Link
              key={item.slug}
              href={`${base}/${item.slug}`}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-bg-hover text-text-secondary hover:text-text-primary transition-colors group"
            >
              <Hash size={14} className="text-text-muted flex-shrink-0" />
              <span className="flex-1 text-sm font-medium">{item.title}</span>
              <ArrowRight size={14} className="text-text-disabled group-hover:text-text-muted transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
