import { parseInline } from '@/lib/inline-md'

export function ParagraphBlock({ content }: { content: string }) {
  return (
    <p className="text-text-secondary leading-7 my-4">
      {parseInline(content)}
    </p>
  )
}
