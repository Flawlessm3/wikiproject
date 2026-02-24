'use client'

import { Search } from 'lucide-react'
import { useWikiStore, selectNavigation, selectSettings } from '@/store/wikiStore'
import { SidebarGroup } from './SidebarGroup'
import type { NavGroup, NavItem } from '@/types'
import type { NavNode } from '@/types/wiki'

interface SidebarProps {
  currentSlug: string
}

/**
 * Sidebar — reads navigation from Zustand store.
 * Converts NavNode[] (new tree format) to NavGroup[] (existing SidebarGroup format).
 */
export function Sidebar({ currentSlug }: SidebarProps) {
  const navigation = useWikiStore(selectNavigation)
  const settings = useWikiStore(selectSettings)

  const searchLabel = settings?.uiLabels.sidebar.searchLabel ?? 'Быстрый поиск…'
  const shortcut = settings?.uiLabels.search.shortcut ?? '⌘K'

  // Convert NavNode[] → NavGroup[] (only groups with visible page children)
  const navGroups: NavGroup[] = navigation
    .filter(n => n.type === 'group')
    .sort((a, b) => a.order - b.order)
    .map(group => ({
      title: group.title,
      collapsible: group.collapsible,
      defaultOpen: group.defaultOpen,
      items: (group.children ?? [])
        .filter((c): c is NavNode & { slug: string } =>
          c.type === 'page' && !c.hidden && !c.draft && !!c.slug
        )
        .sort((a, b) => a.order - b.order)
        .map(c => ({
          title: c.title,
          slug: c.slug,
          badge: c.badge,
          disabled: c.disabled,
        } as NavItem)),
    }))

  return (
    <div className="flex flex-col h-full py-4">
      {/* Quick search shortcut */}
      <div className="px-3 mb-3">
        <button
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-muted bg-bg-elevated border border-border rounded-md hover:border-border-strong hover:bg-bg-hover transition-colors"
          data-search-trigger
          aria-label="Открыть поиск"
        >
          <Search size={13} className="flex-shrink-0" />
          <span className="flex-1 text-left">{searchLabel}</span>
          <kbd className="font-mono text-[10px] px-1.5 py-0.5 bg-bg-overlay border border-border rounded">
            {shortcut}
          </kbd>
        </button>
      </div>

      {/* Navigation groups */}
      <nav className="flex-1 overflow-y-auto px-2 pb-10 space-y-1" aria-label="Навигация">
        {navGroups.map(group => (
          <SidebarGroup
            key={group.title}
            group={group}
            currentSlug={currentSlug}
          />
        ))}
      </nav>
    </div>
  )
}
