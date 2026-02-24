import React from 'react'
import Link from 'next/link'

// ─────────────────────────────────────────────────────────────────────────────
// Inline markdown parser for block content
// ─────────────────────────────────────────────────────────────────────────────
//
// Supports: **bold**, *italic*, `code`, [text](url)
//
// Used by block components (ParagraphBlock, ListBlock, etc.) to render
// text fields that contain basic markdown formatting.
//
// For full markdown / JSX, use MDX pages (content/docs/) instead.
// ─────────────────────────────────────────────────────────────────────────────

const TOKEN_RE = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g

/**
 * Converts a string with inline markdown syntax to React nodes.
 * Returns the original string if no markdown is found.
 */
export function parseInline(text: string): React.ReactNode {
  if (!text) return null

  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null

  TOKEN_RE.lastIndex = 0

  while ((match = TOKEN_RE.exec(text)) !== null) {
    // Literal text before this token
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    const token = match[0]

    if (token.startsWith('**')) {
      parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('*')) {
      parts.push(<em key={key++}>{token.slice(1, -1)}</em>)
    } else if (token.startsWith('`')) {
      parts.push(
        <code
          key={key++}
          className="text-[0.85em] px-1 py-0.5 rounded bg-bg-elevated border border-border font-mono text-accent-hover"
        >
          {token.slice(1, -1)}
        </code>
      )
    } else if (token.startsWith('[')) {
      const m = token.match(/\[([^\]]+)\]\(([^)]+)\)/)
      if (m) {
        const [, label, href] = m
        const isExternal = href.startsWith('http')
        parts.push(
          isExternal ? (
            <a
              key={key++}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-hover underline underline-offset-2 hover:text-accent-active"
            >
              {label}
            </a>
          ) : (
            <Link
              key={key++}
              href={href}
              className="text-accent-hover underline underline-offset-2 hover:text-accent-active"
            >
              {label}
            </Link>
          )
        )
      }
    }

    lastIndex = match.index + token.length
  }

  // Remaining literal text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  if (parts.length === 0) return text
  if (parts.length === 1) return parts[0]
  return <>{parts}</>
}
