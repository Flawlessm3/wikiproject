import { pageRegistry } from 'content/pages/_registry'
import { getDocBySlug } from './docs'
import type { BlockPage, Doc } from '@/types'

// ─────────────────────────────────────────────────────────────────────────────
// Unified page resolver
// ─────────────────────────────────────────────────────────────────────────────
//
// Priority:
//   1. Block-based page  (content/pages/_registry.ts)
//   2. MDX page          (content/docs/)
//   3. null → 404
//
// This allows both content systems to coexist.
// Block pages take precedence over MDX pages with the same slug.
// ─────────────────────────────────────────────────────────────────────────────

export type PageResult =
  | { kind: 'block'; page: BlockPage }
  | { kind: 'mdx';   doc: Doc }
  | null

/**
 * Given slug parts (from Next.js params), returns the page to render
 * or null if neither a block page nor an MDX file exists.
 */
export function getPageBySlug(slugParts: string[]): PageResult {
  const slug = slugParts.join('/')

  // 1. Block-based page
  const blockPage = pageRegistry[slug]
  if (blockPage) return { kind: 'block', page: blockPage }

  // 2. MDX page
  const doc = getDocBySlug(slugParts)
  if (doc) return { kind: 'mdx', doc }

  return null
}
