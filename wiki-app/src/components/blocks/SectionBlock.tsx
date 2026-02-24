import type { ContentBlock } from '@/types/wiki'
import { BlockRenderer } from './BlockRenderer'

interface SectionBlockProps {
  title: string
  description?: string
  children: ContentBlock[]
}

export function SectionBlock({ title, description, children }: SectionBlockProps) {
  return (
    <section className="my-8 rounded-xl border border-border bg-bg-elevated overflow-hidden">
      <div className="px-5 py-4 border-b border-border bg-bg-hover">
        <h3 className="text-base font-semibold text-text-primary">{title}</h3>
        {description && (
          <p className="text-sm text-text-muted mt-1">{description}</p>
        )}
      </div>
      <div className="px-5 py-4 space-y-2">
        {children.map(block => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>
    </section>
  )
}
