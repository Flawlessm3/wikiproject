// ─────────────────────────────────────────────────────────────────────────────
// CONTENT BLOCKS — Discriminated Union
// ─────────────────────────────────────────────────────────────────────────────
//
// Each block has a required `type` field.
// BlockRenderer (src/components/blocks/BlockRenderer.tsx) dispatches to the
// correct React component based on this field.
//
// To add a new block type:
//   1. Add the interface here
//   2. Add it to ContentBlock union
//   3. Create src/components/blocks/MyNewBlock.tsx
//   4. Add a case in BlockRenderer.tsx
// ─────────────────────────────────────────────────────────────────────────────

export type CalloutVariant = 'info' | 'tip' | 'warning' | 'danger' | 'note'

// ── Shared sub-types ──────────────────────────────────────────────────────────

export interface FAQItem {
  question: string
  answer: string   // supports inline markdown: **bold**, *italic*, `code`, [link](url)
}

export interface CommandItem {
  command: string          // e.g. "/tp"
  description: string      // supports inline markdown
  usage?: string           // e.g. "/tp <игрок>"
  aliases?: string[]
  permission?: string      // e.g. "craftquest.admin.tp"
  permissionDefault?: 'op' | 'all' | 'none'
}

export interface StepItem {
  title: string
  description?: string    // supports inline markdown
  code?: string           // optional code snippet shown verbatim
  codeLanguage?: string
  note?: string           // tip shown below code, supports inline markdown
}

export interface CardItem {
  title: string
  description?: string    // supports inline markdown
  href?: string           // if set, card becomes a clickable link
  badge?: string
}

export interface FileTreeNode {
  name: string
  type: 'file' | 'dir'
  description?: string    // shown on hover
  children?: FileTreeNode[]
}

export interface PermissionItem {
  node: string            // permission node string
  description: string
  default?: 'op' | 'all' | 'none'
}

/** List item: plain string, nested item, or checkbox item */
export type ListItem =
  | string
  | { text: string; children?: string[] }
  | { text: string; checked: boolean }

// ── Block union ────────────────────────────────────────────────────────────────

export type ContentBlock =
  | { type: 'paragraph';   content: string }
  | { type: 'heading';     level: 2 | 3 | 4; text: string; id?: string }
  | { type: 'list';        style: 'bullet' | 'ordered' | 'check'; items: ListItem[] }
  | { type: 'table';       headers: string[]; rows: string[][]; caption?: string }
  | { type: 'callout';     variant: CalloutVariant; title?: string; content: string }
  | { type: 'code';        language?: string; filename?: string; content: string }
  | { type: 'faq';         title?: string; items: FAQItem[] }
  | { type: 'commands';    title?: string; category?: string; items: CommandItem[] }
  | { type: 'steps';       title?: string; items: StepItem[] }
  | { type: 'cards';       columns?: 2 | 3 | 4; items: CardItem[] }
  | { type: 'fileTree';    title?: string; root: FileTreeNode[] }
  | { type: 'permissions'; title?: string; items: PermissionItem[] }
  | { type: 'divider' }
