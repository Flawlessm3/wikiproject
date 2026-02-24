'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Github, ExternalLink } from 'lucide-react'
import { ThemeToggle }       from '@/components/ui/ThemeToggle'
import { SearchTrigger }     from '@/components/ui/SearchModal'
import { MobileMenuButton }  from '@/components/sidebar/SidebarMobileDrawer'
import { EditorModeToggle }  from '@/components/editor/EditorModeToggle'
import { cn }                from '@/lib/utils'
import { useWikiStore, selectSettings } from '@/store/wikiStore'
import { wikiConfig }        from 'content/config/wiki.config'

export function Navbar() {
  const pathname = usePathname()
  const storeSettings = useWikiStore(selectSettings)

  // Use store settings if available, fall back to static config during load
  const siteName     = storeSettings?.name        ?? wikiConfig.site.name
  const logoText     = storeSettings?.logoText     ?? wikiConfig.site.logoText
  const version      = storeSettings?.version      ?? wikiConfig.site.version
  const githubUrl    = storeSettings?.githubUrl    ?? wikiConfig.site.githubUrl
  const navLinks     = storeSettings?.navbarLinks  ?? wikiConfig.navbar.links
  const showSearch   = storeSettings?.showSearch   ?? wikiConfig.navbar.showSearch
  const showTheme    = storeSettings?.showThemeToggle ?? wikiConfig.navbar.showThemeToggle
  const showGithub   = storeSettings?.showGithub   ?? wikiConfig.navbar.showGithub
  const baseRoute    = wikiConfig.docs.baseRoute

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'h-[var(--nav-height)] flex items-center',
        'bg-bg-surface/95 backdrop-blur-sm',
        'border-b border-border',
      )}
      role="banner"
    >
      <div className="flex items-center gap-4 w-full max-w-page mx-auto px-6">

        {/* ── Brand ── */}
        <div className="flex items-center gap-3 flex-shrink-0 min-w-[var(--tw-sidebar)]">
          <Link
            href={baseRoute}
            className="flex items-center gap-2.5 text-text-primary hover:opacity-80 transition-opacity"
            aria-label={`${siteName} — главная`}
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-md bg-accent text-white text-sm font-bold">
              <BookOpen size={14} />
            </span>
            <span className="font-semibold tracking-tight text-base">{logoText}</span>
          </Link>
          {version && (
            <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-bg-elevated border border-border text-text-muted">
              {version}
            </span>
          )}
        </div>

        {/* ── Center nav links ── */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1" aria-label="Основная навигация">
          {navLinks.map(({ label, href, external, badge }) => {
            const isActive = !external && href !== '#' && pathname.startsWith(href)
            return (
              <Link
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className={cn(
                  'flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'text-text-primary bg-bg-active'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
                {external && (
                  <ExternalLink size={11} className="text-text-disabled flex-shrink-0" />
                )}
                {badge && (
                  <span className="text-[10px] font-medium px-1 py-0.5 rounded bg-accent/15 text-accent-hover ml-0.5">
                    {badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* ── Right actions ── */}
        <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
          <EditorModeToggle />
          {showSearch && <SearchTrigger />}
          {showTheme && <ThemeToggle />}
          {showGithub && githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-md text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
          )}
        </div>

        {/* Mobile hamburger */}
        <MobileMenuButton />
      </div>
    </header>
  )
}
