import { slugify } from '@/lib/utils'

const CLASS: Record<2 | 3 | 4, string> = {
  2: 'text-2xl font-bold   text-text-primary mt-10 mb-4 scroll-mt-20',
  3: 'text-xl  font-semibold text-text-primary mt-8  mb-3 scroll-mt-20',
  4: 'text-base font-semibold text-text-primary mt-6  mb-2 scroll-mt-20',
}

export function HeadingBlock({
  level,
  text,
  id,
}: {
  level: 2 | 3 | 4
  text: string
  id?: string
}) {
  const resolvedId = id ?? slugify(text)
  const Tag = `h${level}` as 'h2' | 'h3' | 'h4'

  return (
    <Tag id={resolvedId} className={`group ${CLASS[level]}`}>
      <a href={`#${resolvedId}`} className="no-underline hover:no-underline">
        {text}
        <span className="ml-2 opacity-0 group-hover:opacity-40 text-text-muted transition-opacity select-none">
          #
        </span>
      </a>
    </Tag>
  )
}
