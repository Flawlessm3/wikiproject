import { parseInline } from '@/lib/inline-md'

export function TableBlock({
  headers,
  rows,
  caption,
}: {
  headers: string[]
  rows: string[][]
  caption?: string
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        {caption && (
          <caption className="text-xs text-text-muted py-2 px-4 caption-bottom text-left">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="bg-bg-elevated border-b border-border">
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left px-4 py-3 font-semibold text-text-primary text-xs uppercase tracking-wide whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-bg-hover/40 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-text-secondary align-top">
                  {parseInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
