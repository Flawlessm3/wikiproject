import type { UILabels } from '@/types/wiki-config'

// ─────────────────────────────────────────────────────────────────────────────
// UI LABELS — все пользовательские строки интерфейса в одном месте
// ─────────────────────────────────────────────────────────────────────────────
//
// Измени любой текст здесь — и он автоматически обновится везде на сайте
// без правки компонентов.
//
// Компоненты, использующие эти лейблы:
//   • TOCPanel           → toc.*
//   • SearchModal        → search.*
//   • PaginationNav      → pagination.*
//   • FeedbackBlock      → feedback.*
//   • ArticleMeta        → article.*
//   • Sidebar            → sidebar.*
// ─────────────────────────────────────────────────────────────────────────────

export const uiLabels: UILabels = {
  toc: {
    title: 'На этой странице',
  },

  search: {
    placeholder: 'Поиск по вики…',
    empty: 'Начните вводить текст для поиска…',
    noResults: 'Ничего не найдено',
    noResultsHint: 'Попробуйте другой запрос',
    triggerLabel: 'Поиск по вики…',
    shortcut: '⌘K',
  },

  pagination: {
    previous: 'Предыдущая',
    next: 'Следующая',
  },

  feedback: {
    question: 'Эта страница была полезной?',
    yes: 'Да',
    no: 'Нет',
    thanksYes: '🙌 Спасибо! Рады, что помогло.',
    thanksNo: '😔 Спасибо за отзыв. Постараемся улучшить.',
  },

  article: {
    copyLink: 'Скопировать ссылку',
    copied: 'Скопировано!',
  },

  sidebar: {
    searchLabel: 'Быстрый поиск…',
  },
}
