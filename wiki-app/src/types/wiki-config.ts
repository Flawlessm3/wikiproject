// ─────────────────────────────────────────────────────────────────────────────
// WIKI CONFIG TYPES
// ─────────────────────────────────────────────────────────────────────────────
//
// These types describe the shape of the editable config files in:
//   content/config/wiki.config.ts  — site name, navbar, version
//   content/config/ui-labels.ts    — all UI text strings
//   content/config/navigation.ts   — sidebar structure
//
// DO NOT change values here — edit the config files above instead.
// ─────────────────────────────────────────────────────────────────────────────

// ── Navigation config ─────────────────────────────────────────────────────────

export interface NavItemConfig {
  /** Unique identifier */
  id: string
  /** Display text in sidebar */
  title: string
  /**
   * Slug relative to /docs/
   * "wiki"              → /docs/wiki
   * "plugins/cq-chat"  → /docs/plugins/cq-chat
   */
  slug: string
  /** Sort index (lower = first) */
  order?: number
  /** Label chip shown next to title ("New", "Ref", "Soon", …) */
  badge?: string
  /** Shown in sidebar but not clickable */
  disabled?: boolean
  /** Completely excluded from sidebar and prev/next */
  hidden?: boolean
  /** Same as hidden — marks the page as unpublished */
  draft?: boolean
  /** Override href (for external links) */
  href?: string
}

export interface NavGroupConfig {
  id: string
  title: string
  order?: number
  collapsible?: boolean
  defaultOpen?: boolean
  items: NavItemConfig[]
}

export interface NavConfig {
  groups: NavGroupConfig[]
}

// ── Site config ───────────────────────────────────────────────────────────────

export interface NavbarLinkConfig {
  label: string
  href: string
  /** Open in new tab */
  external?: boolean
  badge?: string
}

export interface WikiConfig {
  site: {
    /** Site name shown in navbar brand */
    name: string
    /** Short description (meta) */
    description: string
    /** Text shown in the top-left logo */
    logoText: string
    /** Optional version badge, e.g. "v1.2" */
    version?: string
    /** URL for the GitHub icon link */
    githubUrl?: string
  }
  navbar: {
    links: NavbarLinkConfig[]
    showThemeToggle: boolean
    showSearch: boolean
    showGithub: boolean
  }
  docs: {
    /** Route prefix — keep as "/docs" unless you change App Router structure */
    baseRoute: string
    /** Slug of the page shown at /docs (root redirect) */
    defaultSlug: string
  }
}

// ── UI labels ─────────────────────────────────────────────────────────────────

export interface UILabels {
  toc: {
    title: string            // "На этой странице"
  }
  search: {
    placeholder: string      // "Поиск по вики…"
    empty: string            // "Начните вводить текст…"
    noResults: string        // "Ничего не найдено"
    noResultsHint: string    // "Попробуйте другой запрос"
    triggerLabel: string     // text in the search button
    shortcut: string         // "⌘K"
  }
  pagination: {
    previous: string         // "Предыдущая"
    next: string             // "Следующая"
  }
  feedback: {
    question: string         // "Эта страница полезна?"
    yes: string              // "Да"
    no: string               // "Нет"
    thanksYes: string
    thanksNo: string
  }
  article: {
    copyLink: string         // "Скопировать ссылку"
    copied: string           // "Скопировано!"
  }
  sidebar: {
    searchLabel: string      // "Быстрый поиск…"
  }
}
