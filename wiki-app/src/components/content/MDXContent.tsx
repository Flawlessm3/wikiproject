import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { mdxComponents } from './mdx'

interface MDXContentProps {
  source: string
}

/**
 * Server Component — renders MDX source with custom components.
 * rehype-slug adds IDs to headings (needed for anchor links + TOC scrollspy).
 * remark-gfm enables GFM tables, strikethrough, task lists, etc.
 */
export function MDXContent({ source }: MDXContentProps) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        },
      }}
    />
  )
}
