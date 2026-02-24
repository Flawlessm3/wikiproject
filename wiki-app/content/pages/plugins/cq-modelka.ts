import type { BlockPage } from '@/types'

const page: BlockPage = {
  meta: {
    title: 'CQ Моделка',
    description: 'Документация плагина CQ Моделка — кастомные 3D-модели предметов и мобов с ресурспаком.',
    slug: 'plugins/cq-modelka',
    category: 'Плагины',
    updatedAt: '2026-02-24',
    tags: ['плагины', 'модели', 'ресурспак', 'cq-modelka'],
    related: ['plugins', 'plugins/cq-chat'],
  },

  blocks: [
    {
      type: 'paragraph',
      content:
        'CQ Моделка позволяет добавлять на сервер кастомные 3D-модели предметов ' +
        'и мобов без изменения ванильного геймплея. Модели передаются игрокам ' +
        'через автоматически генерируемый ресурспак.',
    },

    {
      type: 'callout',
      variant: 'warning',
      title: 'Требуется ресурспак',
      content:
        'Для отображения кастомных моделей игроки должны принять ресурспак сервера при входе. ' +
        'Без пака модели отображаются как стандартные предметы.',
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
        'Кастомные модели для любых предметов (оружие, броня, блоки)',
        'Кастомные текстуры мобов с уникальными анимациями',
        'Автогенерация ресурспака при изменении моделей',
        'API для других плагинов — добавляйте модели программно',
        'Поддержка BlockBench-форматов напрямую',
        { text: 'Система слотов экипировки', children: ['Шляпы и аксессуары', 'Плащи с текстурами', 'Кольца (визуальные)'] },
      ],
    },

    // ── Структура файлов ─────────────────────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      text: 'Структура файлов',
    },

    {
      type: 'fileTree',
      title: 'plugins/CQModelka/',
      root: [
        {
          name: 'config.yml',
          type: 'file',
          description: 'основные настройки',
        },
        {
          name: 'models/',
          type: 'dir',
          description: 'папка с файлами моделей',
          children: [
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
          ],
        },
        {
          name: 'textures/',
          type: 'dir',
          description: 'PNG-текстуры',
          children: [
            { name: 'weapons/', type: 'dir' },
            { name: 'mobs/', type: 'dir' },
          ],
        },
        {
          name: 'generated-pack/',
          type: 'dir',
          description: 'авто-генерируемый ресурспак (не редактировать)',
        },
      ],
    },

    // ── Добавление модели ────────────────────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      text: 'Как добавить кастомную модель',
    },

    {
      type: 'steps',
      items: [
        {
          title: 'Создайте модель в BlockBench',
          description:
            'Откройте BlockBench, создайте модель в формате **Java Block/Item**. ' +
            'Назначьте текстуры и анимации.',
        },
        {
          title: 'Экспортируйте файлы',
          description:
            'Экспортируйте `.json` модели в `plugins/CQModelka/models/` ' +
            'и текстуры `.png` в `plugins/CQModelka/textures/`.',
        },
        {
          title: 'Зарегистрируйте модель',
          description: 'Добавьте запись в `items.yml` чтобы привязать модель к предмету.',
          code: `# plugins/CQModelka/items.yml
custom_sword:
  base_item: DIAMOND_SWORD
  model: weapons/magic_staff
  custom_model_data: 1001
  display_name: "&bМагический посох"`,
        },
        {
          title: 'Перегенерируйте ресурспак',
          description: 'Выполните команду на сервере — пак обновится автоматически и разошлётся игрокам.',
          code: '/modelka reload',
        },
      ],
    },

    // ── API ──────────────────────────────────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      text: 'Developer API',
    },

    {
      type: 'callout',
      variant: 'note',
      title: 'Для разработчиков',
      content:
        'Добавьте `CQModelka` как зависимость в `plugin.yml`, ' +
        'затем используйте `CQModelkaAPI` для создания кастомных предметов из кода.',
    },

    {
      type: 'code',
      language: 'java',
      filename: 'MyPlugin.java',
      content: `import ru.craftquest.modelka.CQModelkaAPI;
import org.bukkit.inventory.ItemStack;

// Получить кастомный предмет по ID
ItemStack staff = CQModelkaAPI.getItem("custom_sword");

// Выдать игроку
player.getInventory().addItem(staff);

// Проверить является ли предмет кастомным
if (CQModelkaAPI.isCustomItem(item)) {
    String id = CQModelkaAPI.getItemId(item);
    player.sendMessage("Это кастомный предмет: " + id);
}`,
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
        { node: 'cqmodelka.get',        description: 'Получение кастомного предмета командой /modelka get', default: 'op' },
        { node: 'cqmodelka.list',       description: 'Просмотр списка зарегистрированных моделей',         default: 'op' },
        { node: 'cqmodelka.reload',     description: 'Перегенерация ресурспака и перезагрузка конфига',    default: 'op' },
        { node: 'cqmodelka.equip.hat',  description: 'Надевание кастомных шляп/аксессуаров',              default: 'all' },
        { node: 'cqmodelka.equip.cape', description: 'Ношение кастомного плаща',                          default: 'none' },
      ],
    },

    {
      type: 'divider',
    },

    {
      type: 'callout',
      variant: 'tip',
      title: 'Нужна помощь с моделью?',
      content:
        'Обратитесь в Discord-канал **#моделки** — там активное сообщество ' +
        'билдеров и разработчиков готово помочь.',
    },
  ],
}

export default page
