import type { WikiConfig } from '@/types/wiki-config'

// ─────────────────────────────────────────────────────────────────────────────
// WIKI SITE CONFIG
// ─────────────────────────────────────────────────────────────────────────────
//
// Edit this file to change:
//   • Site name and description (shown in navbar + meta tags)
//   • Top navigation bar links
//   • Version badge
//   • GitHub link
//   • Default first page (redirect target for /docs)
//
// After editing, restart the dev server for changes to apply.
// ─────────────────────────────────────────────────────────────────────────────

export const wikiConfig: WikiConfig = {
  site: {
    // ── Brand ─────────────────────────────────────────────────
    name: 'CraftQuest Wiki',
    description: 'Официальная документация игрового сервера CraftQuest',
    logoText: 'CQ Wiki',
    version: 'v1.0',
    // Set to your GitHub repo URL or remove the field
    githubUrl: 'https://github.com/your-org/your-repo',
  },

  navbar: {
    // ── Top nav links ─────────────────────────────────────────
    // Add, remove or reorder entries freely.
    // external: true → opens in new tab
    links: [
      { label: 'Вики',    href: '/docs' },
      { label: 'Discord', href: 'https://discord.gg/example', external: true },
      { label: 'Сайт',   href: 'https://craftquest.example.ru', external: true },
    ],

    showThemeToggle: true,
    showSearch: true,
    showGithub: true,
  },

  docs: {
    baseRoute: '/docs',

    // ── Default page ──────────────────────────────────────────
    // Slug of the page /docs redirects to.
    // Must match a slug in content/config/navigation.ts
    defaultSlug: 'wiki',
  },
}
