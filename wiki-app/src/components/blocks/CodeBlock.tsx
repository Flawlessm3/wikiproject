'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function CodeBlock({
  content,
  language,
  filename,
}: {
  content: string
  language?: string
  filename?: string
}) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content)
    } catch {
      /* ignore */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const hasHeader = !!(language || filename)

  return (
    <div className="my-5 rounded-lg border border-border overflow-hidden bg-bg-elevated">
      {/* Header */}
      {hasHeader && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-bg-overlay">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-xs font-mono text-text-muted">{filename}</span>
            )}
            {language && (
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-bg-hover border border-border text-text-muted uppercase tracking-wide">
                {language}
              </span>
            )}
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-text-secondary transition-colors"
            aria-label="Скопировать код"
          >
            {copied ? (
              <><Check size={12} className="text-emerald-400" /> Скопировано</>
            ) : (
              <><Copy size={12} /> Копировать</>
            )}
          </button>
        </div>
      )}

      {/* No header — copy button floats over code */}
      {!hasHeader && (
        <div className="flex justify-end px-4 pt-3 pb-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-text-secondary transition-colors"
            aria-label="Скопировать код"
          >
            {copied ? (
              <><Check size={12} className="text-emerald-400" /> Скопировано</>
            ) : (
              <><Copy size={12} /> Копировать</>
            )}
          </button>
        </div>
      )}

      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-text-secondary">
        <code>{content}</code>
      </pre>
    </div>
  )
}
