import type { NavNode } from '@/types/wiki'
import type { NavItem } from '@/types'

/**
 * Flatten the navigation tree into an ordered list of visible page items.
 * Used for prev/next pagination.
 */
export function flattenNav(navigation: NavNode[]): NavItem[] {
  const result: NavItem[] = []

  function walk(nodes: NavNode[]) {
    const sorted = [...nodes].sort((a, b) => a.order - b.order)
    for (const node of sorted) {
      if (node.hidden || node.draft) continue
      if (node.type === 'page' && node.slug && !node.disabled) {
        result.push({ title: node.title, slug: node.slug, badge: node.badge, disabled: node.disabled })
      } else if (node.type === 'group' && node.children) {
        walk(node.children)
      }
    }
  }

  walk(navigation)
  return result
}

/**
 * Get prev/next nav items for pagination from the store navigation.
 */
export function getPrevNextFromNav(
  navigation: NavNode[],
  currentSlug: string
): { prev: NavItem | null; next: NavItem | null } {
  const flat = flattenNav(navigation)
  const idx = flat.findIndex(n => n.slug === currentSlug)
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  }
}
