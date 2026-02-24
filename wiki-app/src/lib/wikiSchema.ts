import { z } from 'zod'

// ── Sub-type schemas ──────────────────────────────────────────────────────────

const ListItemSchema = z.object({
  text: z.string(),
  checked: z.boolean().optional(),
  children: z.array(z.string()).optional(),
})

const FAQItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
})

const CommandItemSchema = z.object({
  command: z.string(),
  description: z.string(),
  usage: z.string().optional(),
  aliases: z.array(z.string()).optional(),
  permission: z.string().optional(),
  permissionDefault: z.enum(['all', 'op', 'none']).optional(),
})

const StepItemSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  code: z.string().optional(),
  note: z.string().optional(),
})

const CardItemSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  href: z.string().optional(),
  badge: z.string().optional(),
  icon: z.string().optional(),
})

const FileTreeNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    name: z.string(),
    type: z.enum(['file', 'dir']),
    description: z.string().optional(),
    children: z.array(FileTreeNodeSchema).optional(),
  })
)

const PermissionItemSchema = z.object({
  node: z.string(),
  description: z.string(),
  default: z.enum(['all', 'op', 'none']),
})

const StatItemSchema = z.object({
  label: z.string(),
  value: z.string(),
  unit: z.string().optional(),
})

const RecipeIngredientSchema = z.object({
  slot: z.string(),
  item: z.string(),
  count: z.number().optional(),
})

const LinkListItemSchema = z.object({
  title: z.string(),
  href: z.string(),
  description: z.string().optional(),
  external: z.boolean().optional(),
})

// ── Content block schema ──────────────────────────────────────────────────────

const ContentBlockSchema: z.ZodType<any> = z.lazy(() =>
  z.discriminatedUnion('type', [
    z.object({ id: z.string(), type: z.literal('paragraph'), content: z.string() }),
    z.object({ id: z.string(), type: z.literal('heading'), level: z.union([z.literal(2), z.literal(3), z.literal(4)]), text: z.string(), anchor: z.string().optional() }),
    z.object({ id: z.string(), type: z.literal('list'), style: z.enum(['bullet', 'ordered', 'check']), items: z.array(ListItemSchema) }),
    z.object({ id: z.string(), type: z.literal('table'), headers: z.array(z.string()), rows: z.array(z.array(z.string())), caption: z.string().optional() }),
    z.object({ id: z.string(), type: z.literal('callout'), variant: z.enum(['info', 'tip', 'warning', 'danger', 'note']), title: z.string().optional(), content: z.string() }),
    z.object({ id: z.string(), type: z.literal('code'), language: z.string().optional(), filename: z.string().optional(), content: z.string() }),
    z.object({ id: z.string(), type: z.literal('faq'), title: z.string().optional(), items: z.array(FAQItemSchema) }),
    z.object({ id: z.string(), type: z.literal('commands'), title: z.string().optional(), category: z.string().optional(), items: z.array(CommandItemSchema) }),
    z.object({ id: z.string(), type: z.literal('steps'), title: z.string().optional(), items: z.array(StepItemSchema) }),
    z.object({ id: z.string(), type: z.literal('cards'), columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(), items: z.array(CardItemSchema) }),
    z.object({ id: z.string(), type: z.literal('fileTree'), title: z.string().optional(), root: z.array(FileTreeNodeSchema) }),
    z.object({ id: z.string(), type: z.literal('permissions'), title: z.string().optional(), items: z.array(PermissionItemSchema) }),
    z.object({ id: z.string(), type: z.literal('divider') }),
    z.object({ id: z.string(), type: z.literal('image'), src: z.string(), alt: z.string(), caption: z.string().optional() }),
    z.object({ id: z.string(), type: z.literal('quote'), content: z.string(), author: z.string().optional() }),
    z.object({ id: z.string(), type: z.literal('stats'), title: z.string().optional(), items: z.array(StatItemSchema) }),
    z.object({ id: z.string(), type: z.literal('recipe'), title: z.string().optional(), ingredients: z.array(RecipeIngredientSchema), result: z.string(), shape: z.array(z.array(z.string())).optional() }),
    z.object({ id: z.string(), type: z.literal('linklist'), title: z.string().optional(), items: z.array(LinkListItemSchema) }),
    z.object({ id: z.string(), type: z.literal('section'), title: z.string(), description: z.string().optional(), children: z.array(ContentBlockSchema) }),
    z.object({ id: z.string(), type: z.literal('rawmd'), content: z.string() }),
  ])
)

// ── Page schemas ──────────────────────────────────────────────────────────────

const PageMetaSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published']),
  updatedAt: z.string(),
  author: z.string().optional(),
  related: z.array(z.string()).optional(),
  badge: z.string().optional(),
  category: z.string().optional(),
})

const PageDocumentSchema = z.object({
  id: z.string().min(1),
  meta: PageMetaSchema,
  blocks: z.array(ContentBlockSchema),
})

// ── Navigation schemas ────────────────────────────────────────────────────────

const NavNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string().min(1),
    type: z.enum(['group', 'page', 'link']),
    title: z.string().min(1),
    order: z.number(),
    slug: z.string().optional(),
    badge: z.string().optional(),
    hidden: z.boolean().optional(),
    draft: z.boolean().optional(),
    disabled: z.boolean().optional(),
    collapsible: z.boolean().optional(),
    defaultOpen: z.boolean().optional(),
    children: z.array(NavNodeSchema).optional(),
    href: z.string().optional(),
    external: z.boolean().optional(),
  })
)

// ── Settings schemas ──────────────────────────────────────────────────────────

const UILabelsSchema = z.object({
  toc: z.object({ title: z.string() }),
  search: z.object({
    placeholder: z.string(),
    empty: z.string(),
    noResults: z.string(),
    noResultsHint: z.string(),
    triggerLabel: z.string(),
    shortcut: z.string(),
  }),
  pagination: z.object({ previous: z.string(), next: z.string() }),
  feedback: z.object({
    question: z.string(),
    yes: z.string(),
    no: z.string(),
    thanksYes: z.string(),
    thanksNo: z.string(),
  }),
  article: z.object({ copyLink: z.string(), copied: z.string() }),
  sidebar: z.object({ searchLabel: z.string() }),
})

const WikiSettingsSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  logoText: z.string().min(1),
  version: z.string().optional(),
  githubUrl: z.string().optional(),
  defaultSlug: z.string().min(1),
  accentColor: z.enum(['indigo', 'violet', 'blue', 'emerald', 'rose', 'amber']),
  navbarLinks: z.array(z.object({
    label: z.string(),
    href: z.string(),
    external: z.boolean().optional(),
    badge: z.string().optional(),
  })),
  showThemeToggle: z.boolean(),
  showSearch: z.boolean(),
  showGithub: z.boolean(),
  uiLabels: UILabelsSchema,
})

// ── Root schema ───────────────────────────────────────────────────────────────

export const WikiDataSchema = z.object({
  version: z.string(),
  settings: WikiSettingsSchema,
  navigation: z.array(NavNodeSchema),
  pages: z.record(z.string(), PageDocumentSchema),
})

export type WikiDataInput = z.input<typeof WikiDataSchema>
