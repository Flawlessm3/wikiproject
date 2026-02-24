'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useWikiStore } from '@/store/wikiStore'

interface WikiRelatedLinksProps {
  slugs: string[]
}

export function WikiRelatedLinks({ slugs }: WikiRelatedLinksProps) {
  const pages = useWikiStore(s => s.wikiData?.pages ?? {})
  const related = slugs.map(slug => pages[slug]).filter(Boolean)

  if (!related.length) return null

  return (
    <section className="mb-8" aria-label="Связанные страницы">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
        Связанные страницы
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map(page => (
          <Link
            key={page.id}
            href={`/docs/${page.meta.slug}`}
            className="flex flex-col gap-1.5 p-4 rounded-lg border border-border bg-bg-elevated hover:bg-bg-hover hover:border-border-strong transition-colors group"
          >
            <span className="flex items-center justify-between gap-2 text-sm font-semibold text-text-primary group-hover:text-accent-hover transition-colors">
              {page.meta.title}
              <ArrowRight size={14} className="flex-shrink-0 text-text-muted group-hover:translate-x-0.5 transition-transform" />
            </span>
            {page.meta.description && (
              <span className="text-xs text-text-muted line-clamp-2">{page.meta.description}</span>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
