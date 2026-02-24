import type { BlockPage } from '@/types'

// ─────────────────────────────────────────────────────────────────────────────
// PAGE REGISTRY — реестр всех блочных страниц
// ─────────────────────────────────────────────────────────────────────────────
//
// КАК ДОБАВИТЬ НОВУЮ СТРАНИЦУ:
//   1. Создать файл: content/pages/<slug>.ts  (экспорт `export default page`)
//   2. Добавить строку ниже:
//        'my-slug': (await import('./my-slug')).default,
//      ИЛИ статически (рекомендуется):
//        import myPage from './my-slug'
//        ... 'my-slug': myPage,
//   3. Добавить slug в content/config/navigation.ts
//
// КЛЮЧ = slug (то, что стоит после /docs/)
// ─────────────────────────────────────────────────────────────────────────────

import wikiHome       from './wiki/index'
import wikiFaq        from './wiki/faq'
import wikiCommands   from './wiki/commands'
import wikiGlossary   from './wiki/glossary'
import pluginsHome    from './plugins/index'
import pluginCqChat   from './plugins/cq-chat'
import pluginCqModelka from './plugins/cq-modelka'

export const pageRegistry: Record<string, BlockPage> = {
  // ── Основное ──────────────────────────────────────────────────────────────
  'wiki':      wikiHome,
  'faq':       wikiFaq,
  'commands':  wikiCommands,
  'glossary':  wikiGlossary,

  // ── Плагины ───────────────────────────────────────────────────────────────
  'plugins':            pluginsHome,
  'plugins/cq-chat':    pluginCqChat,
  'plugins/cq-modelka': pluginCqModelka,

  // ── Добавляй новые страницы ниже ──────────────────────────────────────────
  // 'admin/setup': adminSetupPage,
  // 'events/summer-2026': summerEventPage,
}
