// ─────────────────────────────────────────────────────────────────────────────
// Wiki Types — complete type system for the JSON-backed wiki CMS
// ─────────────────────────────────────────────────────────────────────────────

// ── Sub-types shared across blocks ───────────────────────────────────────────

export type CalloutVariant = 'info' | 'tip' | 'warning' | 'danger' | 'note'

export interface ListItem {
  text: string
  checked?: boolean
  children?: string[]
}

export interface FAQItem {
  question: string
  answer: string
}

export interface CommandItem {
  command: string
  description: string
  usage?: string
  aliases?: string[]
  permission?: string
  permissionDefault?: 'all' | 'op' | 'none'
}

export interface StepItem {
  title: string
  description?: string
  code?: string
  note?: string
}

export interface CardItem {
  title: string
  description?: string
  href?: string
  badge?: string
  icon?: string
}

export interface FileTreeNode {
  name: string
  type: 'file' | 'dir'
  description?: string
  children?: FileTreeNode[]
}

export interface PermissionItem {
  node: string
  description: string
  default: 'all' | 'op' | 'none'
}

export interface StatItem {
  label: string
  value: string
  unit?: string
}

export interface RecipeIngredient {
  slot: string
  item: string
  count?: number
}

export interface LinkListItem {
  title: string
  href: string
  description?: string
  external?: boolean
}

// ── Content blocks — discriminated union with id on every block ───────────────

export type ContentBlock =
  // Existing 13 types (all with id)
  | { id: string; type: 'paragraph';   content: string }
  | { id: string; type: 'heading';     level: 2 | 3 | 4; text: string; anchor?: string }
  | { id: string; type: 'list';        style: 'bullet' | 'ordered' | 'check'; items: ListItem[] }
  | { id: string; type: 'table';       headers: string[]; rows: string[][]; caption?: string }
  | { id: string; type: 'callout';     variant: CalloutVariant; title?: string; content: string }
  | { id: string; type: 'code';        language?: string; filename?: string; content: string }
  | { id: string; type: 'faq';         title?: string; items: FAQItem[] }
  | { id: string; type: 'commands';    title?: string; category?: string; items: CommandItem[] }
  | { id: string; type: 'steps';       title?: string; items: StepItem[] }
  | { id: string; type: 'cards';       columns?: 2 | 3 | 4; items: CardItem[] }
  | { id: string; type: 'fileTree';    title?: string; root: FileTreeNode[] }
  | { id: string; type: 'permissions'; title?: string; items: PermissionItem[] }
  | { id: string; type: 'divider' }
  // 7 new types
  | { id: string; type: 'image';    src: string; alt: string; caption?: string }
  | { id: string; type: 'quote';    content: string; author?: string }
  | { id: string; type: 'stats';    title?: string; items: StatItem[] }
  | { id: string; type: 'recipe';   title?: string; ingredients: RecipeIngredient[]; result: string; shape?: string[][] }
  | { id: string; type: 'linklist'; title?: string; items: LinkListItem[] }
  | { id: string; type: 'section';  title: string; description?: string; children: ContentBlock[] }
  | { id: string; type: 'rawmd';    content: string }

export type BlockType = ContentBlock['type']

// ── Page document ─────────────────────────────────────────────────────────────

export interface PageMeta {
  title: string
  slug: string
  description?: string
  tags?: string[]
  status: 'draft' | 'published'
  updatedAt: string           // ISO date string e.g. "2026-02-24"
  author?: string
  related?: string[]          // slugs of related pages
  badge?: string
  category?: string
}

export interface PageDocument {
  id: string                  // UUID
  meta: PageMeta
  blocks: ContentBlock[]
}

// ── Navigation ────────────────────────────────────────────────────────────────

export type NavNodeType = 'group' | 'page' | 'link'

export interface NavNode {
  id: string
  type: NavNodeType
  title: string
  order: number
  // Page-specific
  slug?: string
  badge?: string
  hidden?: boolean
  draft?: boolean
  disabled?: boolean
  // Group-specific
  collapsible?: boolean
  defaultOpen?: boolean
  children?: NavNode[]
  // Link-specific
  href?: string
  external?: boolean
}

// ── Settings ──────────────────────────────────────────────────────────────────

export interface NavbarLink {
  label: string
  href: string
  external?: boolean
  badge?: string
}

export type AccentColor = 'indigo' | 'violet' | 'blue' | 'emerald' | 'rose' | 'amber'

export interface WikiSettings {
  name: string
  description: string
  logoText: string
  version?: string
  githubUrl?: string
  defaultSlug: string
  accentColor: AccentColor
  navbarLinks: NavbarLink[]
  showThemeToggle: boolean
  showSearch: boolean
  showGithub: boolean
  uiLabels: UILabels
}

export interface UILabels {
  toc: { title: string }
  search: {
    placeholder: string
    empty: string
    noResults: string
    noResultsHint: string
    triggerLabel: string
    shortcut: string
  }
  pagination: { previous: string; next: string }
  feedback: {
    question: string
    yes: string
    no: string
    thanksYes: string
    thanksNo: string
  }
  article: { copyLink: string; copied: string }
  sidebar: { searchLabel: string }
}

// ── Root data envelope ────────────────────────────────────────────────────────

export interface WikiData {
  version: string               // schema version e.g. "1.0"
  settings: WikiSettings
  navigation: NavNode[]         // top-level nodes; groups contain children
  pages: Record<string, PageDocument>  // key === page slug
}

// ── Helper type for TOC ───────────────────────────────────────────────────────

export interface TOCItem {
  id: string
  text: string
  level: number
  children: TOCItem[]
}
