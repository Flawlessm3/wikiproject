'use client'

import { createContext, useContext } from 'react'
import { Menu, X } from 'lucide-react'

// ─── Context ─────────────────────────────────────────────────────────────────

interface SidebarCtx {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export const SidebarContext = createContext<SidebarCtx>({
  isOpen: false,
  setIsOpen: () => {},
})

export function useSidebar() {
  return useContext(SidebarContext)
}

// ─── Mobile hamburger button (rendered inside Navbar) ────────────────────────

export function MobileMenuButton() {
  const { isOpen, setIsOpen } = useSidebar()

  return (
    <button
      className="lg:hidden flex items-center justify-center w-9 h-9 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors ml-1"
      onClick={() => setIsOpen(!isOpen)}
      aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
      aria-expanded={isOpen}
      aria-controls="sidebar"
    >
      {isOpen ? <X size={18} /> : <Menu size={18} />}
    </button>
  )
}
