import { notFound }    from 'next/navigation'
import type { Metadata } from 'next'

import { pageRegistry }                      from 'content/pages/_registry'
import { getPageBySlug }                     from '@/lib/content'
import { getAllDocSlugs }                     from '@/lib/docs'
import { extractTOC, extractTOCFromBlocks }  from '@/lib/toc'
import { getPrevNext }                       from '@/lib/navigation'

import { DocsLayout }     from '@/components/layout/DocsLayout'
import { Sidebar }        from '@/components/sidebar/Sidebar'
import { TOCPanel }       from '@/components/toc/TOCPanel'
import { Breadcrumbs }    from '@/components/navigation/Breadcrumbs'
import { ArticleHeader }  from '@/components/content/ArticleHeader'
import { ArticleMeta }    from '@/components/content/ArticleMeta'
import { MDXContent }     from '@/components/content/MDXContent'
import { PaginationNav }  from '@/components/navigation/PaginationNav'
import { FeedbackBlock }  from '@/components/ui/FeedbackBlock'
import { RelatedLinks }   from '@/components/navigation/RelatedLinks'
import { BackToTop }      from '@/components/ui/BackToTop'
import { BlocksRenderer } from '@/components/blocks/BlockRenderer'

// ─── Static params (SSG) ─────────────────────────────────────────────────────

export async function generateStaticParams() {
  // Block pages come from the registry
  const blockSlugs = Object.keys(pageRegistry).map(slug => ({
    slug: slug.split('/'),
  }))

  // MDX pages come from the filesystem
  const mdxSlugs = getAllDocSlugs()

  // Merge and deduplicate (block pages take precedence)
  const seen = new Set<string>()
  const all: { slug: string[] }[] = []
  for (const p of [...blockSlugs, ...mdxSlugs]) {
    const key = p.slug.join('/')
    if (!seen.has(key)) {
      seen.add(key)
      all.push(p)
    }
  }
  return all
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata> {
  const result = getPageBySlug(params.slug)
  if (!result) return {}

  const title       = result.kind === 'block' ? result.page.meta.title       : result.doc.frontmatter.title
  const description = result.kind === 'block' ? result.page.meta.description : result.doc.frontmatter.description
  return { title, description }
}

// ─── Shared breadcrumb builder ────────────────────────────────────────────────

function makeBreadcrumbs(slugParts: string[]) {
  return slugParts.map((segment, i) => ({
    label: segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    href:
      i === slugParts.length - 1
        ? undefined
        : `/docs/${slugParts.slice(0, i + 1).join('/')}`,
  }))
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DocPage({ params }: { params: { slug: string[] } }) {
  const result = getPageBySlug(params.slug)
  if (!result) notFound()

  const slug           = params.slug.join('/')
  const { prev, next } = getPrevNext(slug)
  const breadcrumbs    = makeBreadcrumbs(params.slug)

  // ── Block-based page ───────────────────────────────────────────────────────
  if (result.kind === 'block') {
    const { meta, blocks } = result.page
    const toc = extractTOCFromBlocks(blocks)

    return (
      <>
        <DocsLayout
          sidebar={<Sidebar currentSlug={slug} />}
          toc={toc.length > 0 ? <TOCPanel items={toc} /> : null}
        >
          <div className="max-w-content mx-auto px-8 py-10 lg:px-8 md:px-6 sm:px-4">
            <Breadcrumbs items={breadcrumbs} />

            <ArticleHeader
              title={meta.title}
              description={meta.description}
              badge={meta.badge}
              tags={meta.tags}
            />

            <ArticleMeta
              updatedAt={meta.updatedAt}
              author={meta.author}
              slug={slug}
            />

            <div className="h-px bg-border my-6" />

            <article>
              <BlocksRenderer blocks={blocks} />
            </article>

            <div className="h-px bg-border my-8" />

            {meta.related && meta.related.length > 0 && (
              <RelatedLinks slugs={meta.related} />
            )}

            <FeedbackBlock />
            <PaginationNav prev={prev} next={next} />
          </div>
        </DocsLayout>

        <BackToTop />
      </>
    )
  }

  // ── MDX page (unchanged rendering pipeline) ────────────────────────────────
  const doc = result.doc
  const toc = extractTOC(doc.content)

  return (
    <>
      <DocsLayout
        sidebar={<Sidebar currentSlug={slug} />}
        toc={toc.length > 0 ? <TOCPanel items={toc} /> : null}
      >
        <div className="max-w-content mx-auto px-8 py-10 lg:px-8 md:px-6 sm:px-4">
          <Breadcrumbs items={breadcrumbs} />

          <ArticleHeader
            title={doc.frontmatter.title}
            description={doc.frontmatter.description}
            badge={doc.frontmatter.badge}
            tags={doc.frontmatter.tags}
          />

          <ArticleMeta
            updatedAt={doc.frontmatter.updatedAt}
            author={doc.frontmatter.author}
            content={doc.content}
            slug={slug}
          />

          <div className="h-px bg-border my-6" />

          <article className="prose prose-slate dark:prose-invert max-w-none">
            <MDXContent source={doc.content} />
          </article>

          <div className="h-px bg-border my-8" />

          {doc.frontmatter.related && doc.frontmatter.related.length > 0 && (
            <RelatedLinks slugs={doc.frontmatter.related} />
          )}

          <FeedbackBlock />
          <PaginationNav prev={prev} next={next} />
        </div>
      </DocsLayout>

      <BackToTop />
    </>
  )
}
