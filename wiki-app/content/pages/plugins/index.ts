import type { BlockPage } from '@/types'

const page: BlockPage = {
  meta: {
    title: 'Плагины',
    description: 'Обзор кастомных плагинов сервера CraftQuest — описание, возможности и документация.',
    slug: 'plugins',
    category: 'Плагины',
    updatedAt: '2026-02-24',
    tags: ['плагины', 'обзор'],
  },

  blocks: [
    {
      type: 'paragraph',
      content:
        'На сервере CraftQuest установлены собственные плагины, разработанные специально ' +
        'для нашего сообщества. Каждый плагин имеет отдельную страницу с документацией.',
    },

    {
      type: 'callout',
      variant: 'info',
      content:
        'Плагины регулярно обновляются. Следите за анонсами в Discord-канале **#обновления**.',
    },

    {
      type: 'heading',
      level: 2,
      text: 'Доступные плагины',
    },

    {
      type: 'cards',
      columns: 2,
      items: [
        {
          title: 'CQ Chat',
          description:
            'Расширенная система чата: каналы, форматирование, эмодзи, ' +
            'персональные сообщения и фильтрация спама.',
          href: '/docs/plugins/cq-chat',
          badge: 'New',
        },
        {
          title: 'CQ Моделка',
          description:
            'Кастомные 3D-модели предметов и мобов с поддержкой ресурспаков. ' +
            'Позволяет добавлять уникальный инвентарь.',
          href: '/docs/plugins/cq-modelka',
        },
        {
          title: 'CQ Отладка',
          description:
            'Инструменты для разработки и отладки серверных плагинов. Только для разработчиков.',
          badge: 'Soon',
        },
        {
          title: 'Eternity Pass',
          description:
            'Боевой пропуск с сезонными заданиями, наградами и уникальным контентом.',
          badge: 'Soon',
        },
      ],
    },

    {
      type: 'heading',
      level: 2,
      text: 'Для разработчиков',
    },

    {
      type: 'paragraph',
      content:
        'Плагины с открытым исходным кодом доступны на GitHub. ' +
        'Pull request\'ы и баг-репорты приветствуются.',
    },

    {
      type: 'callout',
      variant: 'tip',
      title: 'Хочешь помочь?',
      content:
        'Если у тебя есть идея нового плагина или улучшения — ' +
        'напиши в Discord-канале **#разработка**.',
    },
  ],
}

export default page
