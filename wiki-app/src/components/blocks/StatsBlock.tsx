import type { StatItem } from '@/types/wiki'

interface StatsBlockProps {
  title?: string
  items: StatItem[]
}

export function StatsBlock({ title, items }: StatsBlockProps) {
  return (
    <div className="my-6">
      {title && (
        <h3 className="text-base font-semibold text-text-primary mb-4">{title}</h3>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="p-4 rounded-lg border border-border bg-bg-elevated text-center"
          >
            <div className="text-2xl font-bold text-accent tabular-nums">
              {item.value}
              {item.unit && (
                <span className="text-sm font-normal ml-1 text-text-muted">{item.unit}</span>
              )}
            </div>
            <div className="text-xs text-text-muted mt-1 leading-tight">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
