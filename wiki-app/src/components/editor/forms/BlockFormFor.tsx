'use client'

import type { ContentBlock } from '@/types/wiki'
import { ParagraphForm } from './ParagraphForm'
import { HeadingForm } from './HeadingForm'
import { ListForm } from './ListForm'
import { TableForm } from './TableForm'
import { CalloutForm } from './CalloutForm'
import { CodeForm } from './CodeForm'
import { FAQForm } from './FAQForm'
import { CommandsForm } from './CommandsForm'
import { StepsForm } from './StepsForm'
import { CardsForm } from './CardsForm'
import { FileTreeForm } from './FileTreeForm'
import { PermissionsForm } from './PermissionsForm'
import { DividerForm } from './DividerForm'
import { ImageForm } from './ImageForm'
import { QuoteForm } from './QuoteForm'
import { StatsForm } from './StatsForm'
import { RecipeForm } from './RecipeForm'
import { LinkListForm } from './LinkListForm'
import { SectionForm } from './SectionForm'
import { RawMDForm } from './RawMDForm'

interface BlockFormForProps {
  block: ContentBlock
  slug: string
  onClose: () => void
}

export function BlockFormFor({ block, slug, onClose }: BlockFormForProps) {
  const props = { block: block as never, slug, onClose }

  switch (block.type) {
    case 'paragraph':   return <ParagraphForm   {...props} />
    case 'heading':     return <HeadingForm     {...props} />
    case 'list':        return <ListForm        {...props} />
    case 'table':       return <TableForm       {...props} />
    case 'callout':     return <CalloutForm     {...props} />
    case 'code':        return <CodeForm        {...props} />
    case 'faq':         return <FAQForm         {...props} />
    case 'commands':    return <CommandsForm    {...props} />
    case 'steps':       return <StepsForm       {...props} />
    case 'cards':       return <CardsForm       {...props} />
    case 'fileTree':    return <FileTreeForm    {...props} />
    case 'permissions': return <PermissionsForm {...props} />
    case 'divider':     return <DividerForm     {...props} />
    case 'image':       return <ImageForm       {...props} />
    case 'quote':       return <QuoteForm       {...props} />
    case 'stats':       return <StatsForm       {...props} />
    case 'recipe':      return <RecipeForm      {...props} />
    case 'linklist':    return <LinkListForm    {...props} />
    case 'section':     return <SectionForm     {...props} />
    case 'rawmd':       return <RawMDForm       {...props} />
    default:
      return (
        <p className="text-sm text-text-muted py-4 text-center">
          Редактор для этого типа блока не реализован.
        </p>
      )
  }
}
