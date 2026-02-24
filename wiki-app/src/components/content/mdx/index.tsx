import type { MDXComponents } from 'mdx/types'
import { Link2 } from 'lucide-react'
import { Callout } from './Callout'
import { CodeBlock } from './CodeBlock'

/**
 * MDX components map.
 * Every HTML element produced by MDX can be overridden here.
 * Custom components (<Callout>, etc.) are also registered here
 * so MDX files can use them without importing.
 *
 * Usage in .mdx files:
 *   <Callout type="warning">Be careful!</Callout>
 */
export const mdxComponents: MDXComponents = {

  // ── Headings with anchor links ──────────────────────────────────────────────
  h2: ({ id, children, ...props }) => (
    <h2
      id={id}
      className="group relative flex items-center gap-2 mt-10 mb-4 text-2xl font-bold tracking-tight text-text-primary border-b border-border pb-3 scroll-mt-20"
      {...props}
    >
      {id && (
        <a
          href={`#${id}`}
          className="heading-anchor"
          aria-label={`Link to section: ${children}`}
          tabIndex={-1}
        >
          <Link2 size={14} />
        </a>
      )}
      {children}
    </h2>
  ),

  h3: ({ id, children, ...props }) => (
    <h3
      id={id}
      className="group relative flex items-center gap-2 mt-8 mb-3 text-xl font-semibold tracking-tight text-text-primary scroll-mt-20"
      {...props}
    >
      {id && (
        <a
          href={`#${id}`}
          className="heading-anchor"
          aria-label={`Link to section: ${children}`}
          tabIndex={-1}
        >
          <Link2 size={13} />
        </a>
      )}
      {children}
    </h3>
  ),

  h4: ({ id, children, ...props }) => (
    <h4
      id={id}
      className="group relative flex items-center gap-2 mt-6 mb-2 text-lg font-semibold text-text-secondary scroll-mt-20"
      {...props}
    >
      {id && (
        <a
          href={`#${id}`}
          className="heading-anchor"
          aria-label={`Link to section: ${children}`}
          tabIndex={-1}
        >
          <Link2 size={12} />
        </a>
      )}
      {children}
    </h4>
  ),

  // ── Code ────────────────────────────────────────────────────────────────────
  pre: ({ children, ...props }) => {
    // Extract the code element's props
    const codeEl = (children as React.ReactElement<{ className?: string; children?: string }>)
    if (codeEl?.props) {
      return (
        <CodeBlock className={codeEl.props.className}>
          {codeEl.props.children ?? ''}
        </CodeBlock>
      )
    }
    return <pre {...props}>{children}</pre>
  },

  // ── Links ───────────────────────────────────────────────────────────────────
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      className="text-accent-hover underline underline-offset-3 decoration-accent-border hover:text-accent-active transition-colors"
      {...(href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
    </a>
  ),

  // ── Table ───────────────────────────────────────────────────────────────────
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto rounded-lg border border-border my-5 not-prose">
      <table className="w-full text-sm border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-bg-elevated border-b border-border" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th
      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted whitespace-nowrap"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="px-4 py-3 text-text-secondary border-b border-border-subtle last-of-type:border-0"
      {...props}
    >
      {children}
    </td>
  ),
  tr: ({ children, ...props }) => (
    <tr className="hover:bg-bg-hover transition-colors" {...props}>
      {children}
    </tr>
  ),

  // ── Blockquote ──────────────────────────────────────────────────────────────
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="not-prose border-l-2 border-accent-border bg-bg-elevated rounded-r-lg px-6 py-4 my-5 text-text-secondary italic"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // ── Horizontal rule ─────────────────────────────────────────────────────────
  hr: () => <div className="h-px bg-border my-8" />,

  // ── Custom components available in MDX files ────────────────────────────────
  Callout,
}
