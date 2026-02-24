import { v4 as uuidv4 } from 'uuid'
import type { ContentBlock, BlockType, WikiData } from '@/types/wiki'

// ── Block factory — creates a new block with UUID and sensible defaults ───────

export function createBlock(type: BlockType): ContentBlock {
  const id = uuidv4()
  switch (type) {
    case 'paragraph':   return { id, type, content: 'Новый параграф.' }
    case 'heading':     return { id, type, level: 2, text: 'Новый заголовок' }
    case 'list':        return { id, type, style: 'bullet', items: [{ text: 'Элемент 1' }, { text: 'Элемент 2' }] }
    case 'table':       return { id, type, headers: ['Колонка 1', 'Колонка 2'], rows: [['', '']] }
    case 'callout':     return { id, type, variant: 'info', title: '', content: 'Текст подсказки.' }
    case 'code':        return { id, type, language: 'bash', filename: '', content: '# Ваш код здесь' }
    case 'faq':         return { id, type, title: 'Частые вопросы', items: [{ question: 'Вопрос?', answer: 'Ответ.' }] }
    case 'commands':    return { id, type, title: 'Команды', items: [{ command: '/команда', description: 'Описание', permissionDefault: 'all' }] }
    case 'steps':       return { id, type, title: 'Шаги', items: [{ title: 'Шаг 1', description: 'Описание' }] }
    case 'cards':       return { id, type, columns: 2, items: [{ title: 'Карточка 1', description: 'Описание' }] }
    case 'fileTree':    return { id, type, title: 'Структура', root: [{ name: 'папка/', type: 'dir', children: [{ name: 'файл.txt', type: 'file' }] }] }
    case 'permissions': return { id, type, title: 'Права', items: [{ node: 'plugin.use', description: 'Использование', default: 'all' }] }
    case 'divider':     return { id, type }
    case 'image':       return { id, type, src: '', alt: 'Изображение', caption: '' }
    case 'quote':       return { id, type, content: 'Цитата.', author: '' }
    case 'stats':       return { id, type, title: 'Статистика', items: [{ label: 'Параметр', value: '100', unit: '' }] }
    case 'recipe':      return { id, type, title: 'Рецепт', ingredients: [{ slot: 'A', item: 'minecraft:iron_ingot', count: 1 }], result: 'Предмет' }
    case 'linklist':    return { id, type, title: 'Ссылки', items: [{ title: 'Ссылка', href: '/', description: '' }] }
    case 'section':     return { id, type, title: 'Раздел', description: '', children: [] }
    case 'rawmd':       return { id, type, content: '## Markdown\n\nВаш контент.' }
    default:            throw new Error(`Unknown block type: ${type}`)
  }
}

// ── Demo wiki data ────────────────────────────────────────────────────────────

