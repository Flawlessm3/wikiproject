// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  title: string
  slug: string        // relative to /docs/, e.g. "getting-started/introduction"
  badge?: string      // optional label badge ("New", "Soon", etc.)
  disabled?: boolean
}

export interface NavGroup {
  title: string
  items: NavItem[]
  collapsible?: boolean     // can be collapsed by the user
  defaultOpen?: boolean     // initial open state (default: true)
}

// ─── Document (MDX-based) ────────────────────────────────────────────────────

export interface DocFrontmatter {
  title: string
  description?: string
  category?: string
  tags?: string[]
  updatedAt?: string
  author?: string
  badge?: string          // badge shown in ArticleHeader
  related?: string[]      // slugs of related articles
}

export interface Doc {
  slug: string[]          // e.g. ["getting-started", "introduction"]
  href: string            // e.g. "/docs/getting-started/introduction"
  frontmatter: DocFrontmatter
  content: string         // raw MDX source
  filePath: string        // absolute path on disk
}

// ─── Block-based page ────────────────────────────────────────────────────────

export interface PageMeta {
  title: string
  description?: string
  slug: string
  category?: string
  tags?: string[]
  status?: 'published' | 'draft'
  updatedAt?: string
  author?: string
  version?: string
  badge?: string
  related?: string[]      // slugs of related pages
}

export interface BlockPage {
  meta: PageMeta
  blocks: import('./blocks').ContentBlock[]
}

// ─── Table of Contents ───────────────────────────────────────────────────────

export interface TOCItem {
  id: string
  title: string
  level: 2 | 3 | 4
  children?: TOCItem[]
}

// ─── Re-exports ──────────────────────────────────────────────────────────────

export type { ContentBlock, CalloutVariant } from './blocks'
export type { WikiConfig, UILabels, NavConfig, NavGroupConfig, NavItemConfig } from './wiki-config'
