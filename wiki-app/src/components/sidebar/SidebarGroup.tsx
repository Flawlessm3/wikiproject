'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import type { NavGroup } from '@/types'
import { cn } from '@/lib/utils'

interface SidebarGroupProps {
  group: NavGroup
  currentSlug: string
}

/**
 * SidebarGroup — renders one category section.
 * When `collapsible=true` the group can be toggled open/closed.
 * Auto-opens if it contains the currently active page.
 */
export function SidebarGroup({ group, currentSlug }: SidebarGroupProps) {
  const hasActive = group.items.some(item => item.slug === currentSlug)

  // If collapsible, default to open if it contains the active page
  const [isOpen, setIsOpen] = useState(
    group.collapsible ? (hasActive || (group.defaultOpen ?? false)) : true
  )

  const isList = !group.collapsible || isOpen

  return (
    <div className="mb-1">
      {/* Group label / collapsible trigger */}
      {group.collapsible ? (
        <button
          onClick={() => setIsOpen(o => !o)}
          className="w-full flex items-center justify-between px-3 py-1.5 mb-0.5 text-xs font-semibold uppercase tracking-widest text-text-muted hover:text-text-secondary rounded-md hover:bg-bg-hover transition-colors"
          aria-expanded={isOpen}
        >
          <span>{group.title}</span>
          <ChevronDown
            size={13}
            className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
          />
        </button>
      ) : (
        <p className="px-3 py-1.5 mb-0.5 text-xs font-semibold uppercase tracking-widest text-text-muted select-none">
          {group.title}
        </p>
      )}

      {/* Items */}
      {isList && (
        <ul role="list" className="space-y-0.5">
          {group.items.map(item => {
            const isActive = item.slug === currentSlug
            const href = `/docs/${item.slug}`

            if (item.disabled) {
              return (
                <li key={item.slug}>
                  <span
                    className="flex items-center justify-between px-3 py-1.5 text-sm text-text-disabled rounded-md cursor-not-allowed"
                    aria-disabled="true"
                  >
                    {item.title}
                    {item.badge && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-bg-elevated border border-border text-text-muted">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </li>
              )
            }

            return (
              <li key={item.slug}>
                <Link
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex items-center justify-between px-3 py-1.5 text-sm rounded-md transition-colors group min-h-[34px]',
                    isActive
                      ? 'text-accent-hover bg-accent-subtle font-semibold'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover font-medium',
                  )}
                >
                  <span>{item.title}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        'text-[10px] font-medium px-1.5 py-0.5 rounded-full border',
                        isActive
                          ? 'bg-accent-subtle border-accent-border text-accent-active'
                          : 'bg-bg-elevated border-border text-text-muted',
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
