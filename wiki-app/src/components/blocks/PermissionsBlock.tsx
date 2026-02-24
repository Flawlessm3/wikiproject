import { cn } from '@/lib/utils'
import type { PermissionItem } from '@/types/blocks'

const DEFAULT_BADGES = {
  op:   { label: 'OP',  cls: 'bg-red-500/10 border-red-500/25 text-red-400' },
  all:  { label: 'Все', cls: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400' },
  none: { label: 'Нет', cls: 'bg-bg-overlay border-border text-text-muted' },
} as const

export function PermissionsBlock({
  title,
  items,
}: {
  title?: string
  items: PermissionItem[]
}) {
  return (
    <div className="my-6">
      {title && (
        <h3 className="text-base font-semibold text-text-primary mb-3">{title}</h3>
      )}
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg-elevated border-b border-border">
              <th className="text-left px-4 py-2.5 font-semibold text-text-muted text-xs uppercase tracking-wide">
                Право
              </th>
              <th className="text-left px-4 py-2.5 font-semibold text-text-muted text-xs uppercase tracking-wide">
                Описание
              </th>
              <th className="text-left px-4 py-2.5 font-semibold text-text-muted text-xs uppercase tracking-wide whitespace-nowrap">
                По умолч.
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((perm, i) => {
              const badge = perm.default ? DEFAULT_BADGES[perm.default] : null
              return (
                <tr key={i} className="hover:bg-bg-hover/40 transition-colors">
                  <td className="px-4 py-3 align-top">
                    <code className="text-[0.72rem] font-mono text-accent-hover bg-bg-overlay px-1.5 py-0.5 rounded border border-border break-all">
                      {perm.node}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-text-secondary align-top">
                    {perm.description}
                  </td>
                  <td className="px-4 py-3 align-top">
                    {badge && (
                      <span
                        className={cn(
                          'text-[10px] font-medium px-2 py-0.5 rounded-full border',
                          badge.cls
                        )}
                      >
                        {badge.label}
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
