import { Callout } from '@/components/content/mdx/Callout'
import { parseInline } from '@/lib/inline-md'
import type { CalloutVariant } from '@/types/blocks'

export function CalloutBlock({
  variant,
  title,
  content,
}: {
  variant: CalloutVariant
  title?: string
  content: string
}) {
  return (
    <Callout type={variant} title={title}>
      {parseInline(content)}
    </Callout>
  )
}
