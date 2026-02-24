'use client'

import { Clock, User, Calendar, Link2 } from 'lucide-react'
import { useState } from 'react'
import { formatDate, readingTime } from '@/lib/utils'
import { uiLabels } from 'content/config/ui-labels'

interface ArticleMetaProps {
  updatedAt?: string
  author?: string
  /** Raw text content — used to calculate reading time. Optional for block pages. */
  content?: string
  slug: string
}

/**
 * Article metadata row: date · author · reading time · copy link.
 * Label text comes from content/config/ui-labels.ts → article.*
 */
export function ArticleMeta({ updatedAt, author, content, slug }: ArticleMetaProps) {
  const [copied, setCopied] = useState(false)
  const labels = uiLabels.article

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch {
      /* ignore */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const rt = content ? readingTime(content) : null
  const date = formatDate(updatedAt)
  const hasItems = !!(date || author || rt)

  return (
    <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mb-6 text-sm text-text-muted">
      {date && (
        <span className="flex items-center gap-1.5">
          <Calendar size={13} />
          {date}
        </span>
      )}
      {date && (author || rt) && <span aria-hidden>·</span>}

      {author && (
        <span className="flex items-center gap-1.5">
          <User size={13} />
          {author}
        </span>
      )}
      {author && rt && <span aria-hidden>·</span>}

      {rt && (
        <span className="flex items-center gap-1.5">
          <Clock size={13} />
          {rt}
        </span>
      )}

      {hasItems && <span aria-hidden>·</span>}

      {/* Copy link */}
      <button
        onClick={copyLink}
        className="flex items-center gap-1.5 hover:text-text-secondary transition-colors rounded px-1 -mx-1"
        aria-label="Скопировать ссылку на эту страницу"
      >
        <Link2 size={13} />
        {copied ? labels.copied : labels.copyLink}
      </button>
    </div>
  )
}
