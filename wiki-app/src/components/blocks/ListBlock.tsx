import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { parseInline } from '@/lib/inline-md'
import type { ListItem } from '@/types/blocks'

function getItemText(item: ListItem): string {
  return typeof item === 'string' ? item : item.text
}

function getChildren(item: ListItem): string[] | undefined {
  if (typeof item === 'object' && 'children' in item && !('checked' in item)) {
    return item.children
  }
  return undefined
}

function isChecked(item: ListItem): boolean {
  return typeof item === 'object' && 'checked' in item ? item.checked : false
}

export function ListBlock({
  style,
  items,
}: {
  style: 'bullet' | 'ordered' | 'check'
  items: ListItem[]
}) {
  return (
    <ul className="my-4 space-y-1.5 list-none pl-0">
      {items.map((item, i) => {
        const text = getItemText(item)
        const children = getChildren(item)
        const checked = isChecked(item)

        return (
          <li key={i} className="flex gap-2.5 items-start text-text-secondary">
            {/* Marker */}
            {style === 'bullet' && (
              <span className="flex-shrink-0 w-5 h-6 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-text-muted mt-[3px]" />
              </span>
            )}
            {style === 'ordered' && (
              <span className="flex-shrink-0 w-5 h-6 flex items-center justify-center text-sm font-mono text-text-muted">
                {i + 1}.
              </span>
            )}
            {style === 'check' && (
              <span
                className={cn(
                  'flex-shrink-0 w-4 h-4 mt-1 rounded border flex items-center justify-center',
                  checked
                    ? 'bg-accent border-accent'
                    : 'border-border bg-bg-elevated'
                )}
              >
                {checked && <Check size={10} className="text-white" />}
              </span>
            )}

            <span className="leading-6 flex-1">
              {parseInline(text)}
              {children && children.length > 0 && (
                <ul className="mt-1.5 ml-4 space-y-1 list-none">
                  {children.map((child, j) => (
                    <li key={j} className="flex gap-2 items-start text-text-muted text-sm">
                      <span className="flex-shrink-0 w-1 h-5 flex items-center">
                        <span className="w-1 h-1 rounded-full bg-text-disabled" />
                      </span>
                      {parseInline(child)}
                    </li>
                  ))}
                </ul>
              )}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
