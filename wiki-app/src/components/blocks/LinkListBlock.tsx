import Link from 'next/link'
import { ExternalLink, ArrowRight } from 'lucide-react'
import type { LinkListItem } from '@/types/wiki'

interface LinkListBlockProps {
  title?: string
  items: LinkListItem[]
}

export function LinkListBlock({ title, items }: LinkListBlockProps) {
  return (
    <div className="my-6">
      {title && (
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
          {title}
        </h3>
      )}
      <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
        {items.map((item, i) => {
          const inner = (
            <div className="flex items-center gap-3 p-3 bg-bg-surface hover:bg-bg-hover transition-colors group">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors truncate">
                  {item.title}
                </div>
                {item.description && (
                  <div className="text-xs text-text-muted mt-0.5 truncate">{item.description}</div>
                )}
              </div>
              {item.external ? (
                <ExternalLink size={14} className="text-text-muted flex-shrink-0" />
              ) : (
                <ArrowRight size={14} className="text-text-muted flex-shrink-0 group-hover:text-accent transition-colors" />
              )}
            </div>
          )

          return item.external ? (
            <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="block">
              {inner}
            </a>
          ) : (
            <Link key={i} href={item.href} className="block">
              {inner}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
