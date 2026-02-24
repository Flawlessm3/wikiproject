import { navigationConfig } from 'content/config/navigation'
import { wikiConfig } from 'content/config/wiki.config'
import type { NavGroup, NavItem } from '@/types'
import type { NavGroupConfig, NavItemConfig } from '@/types/wiki-config'

// ─────────────────────────────────────────────────────────────────────────────
// Navigation builder
// Converts NavConfig (from content/config/navigation.ts) into the NavGroup[]
// format consumed by Sidebar components. Filters hidden/draft items, sorts
// by `order`, and derives flatNavigation + getPrevNext.
// ─────────────────────────────────────────────────────────────────────────────

function isVisible(item: NavItemConfig): boolean {
  return !item.hidden && !item.draft
}

function sortByOrder<T extends { order?: number }>(arr: T[]): T[] {
  return [...arr].sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

/** NavGroup[] ready for the Sidebar component */
export const navGroups: NavGroup[] = sortByOrder<NavGroupConfig>(navigationConfig.groups).map(
  (group): NavGroup => ({
    title: group.title,
    collapsible: group.collapsible,
    defaultOpen: group.defaultOpen,
    items: sortByOrder<NavItemConfig>(group.items.filter(isVisible)).map(
      (item): NavItem => ({
        title: item.title,
        slug: item.slug,
        badge: item.badge,
        disabled: item.disabled,
      })
    ),
  })
)

/** Flat ordered list of non-hidden, non-disabled pages (for prev/next + search) */
export const flatNavigation: NavItem[] = navGroups.flatMap(g =>
  g.items.filter(i => !i.disabled)
)

/** Get the previous and next pages for a given slug */
export function getPrevNext(slug: string): {
  prev: NavItem | null
  next: NavItem | null
} {
  const idx = flatNavigation.findIndex(item => item.slug === slug)
  return {
    prev: idx > 0 ? flatNavigation[idx - 1] : null,
    next: idx < flatNavigation.length - 1 ? flatNavigation[idx + 1] : null,
  }
}

/** Slug of the first visible page (for root /docs redirect) */
export const defaultSlug =
  flatNavigation[0]?.slug ?? wikiConfig.docs.defaultSlug
