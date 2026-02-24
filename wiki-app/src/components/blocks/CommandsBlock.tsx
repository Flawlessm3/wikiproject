import { parseInline } from '@/lib/inline-md'
import type { CommandItem } from '@/types/blocks'

export function CommandsBlock({
  title,
  category,
  items,
}: {
  title?: string
  category?: string
  items: CommandItem[]
}) {
  return (
    <div className="my-6">
      {title && (
        <h3 className="text-base font-semibold text-text-primary mb-3">{title}</h3>
      )}
      {category && (
        <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">
          {category}
        </p>
      )}

      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg-elevated border-b border-border">
              <th className="text-left px-4 py-2.5 font-semibold text-text-muted text-xs uppercase tracking-wide">
                Команда
              </th>
              <th className="text-left px-4 py-2.5 font-semibold text-text-muted text-xs uppercase tracking-wide">
                Описание
              </th>
              <th className="text-left px-4 py-2.5 font-semibold text-text-muted text-xs uppercase tracking-wide hidden sm:table-cell">
                Права
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((cmd, i) => (
              <tr key={i} className="hover:bg-bg-hover/40 transition-colors">
                <td className="px-4 py-3 align-top min-w-[140px]">
                  <code className="text-[0.8rem] font-mono text-accent-hover">
                    {cmd.command}
                  </code>
                  {cmd.usage && (
                    <div className="text-[11px] text-text-muted font-mono mt-0.5 leading-tight">
                      {cmd.usage}
                    </div>
                  )}
                  {cmd.aliases && cmd.aliases.length > 0 && (
                    <div className="text-[10px] text-text-disabled mt-0.5">
                      псевд.: {cmd.aliases.join(', ')}
                    </div>
                  )}
                </td>

                <td className="px-4 py-3 text-text-secondary align-top">
                  {parseInline(cmd.description)}
                </td>

                <td className="px-4 py-3 align-top hidden sm:table-cell">
                  {cmd.permission ? (
                    <code className="text-[0.72rem] font-mono text-text-muted bg-bg-overlay px-1.5 py-0.5 rounded border border-border break-all">
                      {cmd.permission}
                    </code>
                  ) : (
                    <span className="text-text-disabled text-xs">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
