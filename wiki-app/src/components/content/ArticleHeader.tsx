import { cn } from '@/lib/utils'

interface ArticleHeaderProps {
  title: string
  description?: string
  badge?: string
  tags?: string[]
}

export function ArticleHeader({ title, description, badge, tags }: ArticleHeaderProps) {
  return (
    <header className="mb-6">
      {/* Badge + tags */}
      {(badge || tags?.length) && (
        <div className="flex items-center flex-wrap gap-2 mb-4">
          {badge && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent-subtle border border-accent-border text-accent-active">
              {badge}
            </span>
          )}
          {tags?.map(tag => (
            <span
              key={tag}
              className="text-xs font-medium px-2 py-0.5 rounded-full bg-bg-elevated border border-border text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* H1 title */}
      <h1 className="text-3xl font-bold tracking-tight text-text-primary leading-tight mb-4">
        {title}
      </h1>

      {/* Description */}
      {description && (
        <p className="text-lg text-text-secondary leading-relaxed max-w-[60ch]">
          {description}
        </p>
      )}
    </header>
  )
}
