'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { parseInline } from '@/lib/inline-md'
import type { FAQItem } from '@/types/blocks'

function FAQEntry({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full py-4 text-left gap-4 group"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-text-primary group-hover:text-accent-hover transition-colors">
          {item.question}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            'flex-shrink-0 text-text-muted transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>

      {open && (
        <div
          className="pb-4 text-sm text-text-secondary leading-relaxed"
          role="region"
        >
          {parseInline(item.answer)}
        </div>
      )}
    </div>
  )
}

export function FAQBlock({
  title,
  items,
}: {
  title?: string
  items: FAQItem[]
}) {
  return (
    <div className="my-6 rounded-lg border border-border bg-bg-elevated overflow-hidden">
      {title && (
        <div className="px-5 py-3 border-b border-border bg-bg-overlay">
          <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        </div>
      )}
      <div className="px-5">
        {items.map((item, i) => (
          <FAQEntry key={i} item={item} />
        ))}
      </div>
    </div>
  )
}
