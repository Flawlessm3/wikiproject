'use client'

import { useState } from 'react'
import { SidebarContext } from '@/components/sidebar/SidebarMobileDrawer'
import { cn } from '@/lib/utils'

interface DocsLayoutProps {
  children:  React.ReactNode
  sidebar:   React.ReactNode  // server-rendered sidebar
  toc:       React.ReactNode | null  // server-rendered TOC (null when empty)
}

/**
 * DocsLayout — Client Component
 * Manages the mobile sidebar open/close state.
 * The sidebar and TOC slots are server-rendered and passed as children,
 * so they benefit from RSC rendering even though this shell is a client component.
 *
 * Layout:
 *   Desktop (lg+) : sidebar | content | toc
 *   Tablet  (md)  : sidebar | content  (toc hidden or collapsible)
 *   Mobile  (<md) : content only (sidebar as off-canvas drawer)
 */
export function DocsLayout({ children, sidebar, toc }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <SidebarContext.Provider value={{ isOpen: sidebarOpen, setIsOpen: setSidebarOpen }}>
      <div className="flex w-full max-w-page mx-auto relative">

        {/* ── Left Sidebar ── */}
        {/*
          Desktop: sticky left column
          Mobile:  fixed off-canvas drawer (animated)
        */}
        <aside
          className={cn(
            // Base
            'sidebar-height overflow-y-auto overscroll-contain',
            'bg-bg-surface border-r border-border',
            'flex-shrink-0',
            // Desktop: sticky column
            'hidden lg:block lg:sticky lg:top-[var(--nav-height)] lg:w-sidebar',
            // Mobile: fixed drawer
            'max-lg:fixed max-lg:top-[var(--nav-height)] max-lg:left-0 max-lg:bottom-0',
            'max-lg:w-72 max-lg:z-40',
            'max-lg:transition-transform max-lg:duration-300 max-lg:ease-in-out',
            sidebarOpen
              ? 'max-lg:translate-x-0 max-lg:block max-lg:shadow-xl'
              : 'max-lg:-translate-x-full',
          )}
          role="navigation"
          aria-label="Sidebar navigation"
          id="sidebar"
          aria-hidden={!sidebarOpen && true}
        >
          {sidebar}
        </aside>

        {/* Mobile overlay backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* ── Main Content ── */}
        <main
          className="flex-1 min-w-0"
          id="main-content"
          role="main"
          tabIndex={-1}
        >
          {children}
        </main>

        {/* ── Right TOC ── */}
        {toc && (
          <aside
            className={cn(
              'sidebar-height overflow-y-auto overscroll-contain',
              'hidden xl:block xl:sticky xl:top-[var(--nav-height)]',
              'xl:w-toc flex-shrink-0',
            )}
            aria-label="Table of contents"
          >
            {toc}
          </aside>
        )}
      </div>
    </SidebarContext.Provider>
  )
}
