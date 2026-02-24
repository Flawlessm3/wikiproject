import { Search } from 'lucide-react'
import { navGroups }    from '@/lib/navigation'
import { uiLabels }     from 'content/config/ui-labels'
import { SidebarGroup } from './SidebarGroup'

interface SidebarProps {
  currentSlug: string
}

/**
 * Server Component — renders the full sidebar navigation.
 * SidebarGroup handles per-group accordion state (client component).
 */
export function Sidebar({ currentSlug }: SidebarProps) {
  return (
    <div className="flex flex-col h-full py-4">
      {/* Quick search shortcut inside sidebar */}
      <div className="px-3 mb-3">
        <button
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-muted bg-bg-elevated border border-border rounded-md hover:border-border-strong hover:bg-bg-hover transition-colors"
          data-search-trigger
          aria-label="Открыть поиск"
        >
          <Search size={13} className="flex-shrink-0" />
          <span className="flex-1 text-left">{uiLabels.sidebar.searchLabel}</span>
          <kbd className="font-mono text-[10px] px-1.5 py-0.5 bg-bg-overlay border border-border rounded">
            {uiLabels.search.shortcut}
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
