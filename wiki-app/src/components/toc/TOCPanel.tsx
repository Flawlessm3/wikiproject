import type { TOCItem } from '@/types'
import { uiLabels }     from 'content/config/ui-labels'
import { TOCScrollspy } from './TOCScrollspy'

interface TOCPanelProps {
  items: TOCItem[]
}

/**
 * Right-side "На этой странице" sticky panel.
 * TOCScrollspy (client) handles active-item highlighting.
 * Title text comes from content/config/ui-labels.ts → toc.title
 */
export function TOCPanel({ items }: TOCPanelProps) {
  if (!items.length) return null

  const allIds = items.flatMap(item => [
    item.id,
    ...(item.children?.map(c => c.id) ?? []),
  ])

  return (
    <div className="py-8 px-4">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-3 px-3">
        {uiLabels.toc.title}
      </p>

      <TOCScrollspy ids={allIds}>
        <nav aria-label="Содержание страницы">
          <TOCList items={items} />
        </nav>
      </TOCScrollspy>
    </div>
  )
}

function TOCList({ items, depth = 0 }: { items: TOCItem[]; depth?: number }) {
  return (
    <ul className="space-y-0.5">
      {items.map(item => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            data-toc-id={item.id}
            className={[
              'toc-link block py-1 text-sm rounded-md border-l-2 transition-colors duration-100',
              depth === 0 ? 'pl-3' : 'pl-5 text-xs',
              'border-transparent text-text-muted',
              'hover:text-text-secondary hover:bg-bg-hover',
            ].join(' ')}
          >
            {item.title}
          </a>
          {item.children && item.children.length > 0 && (
            <TOCList items={item.children} depth={depth + 1} />
          )}
        </li>
      ))}
    </ul>
  )
}
