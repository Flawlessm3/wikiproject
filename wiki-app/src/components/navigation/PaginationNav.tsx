import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { NavItem } from '@/types'
import { uiLabels } from 'content/config/ui-labels'

interface PaginationNavProps {
  prev: NavItem | null
  next: NavItem | null
}

/**
 * Prev / Next navigation cards.
 * Label text comes from content/config/ui-labels.ts → pagination.*
 */
export function PaginationNav({ prev, next }: PaginationNavProps) {
  if (!prev && !next) return null

  const { previous, next: nextLabel } = uiLabels.pagination

  return (
    <nav className="grid grid-cols-2 gap-4 mt-10" aria-label="Навигация по статьям">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="flex flex-col gap-1 p-4 rounded-lg border border-border bg-bg-elevated hover:bg-bg-hover hover:border-border-strong transition-colors group"
          aria-label={`${previous}: ${prev.title}`}
        >
          <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-text-muted group-hover:text-text-secondary">
            <ChevronLeft size={13} /> {previous}
          </span>
          <span className="text-sm font-semibold text-accent-hover group-hover:text-accent-active transition-colors">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="flex flex-col gap-1 p-4 rounded-lg border border-border bg-bg-elevated hover:bg-bg-hover hover:border-border-strong transition-colors text-right group"
          aria-label={`${nextLabel}: ${next.title}`}
        >
          <span className="flex items-center justify-end gap-1 text-xs font-medium uppercase tracking-wide text-text-muted group-hover:text-text-secondary">
            {nextLabel} <ChevronRight size={13} />
          </span>
          <span className="text-sm font-semibold text-accent-hover group-hover:text-accent-active transition-colors">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
