import type { BlockPage } from '@/types'

const page: BlockPage = {
  meta: {
    title: 'CQ Chat',
    description: 'Документация плагина CQ Chat — расширенная система чата для сервера CraftQuest.',
    slug: 'plugins/cq-chat',
    category: 'Плагины',
    badge: 'New',
    updatedAt: '2026-02-24',
    tags: ['плагины', 'чат', 'cq-chat'],
    related: ['plugins', 'commands'],
  },

  blocks: [
    {
      type: 'paragraph',
      content:
        'CQ Chat — кастомный плагин чата для CraftQuest. Поддерживает ' +
        'цветной текст, каналы, упоминания, фильтрацию нежелательного контента ' +
        'и интеграцию с Discord.',
    },

    {
      type: 'callout',
      variant: 'info',
      title: 'Версия',
      content: 'Текущая версия: **1.4.2**. Требует Paper 1.20+.',
    },

    // ── Возможности ──────────────────────────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      text: 'Возможности',
    },

    {
      type: 'list',
      style: 'bullet',
      items: [
        { text: 'Каналы чата', children: ['Глобальный', 'Локальный (в радиусе 100 блоков)', 'Торговый', 'Тихий (только для персонала)'] },
        'Цветное форматирование текста для доноров',
        'Фильтр нецензурных слов с настраиваемым словарём',
        'Упоминания через @ник с уведомлением',
        'Интеграция с Discord-каналом через вебхук',
        'История сообщений (последние 100)',
      ],
    },

    // ── Команды ──────────────────────────────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      text: 'Команды',
    },

    {
      type: 'commands',
      items: [
        {
          command: '/channel',
          usage: '/channel <название>',
          description: 'Переключает активный канал чата.',
          aliases: ['ch'],
          permission: 'cqchat.channel',
          permissionDefault: 'all',
        },
        {
          command: '/channel list',
          description: 'Показывает список доступных каналов.',
          permission: 'cqchat.channel.list',
          permissionDefault: 'all',
        },
        {
          command: '/msg',
          usage: '/msg <игрок> <сообщение>',
          description: 'Отправляет личное сообщение.',
          aliases: ['pm', 'tell'],
          permission: 'cqchat.msg',
          permissionDefault: 'all',
        },
        {
          command: '/ignore',
          usage: '/ignore <игрок>',
          description: 'Добавляет игрока в список игнора или убирает из него.',
          permission: 'cqchat.ignore',
          permissionDefault: 'all',
        },
        {
          command: '/chatclear',
          description: 'Очищает чат для всех игроков. Только для модераторов.',
          aliases: ['clearchat', 'cc'],
          permission: 'cqchat.admin.clear',
          permissionDefault: 'op',
        },
        {
          command: '/chatmute',
          usage: '/chatmute [время]',
          description: 'Включает режим замолчания глобального чата. Время: `5m`, `1h`.',
          permission: 'cqchat.admin.mute',
          permissionDefault: 'op',
        },
      ],
    },

    // ── Права ────────────────────────────────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      text: 'Права доступа',
    },

    {
      type: 'permissions',
      items: [
        { node: 'cqchat.channel',        description: 'Переключение каналов чата',              default: 'all' },
        { node: 'cqchat.channel.list',   description: 'Просмотр списка каналов',                default: 'all' },
        { node: 'cqchat.msg',            description: 'Личные сообщения',                       default: 'all' },
        { node: 'cqchat.ignore',         description: 'Игнор игроков',                          default: 'all' },
        { node: 'cqchat.format.color',   description: 'Цветное форматирование текста',          default: 'none' },
        { node: 'cqchat.format.bold',    description: 'Жирный текст в чате',                    default: 'none' },
        { node: 'cqchat.mention.bypass', description: 'Упоминания несмотря на игнор',           default: 'op' },
        { node: 'cqchat.admin.clear',    description: 'Очистка глобального чата',               default: 'op' },
        { node: 'cqchat.admin.mute',     description: 'Замолчание всего чата',                  default: 'op' },
        { node: 'cqchat.admin.spy',      description: 'Просмотр всех личных сообщений',         default: 'op' },
      ],
    },

    // ── Настройка ────────────────────────────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      text: 'Настройка',
    },

    {
      type: 'steps',
      title: 'Установка и настройка CQ Chat',
      items: [
        {
          title: 'Установите плагин',
          description: 'Скопируйте `CQChat.jar` в папку `plugins/` и перезапустите сервер.',
          code: 'cp CQChat.jar /server/plugins/',
        },
        {
          title: 'Отредактируйте config.yml',
          description: 'Откройте `plugins/CQChat/config.yml` и настройте каналы, дальность локального чата и Discord-вебхук.',
        },
        {
          title: 'Настройте права',
          description: 'Выдайте группам нужные права через ваш плагин прав (LuckPerms, GroupManager и т.п.).',
          code: 'lp group default permission set cqchat.channel true',
        },
        {
          title: 'Перезагрузите конфиг',
          description: 'После правки конфига можно перезагрузить без рестарта сервера.',
          code: '/chatreload',
          note: 'Некоторые настройки (порты, вебхуки) требуют полного рестарта сервера.',
        },
      ],
    },

    {
      type: 'heading',
      level: 2,
      text: 'Пример config.yml',
    },

    {
      type: 'code',
      language: 'yaml',
      filename: 'plugins/CQChat/config.yml',
      content: `channels:
  global:
    prefix: "&7[G]&r"
    range: -1          # -1 = весь сервер
    default: true
  local:
    prefix: "&a[L]&r"
    range: 100         # в блоках
  trade:
    prefix: "&6[Торг]&r"
    range: -1

discord:
  enabled: true
  webhook: "https://discord.com/api/webhooks/..."
  channel_id: "123456789"

filter:
  enabled: true
  action: "REPLACE"  # BLOCK | REPLACE | WARN
  replacement: "***"`,
    },
  ],
}

export default page
