'use client'

import { useEffect, useRef } from 'react'

interface Props {
  ids: string[]
  children: React.ReactNode
}

/**
 * TOCScrollspy — Client Component
 * Uses IntersectionObserver to highlight the currently visible heading in the TOC.
 * Adds/removes CSS classes on `[data-toc-id]` anchor elements.
 */
export function TOCScrollspy({ ids, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container || !ids.length) return

    const NAV_HEIGHT = 56 + 8 // --nav-height + small buffer

    // Map from id → TOC <a> element
    const linkMap = new Map<string, HTMLAnchorElement>()
    ids.forEach(id => {
      const el = container.querySelector<HTMLAnchorElement>(`[data-toc-id="${id}"]`)
      if (el) linkMap.set(id, el)
    })

    let activeId: string | null = null

    function setActive(id: string | null) {
      if (id === activeId) return
      activeId = id

      linkMap.forEach((el, elId) => {
        if (elId === id) {
          el.classList.add('!text-accent-hover', '!border-accent', '!font-medium', 'bg-accent-subtle/40')
          el.classList.remove('text-text-muted', 'border-transparent')
        } else {
          el.classList.remove('!text-accent-hover', '!border-accent', '!font-medium', 'bg-accent-subtle/40')
          el.classList.add('text-text-muted', 'border-transparent')
        }
      })
    }

    const observer = new IntersectionObserver(
      entries => {
        // Find the topmost visible heading
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          setActive(visible[0].target.id)
        }
      },
      {
        rootMargin: `-${NAV_HEIGHT}px 0px -60% 0px`,
        threshold: 0,
      }
    )

    // Observe each heading in the document
    ids.forEach(id => {
      const heading = document.getElementById(id)
      if (heading) observer.observe(heading)
    })

    // Set initial active state based on scroll position
    const firstVisible = ids.find(id => {
      const el = document.getElementById(id)
      if (!el) return false
      const rect = el.getBoundingClientRect()
      return rect.top >= NAV_HEIGHT && rect.top < window.innerHeight * 0.5
    })
    if (firstVisible) setActive(firstVisible)
    else if (ids[0]) setActive(ids[0])

    return () => observer.disconnect()
  }, [ids])

  return <div ref={ref}>{children}</div>
}
