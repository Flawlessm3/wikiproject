// ─────────────────────────────────────────────────────────────────────────────
// BlockRenderer — dispatches each ContentBlock to the correct component
// ─────────────────────────────────────────────────────────────────────────────
//
// HOW TO ADD A NEW BLOCK TYPE:
//   1. Add the type to src/types/wiki.ts (ContentBlock union)
//   2. Create src/components/blocks/MyNewBlock.tsx
//   3. Import it here and add a case in the switch
//   4. Add a default in seedData.ts createBlock()
//   5. Create a form in src/components/editor/forms/MyNewBlockForm.tsx
//   6. Register the form in BlockFormFor.tsx
// ─────────────────────────────────────────────────────────────────────────────

import type { ContentBlock } from '@/types/wiki'
import { ParagraphBlock }    from './ParagraphBlock'
import { HeadingBlock }      from './HeadingBlock'
import { ListBlock }         from './ListBlock'
import { TableBlock }        from './TableBlock'
import { CalloutBlock }      from './CalloutBlock'
import { CodeBlock }         from './CodeBlock'
import { FAQBlock }          from './FAQBlock'
import { CommandsBlock }     from './CommandsBlock'
import { StepsBlock }        from './StepsBlock'
import { CardsBlock }        from './CardsBlock'
import { FileTreeBlock }     from './FileTreeBlock'
import { PermissionsBlock }  from './PermissionsBlock'
import { DividerBlock }      from './DividerBlock'
import { ImageBlock }        from './ImageBlock'
import { QuoteBlock }        from './QuoteBlock'
import { StatsBlock }        from './StatsBlock'
import { RecipeBlock }       from './RecipeBlock'
import { LinkListBlock }     from './LinkListBlock'
import { SectionBlock }      from './SectionBlock'
import { RawMDBlock }        from './RawMDBlock'

export function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'paragraph':   return <ParagraphBlock   content={block.content} />
    case 'heading':     return <HeadingBlock     level={block.level} text={block.text} id={block.anchor ?? block.id} />
    case 'list':        return <ListBlock        style={block.style} items={block.items} />
    case 'table':       return <TableBlock       headers={block.headers} rows={block.rows} caption={block.caption} />
    case 'callout':     return <CalloutBlock     variant={block.variant} title={block.title} content={block.content} />
    case 'code':        return <CodeBlock        content={block.content} language={block.language} filename={block.filename} />
    case 'faq':         return <FAQBlock         title={block.title} items={block.items} />
    case 'commands':    return <CommandsBlock    title={block.title} category={block.category} items={block.items} />
    case 'steps':       return <StepsBlock       title={block.title} items={block.items} />
    case 'cards':       return <CardsBlock       columns={block.columns} items={block.items} />
    case 'fileTree':    return <FileTreeBlock    title={block.title} root={block.root} />
    case 'permissions': return <PermissionsBlock title={block.title} items={block.items} />
    case 'divider':     return <DividerBlock />
    case 'image':       return <ImageBlock       src={block.src} alt={block.alt} caption={block.caption} />
    case 'quote':       return <QuoteBlock       content={block.content} author={block.author} />
    case 'stats':       return <StatsBlock       title={block.title} items={block.items} />
    case 'recipe':      return <RecipeBlock      title={block.title} ingredients={block.ingredients} result={block.result} shape={block.shape} />
    case 'linklist':    return <LinkListBlock    title={block.title} items={block.items} />
    case 'section':     return <SectionBlock     title={block.title} description={block.description} children={block.children} />
    case 'rawmd':       return <RawMDBlock       content={block.content} />
    default:
      return null
  }
}

interface BlocksRendererProps {
  blocks: ContentBlock[]
  slug?: string
  editorMode?: boolean
}

/** Renders an array of blocks. When editorMode=true, wraps in BlockEditorList */
export function BlocksRenderer({ blocks, slug, editorMode = false }: BlocksRendererProps) {
  if (editorMode && slug) {
    // Dynamic import to avoid SSR issues with dnd-kit
    const { BlockEditorList } = require('@/components/editor/BlockEditorList')
    return <BlockEditorList blocks={blocks} slug={slug} />
  }
  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  )
}
