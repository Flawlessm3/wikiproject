'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  children: string
  className?: string
  [key: string]: unknown
}

/**
 * Client component — wraps <pre><code> with a copy button.
 * Receives the language from className like "language-ts".
 */
export function CodeBlock({ children, className, ...rest }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const lang = className?.replace('language-', '') ?? 'text'
  const code = typeof children === 'string' ? children.trim() : ''

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = code
      Object.assign(ta.style, { position: 'fixed', opacity: '0' })
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="not-prose relative group my-5 rounded-lg overflow-hidden border border-border bg-bg-subtle">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-bg-elevated border-b border-border">
        <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-text-muted">
          {lang}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-text-primary transition-colors px-2 py-1 rounded hover:bg-bg-hover"
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto p-5 m-0 text-sm leading-loose" {...rest}>
        <code className="font-mono text-text-primary">{code}</code>
      </pre>
    </div>
  )
}
