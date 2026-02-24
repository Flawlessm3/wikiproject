import { Navbar } from '@/components/layout/Navbar'

/**
 * Docs section layout.
 * The 3-column grid (sidebar | content | toc) lives in DocsLayout,
 * which is rendered per-page inside [  ...slug]/page.tsx so each page
 * can pass its own sidebar current-slug and TOC items.
 */
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-root flex flex-col min-h-screen bg-bg-base">
      <Navbar />
      <div className="flex-1" style={{ paddingTop: 'var(--nav-height)' }}>
        {children}
      </div>
    </div>
  )
}
