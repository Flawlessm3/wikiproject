import type { TOCItem } from '@/types'
import type { ContentBlock } from '@/types/blocks'
import { slugify } from './utils'

/**
 * Extract a structured Table of Contents from raw MDX/Markdown source.
 * Handles H2, H3, H4. H3/H4 are nested under the preceding H2.
 *
 * NOTE: IDs are generated with the same algorithm as rehype-slug,
 * so they match the actual heading IDs rendered in the page.
 */
export function extractTOC(content: string): TOCItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm
  const flat: TOCItem[] = []

  let match: RegExpExecArray | null
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3 | 4
    // Strip inline MDX/markdown syntax from title for display
    const raw = match[2].trim()
    const title = raw.replace(/`([^`]+)`/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1')
    flat.push({ id: slugify(raw), title, level })
  }

  // Build nested structure: H3/H4 become children of the nearest H2
  const nested: TOCItem[] = []
  let currentH2: TOCItem | null = null

  for (const item of flat) {
    if (item.level === 2) {
      currentH2 = { ...item, children: [] }
      nested.push(currentH2)
    } else if (item.level === 3 && currentH2) {
      currentH2.children = currentH2.children ?? []
      currentH2.children.push({ ...item, children: [] })
    } else if (item.level === 4 && currentH2?.children?.length) {
      const lastH3 = currentH2.children[currentH2.children.length - 1]
      lastH3.children = lastH3.children ?? []
      lastH3.children.push(item)
    }
  }

  return nested
}

/**
 * Extract a structured TOC from an array of ContentBlocks.
 * Uses heading blocks the same way extractTOC uses markdown headings.
 */
export function extractTOCFromBlocks(blocks: ContentBlock[]): TOCItem[] {
  type HeadingBlock = Extract<ContentBlock, { type: 'heading' }>
  const headings = blocks.filter(
    (b): b is HeadingBlock => b.type === 'heading'
  )

  const nested: TOCItem[] = []
  let currentH2: TOCItem | null = null

  for (const h of headings) {
    const id = h.id ?? slugify(h.text)
    const item: TOCItem = { id, title: h.text, level: h.level }

    if (h.level === 2) {
      currentH2 = { ...item, children: [] }
      nested.push(currentH2)
    } else if (h.level === 3 && currentH2) {
      currentH2.children = currentH2.children ?? []
      currentH2.children.push({ ...item, children: [] })
    } else if (h.level === 4 && currentH2?.children?.length) {
      const lastH3 = currentH2.children[currentH2.children.length - 1]
      lastH3.children = lastH3.children ?? []
      lastH3.children.push(item)
    }
  }

  return nested
}
