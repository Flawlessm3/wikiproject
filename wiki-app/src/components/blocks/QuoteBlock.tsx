import { parseInline } from '@/lib/inline-md'

interface QuoteBlockProps {
  content: string
  author?: string
}

export function QuoteBlock({ content, author }: QuoteBlockProps) {
  return (
    <blockquote className="my-6 border-l-4 border-accent pl-5 py-3 bg-bg-elevated rounded-r-lg">
      <p className="text-text-secondary italic leading-relaxed">{parseInline(content)}</p>
      {author && (
        <cite className="block mt-3 text-xs text-text-muted not-italic">— {author}</cite>
      )}
    </blockquote>
  )
}
