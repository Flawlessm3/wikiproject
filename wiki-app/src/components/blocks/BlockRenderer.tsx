// ─────────────────────────────────────────────────────────────────────────────
// BlockRenderer — dispatches each ContentBlock to the correct component
// ─────────────────────────────────────────────────────────────────────────────
//
// HOW TO ADD A NEW BLOCK TYPE:
//   1. Add the type to src/types/blocks.ts (ContentBlock union)
//   2. Create src/components/blocks/MyNewBlock.tsx
//   3. Import it here and add a case in the switch
//   4. Use the new type in any page file under content/pages/
// ─────────────────────────────────────────────────────────────────────────────

import type { ContentBlock } from '@/types/blocks'
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

export function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'paragraph':   return <ParagraphBlock   content={block.content} />
    case 'heading':     return <HeadingBlock     level={block.level} text={block.text} id={block.id} />
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
    default:
      // Unknown block types are silently ignored (allows safe forward compat)
      return null
  }
}

/** Renders an array of blocks in order */
export function BlocksRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </>
  )
}
