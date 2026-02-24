import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { parseInline } from '@/lib/inline-md'
import type { CardItem } from '@/types/blocks'

const GRID: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export function CardsBlock({
  columns = 2,
  items,
}: {
  columns?: 2 | 3 | 4
  items: CardItem[]
}) {
  return (
    <div className={cn('my-6 grid gap-4', GRID[columns])}>
      {items.map((card, i) => {
        const inner = (
          <>
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <span className="text-sm font-semibold text-text-primary group-hover:text-accent-hover transition-colors">
                {card.title}
              </span>
              {card.badge && (
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-bg-overlay border border-border text-text-muted flex-shrink-0">
                  {card.badge}
                </span>
              )}
            </div>
            {card.description && (
              <p className="text-xs text-text-secondary leading-relaxed">
                {parseInline(card.description)}
              </p>
            )}
            {card.href && (
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-accent-hover">
                Подробнее <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            )}
          </>
        )

        return card.href ? (
          <Link
            key={i}
            href={card.href}
            className="group p-4 rounded-lg border border-border bg-bg-elevated hover:bg-bg-hover hover:border-border-strong transition-colors"
          >
            {inner}
          </Link>
        ) : (
          <div
            key={i}
            className="p-4 rounded-lg border border-border bg-bg-elevated"
          >
            {inner}
          </div>
        )
      })}
    </div>
  )
}
