import type { NavConfig } from '@/types/wiki-config'

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION CONFIG — единственный источник правды для структуры сайдбара
// ─────────────────────────────────────────────────────────────────────────────
//
// КАК ДОБАВИТЬ НОВУЮ СТРАНИЦУ:
//   1. Создать файл контента:
//      • Блочная страница: content/pages/<slug>.ts
//      • MDX-статья:       content/docs/<slug>.mdx
//   2. Зарегистрировать блочную страницу в content/pages/_registry.ts
//   3. Добавить NavItemConfig ниже
//   → страница появится в сайдбаре и получит пред/след навигацию
//
// ПОЛЯ NavItemConfig:
//   slug     — путь относительно /docs/, например "wiki" или "plugins/cq-chat"
//   hidden   — true = скрыто из сайдбара и из пред/след (удобно для черновиков)
//   draft    — то же что hidden
//   disabled — отображается, но не кликается
//   badge    — чип-метка: "New" / "Ref" / "Soon" / любой текст
//   order    — позиция внутри группы (меньше = выше)
// ─────────────────────────────────────────────────────────────────────────────

export const navigationConfig: NavConfig = {
  groups: [
    // ── Основные разделы ────────────────────────────────────────────────────
    {
      id: 'main',
      title: 'Основное',
      order: 0,
      items: [
        { id: 'wiki-home',  title: 'Главная',   slug: 'wiki',      order: 0 },
        { id: 'wiki-faq',   title: 'FAQ',        slug: 'faq',       order: 1 },
        { id: 'wiki-cmds',  title: 'Команды',    slug: 'commands',  order: 2, badge: 'Ref' },
        { id: 'wiki-gloss', title: 'Словарь',    slug: 'glossary',  order: 3 },
      ],
    },

    // ── Плагины ─────────────────────────────────────────────────────────────
    {
      id: 'plugins',
      title: 'Плагины',
      order: 1,
      collapsible: true,
      defaultOpen: true,
      items: [
        { id: 'plugins-home',  title: 'Обзор',           slug: 'plugins',                 order: 0 },
        { id: 'cq-chat',       title: 'CQ Chat',          slug: 'plugins/cq-chat',         order: 1, badge: 'New' },
        { id: 'cq-modelka',    title: 'CQ Моделка',       slug: 'plugins/cq-modelka',      order: 2 },
        { id: 'cq-otcladka',   title: 'CQ Отладка',       slug: 'plugins/cq-otcladka',     order: 3, disabled: true, badge: 'Soon' },
        { id: 'cq-eternity',   title: 'Eternity Pass',    slug: 'plugins/cq-eternity-pass',order: 4, disabled: true, badge: 'Soon' },
      ],
    },

    // ── Администрирование (пример скрытой группы-заглушки) ──────────────────
    // Раскомментируй когда будут готовы страницы:
    //
    // {
    //   id: 'admin',
    //   title: 'Администрирование',
    //   order: 2,
    //   collapsible: true,
    //   defaultOpen: false,
    //   items: [
    //     { id: 'admin-setup',  title: 'Настройка сервера', slug: 'admin/setup',   order: 0, draft: true },
    //     { id: 'admin-perms',  title: 'Права доступа',     slug: 'admin/perms',   order: 1, draft: true },
    //   ],
    // },
  ],
}
