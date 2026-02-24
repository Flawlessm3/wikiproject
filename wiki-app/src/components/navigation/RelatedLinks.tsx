import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getDocBySlug } from '@/lib/docs'

interface RelatedLinksProps {
  slugs: string[]
}

export function RelatedLinks({ slugs }: RelatedLinksProps) {
  const docs = slugs
    .map(slug => getDocBySlug(slug.split('/')))
    .filter(Boolean)

  if (!docs.length) return null

  return (
    <section className="mb-8" aria-label="Related articles">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
        Related Articles
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {docs.map(doc => doc && (
          <Link
            key={doc.href}
            href={doc.href}
            className="flex flex-col gap-1.5 p-4 rounded-lg border border-border bg-bg-elevated hover:bg-bg-hover hover:border-border-strong transition-colors group"
          >
            <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
              {doc.frontmatter.category ?? 'Article'}
            </span>
            <span className="flex items-center justify-between gap-2 text-sm font-semibold text-text-primary group-hover:text-accent-hover transition-colors">
              {doc.frontmatter.title}
              <ArrowRight size={14} className="flex-shrink-0 text-text-muted group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
