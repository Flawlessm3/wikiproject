'use client'

import { notFound } from 'next/navigation'
import { useWikiStore, selectPage, selectNavigation } from '@/store/wikiStore'
import { extractTOCFromBlocks } from '@/lib/toc'
import { getPrevNextFromNav } from '@/lib/navUtils'

import { DocsLayout } from '@/components/layout/DocsLayout'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { TOCPanel } from '@/components/toc/TOCPanel'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { ArticleHeader } from '@/components/content/ArticleHeader'
import { ArticleMeta } from '@/components/content/ArticleMeta'
import { PaginationNav } from '@/components/navigation/PaginationNav'
import { FeedbackBlock } from '@/components/ui/FeedbackBlock'
import { WikiRelatedLinks } from '@/components/navigation/WikiRelatedLinks'
import { BackToTop } from '@/components/ui/BackToTop'
import { BlocksRenderer } from '@/components/blocks/BlockRenderer'
import { EditorToolbar } from '@/components/editor/EditorToolbar'
import { EditPageButton } from '@/components/editor/EditPageButton'
import { PageEditorPanel } from '@/components/editor/PageEditorPanel'

function makeBreadcrumbs(slugParts: string[]) {
  return slugParts.map((segment, i) => ({
    label: segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    href:
      i === slugParts.length - 1
        ? undefined
        : `/docs/${slugParts.slice(0, i + 1).join('/')}`,
  }))
}

function DocPageSkeleton() {
  return (
    <DocsLayout sidebar={<div className="h-full animate-pulse bg-bg-elevated rounded" />} toc={null}>
      <div className="max-w-content mx-auto px-8 py-10 space-y-4 animate-pulse">
        <div className="h-4 w-1/4 bg-bg-elevated rounded" />
        <div className="h-8 w-3/4 bg-bg-elevated rounded" />
        <div className="h-4 w-1/2 bg-bg-elevated rounded" />
        <div className="h-px bg-border my-6" />
        <div className="space-y-2">
          <div className="h-4 bg-bg-elevated rounded" />
          <div className="h-4 w-5/6 bg-bg-elevated rounded" />
          <div className="h-4 w-4/5 bg-bg-elevated rounded" />
        </div>
      </div>
    </DocsLayout>
  )
}

interface WikiDocPageProps {
  params: { slug: string[] }
}

export function WikiDocPage({ params }: WikiDocPageProps) {
  const slug = params.slug.join('/')
  const wikiData = useWikiStore(s => s.wikiData)
  const storePage = useWikiStore(selectPage(slug))
  const isEditorMode = useWikiStore(s => s.isEditorMode)
  const navigation = useWikiStore(selectNavigation)

  // While store is loading
  if (!wikiData) return <DocPageSkeleton />

  if (!storePage) {
    notFound()
    return null
  }

  const { meta, blocks } = storePage
  const toc = extractTOCFromBlocks(blocks)
  const { prev, next } = getPrevNextFromNav(navigation, slug)
  const breadcrumbs = makeBreadcrumbs(params.slug)

  return (
    <>
      <DocsLayout
        sidebar={<Sidebar currentSlug={slug} />}
        toc={toc.length > 0 ? <TOCPanel items={toc} /> : null}
      >
        <div className="max-w-content mx-auto px-8 py-10 lg:px-8 md:px-6 sm:px-4">
          <div className="flex items-start justify-between gap-4">
            <Breadcrumbs items={breadcrumbs} />
            {isEditorMode && <EditPageButton slug={slug} />}
          </div>

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
            <BlocksRenderer blocks={blocks} slug={slug} editorMode={isEditorMode} />
          </article>

          <div className="h-px bg-border my-8" />

          {meta.related && meta.related.length > 0 && (
            <WikiRelatedLinks slugs={meta.related} />
          )}

          <FeedbackBlock />
          <PaginationNav prev={prev} next={next} />
        </div>
      </DocsLayout>

      <BackToTop />
      {isEditorMode && (
        <>
          <EditorToolbar />
          <PageEditorPanel />
        </>
      )}
    </>
  )
}
