import type { BlockPage } from '@/types'

const page: BlockPage = {
  meta: {
    title: 'Список команд',
    description: 'Полный справочник игровых команд сервера CraftQuest с описанием, использованием и правами доступа.',
    slug: 'commands',
    category: 'Основное',
    badge: 'Ref',
    updatedAt: '2026-02-24',
    tags: ['команды', 'справочник', 'права'],
    related: ['wiki', 'glossary'],
  },

  blocks: [
    {
      type: 'paragraph',
      content:
        'Ниже перечислены все доступные команды. ' +
        'Аргументы в `<угловых скобках>` обязательны, в `[квадратных]` — необязательны.',
    },

    {
      type: 'callout',
      variant: 'info',
      content: 'Команды можно также смотреть в игре: `/help <команда>`',
    },

    // ── Основные команды ─────────────────────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      text: 'Основные команды',
    },

    {
      type: 'commands',
      items: [
        {
          command: '/help',
          usage: '/help [команда]',
          description: 'Показывает список доступных команд или справку по конкретной команде.',
          permission: 'minecraft.command.help',
          permissionDefault: 'all',
        },
        {
          command: '/spawn',
          description: 'Телепортирует на спавн сервера.',
          permission: 'craftquest.spawn',
          permissionDefault: 'all',
        },
        {
          command: '/home',
          usage: '/home [название]',
          description: 'Телепортирует к сохранённой домашней точке.',
          aliases: ['h'],
          permission: 'craftquest.home',
          permissionDefault: 'all',
        },
        {
          command: '/sethome',
          usage: '/sethome [название]',
          description: 'Устанавливает домашнюю точку на текущей позиции. Без названия — стандартный дом.',
          permission: 'craftquest.sethome',
          permissionDefault: 'all',
        },
        {
          command: '/delhome',
          usage: '/delhome [название]',
          description: 'Удаляет сохранённую домашнюю точку.',
          permission: 'craftquest.delhome',
          permissionDefault: 'all',
        },
        {
          command: '/tpa',
          usage: '/tpa <игрок>',
          description: 'Отправляет запрос на телепортацию к указанному игроку.',
          permission: 'craftquest.tpa',
          permissionDefault: 'all',
        },
        {
          command: '/tpaccept',
          usage: '/tpaccept [игрок]',
          description: 'Принимает входящий запрос на телепортацию.',
          aliases: ['tpyes'],
          permission: 'craftquest.tpaccept',
          permissionDefault: 'all',
        },
        {
          command: '/tpdeny',
          description: 'Отклоняет входящий запрос на телепортацию.',
          aliases: ['tpno'],
          permission: 'craftquest.tpdeny',
          permissionDefault: 'all',
        },
      ],
    },

    // ── Экономика ────────────────────────────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      text: 'Экономика',
    },

    {
      type: 'commands',
      items: [
        {
          command: '/balance',
          usage: '/balance [игрок]',
          description: 'Показывает баланс вашего счёта (или другого игрока).',
          aliases: ['bal', 'money'],
          permission: 'craftquest.economy.balance',
          permissionDefault: 'all',
        },
        {
          command: '/pay',
          usage: '/pay <игрок> <сумма>',
          description: 'Переводит монеты другому игроку.',
          permission: 'craftquest.economy.pay',
          permissionDefault: 'all',
        },
        {
          command: '/shop',
          description: 'Открывает серверный магазин ресурсов.',
          permission: 'craftquest.shop',
          permissionDefault: 'all',
        },
        {
          command: '/market',
          description: 'Открывает игрецкий аукцион для торговли между игроками.',
          aliases: ['auction', 'ah'],
          permission: 'craftquest.market',
          permissionDefault: 'all',
        },
      ],
    },

    // ── Чат ─────────────────────────────────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      text: 'Чат',
    },

    {
      type: 'commands',
      items: [
        {
          command: '/msg',
          usage: '/msg <игрок> <сообщение>',
          description: 'Отправляет личное сообщение игроку.',
          aliases: ['pm', 'tell', 'w'],
          permission: 'craftquest.msg',
          permissionDefault: 'all',
        },
        {
          command: '/reply',
          usage: '/reply <сообщение>',
          description: 'Отвечает последнему собеседнику в личных сообщениях.',
          aliases: ['r'],
          permission: 'craftquest.reply',
          permissionDefault: 'all',
        },
        {
          command: '/ignore',
          usage: '/ignore <игрок>',
          description: 'Игнорирует чат указанного игрока (или убирает игнор).',
          permission: 'craftquest.ignore',
          permissionDefault: 'all',
        },
      ],
    },

    // ── Администраторские ────────────────────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      text: 'Администраторские команды',
    },

    {
      type: 'callout',
      variant: 'warning',
      content: 'Команды ниже доступны только администраторам и модераторам сервера.',
    },

    {
      type: 'commands',
      items: [
        {
          command: '/ban',
          usage: '/ban <игрок> [причина]',
          description: 'Перманентно банит игрока.',
          permission: 'craftquest.admin.ban',
          permissionDefault: 'op',
        },
        {
          command: '/tempban',
          usage: '/tempban <игрок> <время> [причина]',
          description: 'Временно банит игрока. Время: `1h`, `7d`, `30d` и т.д.',
          permission: 'craftquest.admin.tempban',
          permissionDefault: 'op',
        },
        {
          command: '/kick',
          usage: '/kick <игрок> [причина]',
          description: 'Кикает игрока с сервера.',
          permission: 'craftquest.admin.kick',
          permissionDefault: 'op',
        },
        {
          command: '/mute',
          usage: '/mute <игрок> [время] [причина]',
          description: 'Отключает игроку возможность писать в чат.',
          permission: 'craftquest.admin.mute',
          permissionDefault: 'op',
        },
        {
          command: '/tp',
          usage: '/tp <игрок> [цель]',
          description: 'Принудительно телепортирует игрока.',
          permission: 'craftquest.admin.tp',
          permissionDefault: 'op',
        },
        {
          command: '/broadcast',
          usage: '/broadcast <сообщение>',
          description: 'Рассылает сообщение всем игрокам на сервере.',
          aliases: ['bc'],
          permission: 'craftquest.admin.broadcast',
          permissionDefault: 'op',
        },
      ],
    },
  ],
}

export default page
