import { notFound } from 'next/navigation'

import { getDocBySlug } from '@/lib/docs'
import { extractTOC } from '@/lib/toc'

import { DocsLayout } from '@/components/layout/DocsLayout'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { TOCPanel } from '@/components/toc/TOCPanel'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { ArticleHeader } from '@/components/content/ArticleHeader'
import { ArticleMeta } from '@/components/content/ArticleMeta'
import { MDXContent } from '@/components/content/MDXContent'
import { PaginationNav } from '@/components/navigation/PaginationNav'
import { FeedbackBlock } from '@/components/ui/FeedbackBlock'
import { RelatedLinks } from '@/components/navigation/RelatedLinks'
import { BackToTop } from '@/components/ui/BackToTop'
import { WikiDocPage } from './WikiDocPage'

export const dynamic = 'force-dynamic'

function makeBreadcrumbs(slugParts: string[]) {
  return slugParts.map((segment, i) => ({
    label: segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    href:
      i === slugParts.length - 1
        ? undefined
        : `/docs/${slugParts.slice(0, i + 1).join('/')}`,
  }))
}

export default function DocPage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join('/')
  const doc = getDocBySlug(params.slug)

  // MDX page (existing pipeline, server-rendered)
  if (doc) {
    const toc = extractTOC(doc.content)
    const breadcrumbs = makeBreadcrumbs(params.slug)

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
            <PaginationNav prev={null} next={null} />
          </div>
        </DocsLayout>

        <BackToTop />
      </>
    )
  }

  // Wiki store page (client component, reads from Zustand store)
  return <WikiDocPage params={params} />
}