export function createDemoWikiData(): WikiData {
  return {
    version: '1.0',
    settings: {
      name: 'CraftQuest Wiki',
      description: 'Официальная документация игрового сервера CraftQuest',
      logoText: 'CQ Wiki',
      version: 'v1.0',
      githubUrl: 'https://github.com/your-org/your-repo',
      defaultSlug: 'wiki',
      accentColor: 'indigo',
      navbarLinks: [
        { label: 'Вики', href: '/docs' },
        { label: 'Discord', href: 'https://discord.gg/example', external: true },
      ],
      showThemeToggle: true,
      showSearch: true,
      showGithub: true,
      uiLabels: {
        toc: { title: 'На этой странице' },
        search: {
          placeholder: 'Поиск по вики…',
          empty: 'Введите запрос для поиска',
          noResults: 'Ничего не найдено',
          noResultsHint: 'Попробуйте другой запрос',
          triggerLabel: 'Открыть поиск',
          shortcut: '⌘K',
        },
        pagination: { previous: 'Предыдущая', next: 'Следующая' },
        feedback: {
          question: 'Эта страница была полезной?',
          yes: 'Да',
          no: 'Нет',
          thanksYes: 'Спасибо! Рады помочь.',
          thanksNo: 'Спасибо! Мы постараемся улучшить.',
        },
        article: { copyLink: 'Скопировать ссылку', copied: 'Скопировано!' },
        sidebar: { searchLabel: 'Быстрый поиск…' },
      },
    },
    navigation: [
      {
        id: 'group-main',
        type: 'group',
        title: 'Основное',
        order: 0,
        collapsible: false,
        defaultOpen: true,
        children: [
          { id: 'page-wiki', type: 'page', title: 'Главная', slug: 'wiki', order: 0 },
          { id: 'page-faq', type: 'page', title: 'FAQ', slug: 'faq', order: 1 },
          { id: 'page-commands', type: 'page', title: 'Команды', slug: 'commands', order: 2, badge: 'Ref' },
          { id: 'page-glossary', type: 'page', title: 'Словарь', slug: 'glossary', order: 3 },
        ],
      },
      {
        id: 'group-plugins',
        type: 'group',
        title: 'Плагины',
        order: 1,
        collapsible: true,
        defaultOpen: true,
        children: [
          { id: 'page-plugins', type: 'page', title: 'Обзор плагинов', slug: 'plugins', order: 0 },
          { id: 'page-cq-chat', type: 'page', title: 'CQ Chat', slug: 'plugins/cq-chat', order: 1, badge: 'New' },
          { id: 'page-cq-modelka', type: 'page', title: 'CQ Моделка', slug: 'plugins/cq-modelka', order: 2 },
          { id: 'page-cq-otcladka', type: 'page', title: 'CQ Отладка', slug: 'plugins/cq-otcladka', order: 3, badge: 'Soon', disabled: true },
        ],
      },
    ],
    pages: {
      wiki: {
        id: uuidv4(),
        meta: {
          title: 'Добро пожаловать в CraftQuest Wiki',
          slug: 'wiki',
          description: 'Официальная документация сервера CraftQuest — плагины, команды, правила и FAQ.',
          tags: ['вики', 'главная', 'начало'],
          status: 'published',
          updatedAt: '2026-02-24',
          category: 'Основное',
        },
        blocks: [
          { id: uuidv4(), type: 'paragraph', content: 'CraftQuest — игровой сервер с уникальными плагинами и дружным сообществом. Здесь собрана вся информация для новичков и опытных игроков.' },
          { id: uuidv4(), type: 'callout', variant: 'info', title: 'Адрес сервера', content: 'Подключайтесь по адресу **play.craftquest.example.ru** (Java Edition 1.20+)' },
          { id: uuidv4(), type: 'heading', level: 2, text: 'Разделы вики' },
          { id: uuidv4(), type: 'cards', columns: 2, items: [
            { title: 'FAQ', description: 'Ответы на самые частые вопросы новичков и постоянных игроков.', href: '/docs/faq' },
            { title: 'Команды', description: 'Полный справочник игровых команд с описанием и правами.', href: '/docs/commands', badge: 'Ref' },
            { title: 'Словарь', description: 'Термины и сокращения, принятые на сервере.', href: '/docs/glossary' },
            { title: 'Плагины', description: 'Обзор установленных плагинов и инструкции по их использованию.', href: '/docs/plugins', badge: 'New' },
          ]},
          { id: uuidv4(), type: 'heading', level: 2, text: 'Быстрый старт' },
          { id: uuidv4(), type: 'steps', items: [
            { title: 'Подключитесь к серверу', description: 'Откройте Minecraft Java Edition 1.20 или выше и добавьте сервер `play.craftquest.example.ru` в список серверов.' },
            { title: 'Пройдите обучение', description: 'При первом входе вас встретит туториал. Следуйте подсказкам — это займёт около 3 минут.' },
            { title: 'Изучите команды', description: 'Базовые команды помогут вам перемещаться и взаимодействовать с другими игроками. Полный список доступен в разделе **[Команды](/docs/commands)**.' },
            { title: 'Вступите в Discord', description: 'В нашем Discord вы найдёте новости, анонсы и живое общение с сообществом.', note: 'Ссылка на Discord указана в правом верхнем углу сайта.' },
          ]},
          { id: uuidv4(), type: 'heading', level: 2, text: 'Основные правила' },
          { id: uuidv4(), type: 'list', style: 'check', items: [
            { text: 'Уважай других игроков — оскорбления недопустимы', checked: true },
            { text: 'Не используй читы, эксплойты и дюпы', checked: true },
            { text: 'Не grief чужие постройки', checked: true },
            { text: 'Не спамь в чате', checked: true },
            { text: 'Слушай указания администрации', checked: true },
          ]},
          { id: uuidv4(), type: 'callout', variant: 'warning', title: 'Нарушение правил', content: 'Нарушение правил влечёт бан от временного до перманентного. Апелляцию можно подать в Discord.' },
          { id: uuidv4(), type: 'heading', level: 2, text: 'О сервере' },
          { id: uuidv4(), type: 'table', headers: ['Параметр', 'Значение'], rows: [
            ['Версия', 'Java Edition 1.20.x'],
            ['Режим', 'Survival + Custom плагины'],
            ['Онлайн', 'Круглосуточно (99.9% uptime)'],
            ['Максимум игроков', '256'],
            ['Язык', 'Русский / English'],
          ]},
        ],
      },
      faq: {
        id: uuidv4(),
        meta: {
          title: 'FAQ — Часто задаваемые вопросы',
          slug: 'faq',
          description: 'Ответы на самые частые вопросы об игре на сервере CraftQuest.',
          tags: ['faq', 'вопросы', 'помощь'],
          status: 'published',
          updatedAt: '2026-02-24',
          category: 'Основное',
          related: ['wiki', 'commands'],
        },
        blocks: [
          { id: uuidv4(), type: 'paragraph', content: 'Здесь собраны ответы на вопросы, которые задают чаще всего. Если вы не нашли ответ — обратитесь в Discord.' },
          { id: uuidv4(), type: 'heading', level: 2, text: 'Общие вопросы' },
          { id: uuidv4(), type: 'faq', items: [
            { question: 'Как подключиться к серверу?', answer: 'Откройте Minecraft Java Edition 1.20+, нажмите «Multiplayer» → «Add Server» и введите адрес `play.craftquest.example.ru`.' },
            { question: 'Сервер платный?', answer: 'Игра на сервере **бесплатна**. Доступны донат-пакеты с косметическими преимуществами, но они не влияют на баланс.' },
            { question: 'Какой лаунчер нужен?', answer: 'Подойдёт официальный лаунчер Minecraft или любой лицензионный аналог с поддержкой Java Edition.' },
            { question: 'Есть ли защита регионов?', answer: 'Да. Используйте команду `/claim` чтобы защитить своё строение. Подробнее — в разделе Команды.' },
          ]},
          { id: uuidv4(), type: 'heading', level: 2, text: 'Игровой процесс' },
          { id: uuidv4(), type: 'faq', items: [
            { question: 'Как получить стартовый набор?', answer: 'Стартовый набор выдаётся автоматически при первом входе. Повторно его получить нельзя.' },
            { question: 'Где посмотреть баланс монет?', answer: 'Используйте команду `/balance` или `/bal`. Монеты зарабатываются за игру, продажу предметов и задания.' },
            { question: 'Можно ли торговать с другими игроками?', answer: 'Да! Используйте `/trade <игрок>` для безопасного обмена. Или разместите товар в магазине через `/shop`.' },
          ]},
          { id: uuidv4(), type: 'heading', level: 2, text: 'Технические вопросы' },
          { id: uuidv4(), type: 'faq', items: [
            { question: 'Большой пинг — что делать?', answer: 'Серверы находятся в России. Если пинг высокий — проверьте ваше интернет-соединение или смените провайдера DNS.' },
            { question: 'Вылет при входе на сервер', answer: 'Убедитесь, что версия Minecraft соответствует серверной (1.20.x). Попробуйте удалить кеш текстурпака в настройках.' },
            { question: 'Как подать жалобу на игрока?', answer: 'Используйте `/report <игрок> <причина>` в игре или создайте тикет в Discord-канале `#поддержка`.' },
          ]},
        ],
      },
      commands: {
        id: uuidv4(),
        meta: {
          title: 'Команды',
          slug: 'commands',
          description: 'Полный справочник игровых команд сервера CraftQuest с описанием и правами доступа.',
          tags: ['команды', 'справочник', 'чит-лист'],
          status: 'published',
          updatedAt: '2026-02-24',
          badge: 'Ref',
          category: 'Основное',
          related: ['wiki', 'faq'],
        },
        blocks: [
          { id: uuidv4(), type: 'paragraph', content: 'Справочник всех доступных команд. Аргументы в `<угловых>` скобках — обязательные, в `[квадратных]` — необязательные.' },
          { id: uuidv4(), type: 'heading', level: 2, text: 'Основные команды' },
          { id: uuidv4(), type: 'commands', category: 'Основное', items: [
            { command: '/spawn', description: 'Телепортация на спавн сервера', permissionDefault: 'all' },
            { command: '/home', usage: '/home [название]', description: 'Телепортация домой или к именованному дому', permissionDefault: 'all' },
            { command: '/sethome', usage: '/sethome [название]', description: 'Установить точку дома', permissionDefault: 'all' },
            { command: '/tp', usage: '/tp <игрок>', description: 'Запрос телепортации к игроку', permissionDefault: 'all' },
            { command: '/tpa', usage: '/tpa <игрок>', description: 'Принять запрос телепортации', permissionDefault: 'all' },
            { command: '/back', description: 'Вернуться на предыдущую позицию', permissionDefault: 'all' },
          ]},
          { id: uuidv4(), type: 'heading', level: 2, text: 'Экономика' },
          { id: uuidv4(), type: 'commands', category: 'Экономика', items: [
            { command: '/balance', aliases: ['/bal'], description: 'Показать баланс монет', permissionDefault: 'all' },
            { command: '/pay', usage: '/pay <игрок> <сумма>', description: 'Перевести монеты другому игроку', permissionDefault: 'all' },
            { command: '/shop', description: 'Открыть серверный магазин', permissionDefault: 'all' },
            { command: '/sell', usage: '/sell <рука|все>', description: 'Продать предметы в руке или весь инвентарь', permissionDefault: 'all' },
          ]},
          { id: uuidv4(), type: 'heading', level: 2, text: 'Чат' },
          { id: uuidv4(), type: 'commands', category: 'Чат', items: [
            { command: '/msg', usage: '/msg <игрок> <текст>', aliases: ['/pm', '/tell'], description: 'Личное сообщение', permissionDefault: 'all' },
            { command: '/ignore', usage: '/ignore <игрок>', description: 'Игнорировать игрока в чате', permissionDefault: 'all' },
            { command: '/channel', usage: '/channel <название>', aliases: ['/ch'], description: 'Переключить канал чата', permissionDefault: 'all' },
          ]},
          { id: uuidv4(), type: 'heading', level: 2, text: 'Администрация' },
          { id: uuidv4(), type: 'commands', category: 'Администрация', items: [
            { command: '/ban', usage: '/ban <игрок> [причина]', description: 'Бан игрока', permission: 'bukkit.command.ban', permissionDefault: 'op' },
            { command: '/kick', usage: '/kick <игрок> [причина]', description: 'Выгнать игрока с сервера', permission: 'bukkit.command.kick', permissionDefault: 'op' },
            { command: '/mute', usage: '/mute <игрок> [время]', description: 'Заглушить игрока в чате', permission: 'essentials.mute', permissionDefault: 'op' },
            { command: '/gamemode', usage: '/gamemode <режим>', aliases: ['/gm'], description: 'Изменить режим игры', permission: 'bukkit.command.gamemode', permissionDefault: 'op' },
          ]},
        ],
      },
      glossary: {
        id: uuidv4(),
        meta: {
          title: 'Словарь терминов',
          slug: 'glossary',
          description: 'Термины, сокращения и жаргон, принятые на сервере CraftQuest.',
          tags: ['словарь', 'термины', 'справочник'],
          status: 'published',
          updatedAt: '2026-02-24',
          category: 'Основное',
          related: ['wiki', 'commands'],
        },
        blocks: [
          { id: uuidv4(), type: 'paragraph', content: 'Краткий словарь терминов, которые используются в игре, в чате и на вики.' },
          { id: uuidv4(), type: 'heading', level: 2, text: 'А — Г' },
          { id: uuidv4(), type: 'table', headers: ['Термин', 'Определение'], rows: [
            ['АФК / AFK', 'Away From Keyboard — игрок неактивен. Сервер кикает AFK через 15 минут.'],
            ['Баф', 'Временный положительный эффект (зелье скорости, силы и т.п.).'],
            ['Гринд', 'Монотонное накопление ресурсов или опыта.'],
            ['Грифер', 'Игрок, который ломает или крадёт чужие постройки.'],
          ]},
          { id: uuidv4(), type: 'heading', level: 2, text: 'Д — З' },
          { id: uuidv4(), type: 'table', headers: ['Термин', 'Определение'], rows: [
            ['Дебаф', 'Временный отрицательный эффект (замедление, слабость и т.п.).'],
            ['Донат', 'Добровольное пожертвование серверу в обмен на косметические привилегии.'],
            ['Дроп', 'Предметы, выпадающие после смерти моба или игрока.'],
            ['Дюп / Дупе', '**Запрещено.** Дублирование предметов через эксплойт.'],
          ]},
          { id: uuidv4(), type: 'heading', level: 2, text: 'К — Р' },
          { id: uuidv4(), type: 'table', headers: ['Термин', 'Определение'], rows: [
            ['Кит / Kit', 'Набор предметов, выдаваемый игроку (стартовый кит, донат-кит).'],
            ['Клейм', 'Защищённая территория игрока, оформленная через плагин регионов.'],
            ['Лаг', 'Задержка или зависание игры/сервера.'],
            ['Монеты', 'Внутриигровая валюта сервера CraftQuest.'],
            ['Оп / OP', 'Operator — статус суперадминистратора с полными правами.'],
            ['Регион', 'Защищённая зона, созданная через плагин WorldGuard.'],
          ]},
          { id: uuidv4(), type: 'callout', variant: 'tip', title: 'Предложить термин', content: 'Не нашли нужный термин? Предложите его в Discord-канале **#предложения**.' },
        ],
      },
      plugins: {
        id: uuidv4(),
        meta: {
          title: 'Плагины',
          slug: 'plugins',
          description: 'Обзор кастомных плагинов сервера CraftQuest — описание, возможности и документация.',
          tags: ['плагины', 'обзор'],
          status: 'published',
          updatedAt: '2026-02-24',
          category: 'Плагины',
        },
        blocks: [
          { id: uuidv4(), type: 'paragraph', content: 'На сервере CraftQuest установлены собственные плагины, разработанные специально для нашего сообщества.' },
          { id: uuidv4(), type: 'callout', variant: 'info', content: 'Плагины регулярно обновляются. Следите за анонсами в Discord-канале **#обновления**.' },
          { id: uuidv4(), type: 'heading', level: 2, text: 'Доступные плагины' },
          { id: uuidv4(), type: 'cards', columns: 2, items: [
            { title: 'CQ Chat', description: 'Расширенная система чата: каналы, форматирование, эмодзи, личные сообщения и фильтрация спама.', href: '/docs/plugins/cq-chat', badge: 'New' },
            { title: 'CQ Моделка', description: 'Кастомные 3D-модели предметов и мобов с поддержкой ресурспаков.', href: '/docs/plugins/cq-modelka' },
            { title: 'CQ Отладка', description: 'Инструменты для разработки и отладки серверных плагинов. Только для разработчиков.', badge: 'Soon' },
            { title: 'Eternity Pass', description: 'Боевой пропуск с сезонными заданиями, наградами и уникальным контентом.', badge: 'Soon' },
          ]},
          { id: uuidv4(), type: 'heading', level: 2, text: 'Для разработчиков' },
          { id: uuidv4(), type: 'paragraph', content: 'Плагины с открытым исходным кодом доступны на GitHub. Для подключения к API используйте Maven или Gradle зависимость.' },
        ],
      },
      'plugins/cq-chat': {
        id: uuidv4(),
        meta: {
          title: 'CQ Chat',
          slug: 'plugins/cq-chat',
          description: 'Документация плагина CQ Chat — расширенная система чата для сервера CraftQuest.',
          tags: ['плагины', 'чат', 'cq-chat'],
          status: 'published',
          updatedAt: '2026-02-24',
          badge: 'New',
          category: 'Плагины',
          related: ['plugins', 'commands'],
        },
        blocks: [
          { id: uuidv4(), type: 'paragraph', content: 'CQ Chat — кастомный плагин чата для CraftQuest. Поддерживает цветной текст, каналы, упоминания, фильтрацию нежелательного контента и интеграцию с Discord.' },
          { id: uuidv4(), type: 'callout', variant: 'info', title: 'Версия', content: 'Текущая версия: **1.4.2**. Требует Paper 1.20+.' },
          { id: uuidv4(), type: 'heading', level: 2, text: 'Возможности' },
          { id: uuidv4(), type: 'list', style: 'bullet', items: [
            { text: 'Каналы чата', children: ['Глобальный', 'Локальный (в радиусе 100 блоков)', 'Торговый'] },
            { text: 'Цветное форматирование текста для доноров' },
            { text: 'Фильтр нецензурных слов с настраиваемым словарём' },
            { text: 'Упоминания через @ник с уведомлением' },
            { text: 'Интеграция с Discord-каналом через вебхук' },
          ]},
          { id: uuidv4(), type: 'heading', level: 2, text: 'Команды' },
          { id: uuidv4(), type: 'commands', items: [
            { command: '/channel', usage: '/channel <название>', description: 'Переключает активный канал чата.', aliases: ['ch'], permission: 'cqchat.channel', permissionDefault: 'all' },
            { command: '/msg', usage: '/msg <игрок> <сообщение>', description: 'Отправляет личное сообщение.', aliases: ['pm', 'tell'], permission: 'cqchat.msg', permissionDefault: 'all' },
            { command: '/ignore', usage: '/ignore <игрок>', description: 'Добавляет игрока в список игнора.', permission: 'cqchat.ignore', permissionDefault: 'all' },
            { command: '/chatclear', description: 'Очищает чат для всех игроков.', aliases: ['cc'], permission: 'cqchat.admin.clear', permissionDefault: 'op' },
            { command: '/chatmute', usage: '/chatmute [время]', description: 'Включает режим замолчания чата. Время: `5m`, `1h`.', permission: 'cqchat.admin.mute', permissionDefault: 'op' },
          ]},
          { id: uuidv4(), type: 'heading', level: 2, text: 'Права доступа' },
          { id: uuidv4(), type: 'permissions', items: [
            { node: 'cqchat.channel', description: 'Переключение каналов чата', default: 'all' },
            { node: 'cqchat.msg', description: 'Личные сообщения', default: 'all' },
            { node: 'cqchat.ignore', description: 'Игнор игроков', default: 'all' },
            { node: 'cqchat.format.color', description: 'Цветное форматирование текста', default: 'none' },
            { node: 'cqchat.admin.clear', description: 'Очистка глобального чата', default: 'op' },
            { node: 'cqchat.admin.mute', description: 'Замолчание всего чата', default: 'op' },
          ]},
          { id: uuidv4(), type: 'heading', level: 2, text: 'Установка' },
          { id: uuidv4(), type: 'steps', title: 'Установка и настройка CQ Chat', items: [
            { title: 'Установите плагин', description: 'Скопируйте `CQChat.jar` в папку `plugins/` и перезапустите сервер.', code: 'cp CQChat.jar /server/plugins/' },
            { title: 'Отредактируйте config.yml', description: 'Откройте `plugins/CQChat/config.yml` и настройте каналы, дальность локального чата и Discord-вебхук.' },
            { title: 'Настройте права', description: 'Выдайте группам нужные права через ваш плагин прав.', code: 'lp group default permission set cqchat.channel true' },
            { title: 'Перезагрузите конфиг', description: 'После правки конфига можно перезагрузить без рестарта сервера.', code: '/chatreload', note: 'Некоторые настройки требуют полного рестарта.' },
          ]},
          { id: uuidv4(), type: 'code', language: 'yaml', filename: 'plugins/CQChat/config.yml', content: 'channels:\n  global:\n    prefix: "&7[G]&r"\n    range: -1\n    default: true\n  local:\n    prefix: "&a[L]&r"\n    range: 100\n  trade:\n    prefix: "&6[Торг]&r"\n    range: -1\n\ndiscord:\n  enabled: true\n  webhook: "https://discord.com/api/webhooks/..."\n\nfilter:\n  enabled: true\n  action: "REPLACE"\n  replacement: "***"' },
        ],
      },
      'plugins/cq-modelka': {
        id: uuidv4(),
        meta: {
          title: 'CQ Моделка',
          slug: 'plugins/cq-modelka',
          description: 'Документация плагина CQ Моделка — кастомные 3D-модели предметов и мобов с ресурспаком.',
          tags: ['плагины', 'модели', 'ресурспак', 'cq-modelka'],
          status: 'published',
          updatedAt: '2026-02-24',
          category: 'Плагины',
          related: ['plugins', 'plugins/cq-chat'],
        },
        blocks: [
          { id: uuidv4(), type: 'paragraph', content: 'CQ Моделка позволяет добавлять на сервер кастомные 3D-модели предметов и мобов без изменения ванильного геймплея.' },
          { id: uuidv4(), type: 'callout', variant: 'warning', title: 'Требуется ресурспак', content: 'Для отображения кастомных моделей игроки должны принять ресурспак сервера при входе.' },
          { id: uuidv4(), type: 'heading', level: 2, text: 'Возможности' },
          { id: uuidv4(), type: 'list', style: 'bullet', items: [
            { text: 'Кастомные модели для любых предметов (оружие, броня, блоки)' },
            { text: 'Кастомные текстуры мобов с уникальными анимациями' },
            { text: 'Автогенерация ресурспака при изменении моделей' },
            { text: 'API для других плагинов — добавляйте модели программно' },
            { text: 'Поддержка BlockBench-форматов напрямую' },
            { text: 'Система слотов экипировки', children: ['Шляпы и аксессуары', 'Плащи с текстурами', 'Кольца (визуальные)'] },
          ]},
          { id: uuidv4(), type: 'heading', level: 2, text: 'Структура файлов' },
          { id: uuidv4(), type: 'fileTree', title: 'plugins/CQModelka/', root: [
            { name: 'config.yml', type: 'file', description: 'основные настройки' },
            { name: 'models/', type: 'dir', description: 'папка с файлами моделей', children: [
              { name: 'weapons/', type: 'dir', children: [
                { name: 'iron_sword_custom.json', type: 'file' },
                { name: 'magic_staff.json', type: 'file' },
              ]},
              { name: 'mobs/', type: 'dir', children: [
                { name: 'custom_zombie.json', type: 'file' },
              ]},
              { name: 'accessories/', type: 'dir', children: [
                { name: 'crown.json', type: 'file' },
              ]},
            ]},
            { name: 'textures/', type: 'dir', description: 'PNG-текстуры' },
            { name: 'generated-pack/', type: 'dir', description: 'авто-генерируемый ресурспак (не редактировать)' },
          ]},
          { id: uuidv4(), type: 'heading', level: 2, text: 'Установка' },
          { id: uuidv4(), type: 'steps', items: [
            { title: 'Установите плагин', description: 'Скопируйте `CQModelka.jar` в папку `plugins/` и перезапустите сервер.', code: 'cp CQModelka.jar /server/plugins/' },
            { title: 'Добавьте модели', description: 'Поместите JSON-файлы моделей в папку `plugins/CQModelka/models/`.' },
            { title: 'Добавьте текстуры', description: 'Поместите PNG-файлы в папку `plugins/CQModelka/textures/`.' },
            { title: 'Генерация пака', description: 'Выполните команду для генерации ресурспака и его публикации на сервере.', code: '/cqmodelka rebuild' },
          ]},
          { id: uuidv4(), type: 'permissions', items: [
            { node: 'cqmodelka.use', description: 'Использование кастомных предметов', default: 'all' },
            { node: 'cqmodelka.equip', description: 'Экипировка аксессуаров', default: 'all' },
            { node: 'cqmodelka.admin.give', description: 'Выдача кастомных предметов игрокам', default: 'op' },
            { node: 'cqmodelka.admin.rebuild', description: 'Перегенерация ресурспака', default: 'op' },
          ]},
        ],
      },
    },
  }
}
