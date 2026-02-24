'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed bottom-8 right-8 z-50',
        'w-10 h-10 rounded-full',
        'bg-bg-elevated border border-border-strong',
        'text-text-secondary hover:text-text-primary hover:bg-bg-hover',
        'shadow-md flex items-center justify-center',
        'transition-all duration-300',
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none',
      )}
      aria-label="Scroll to top"
    >
      <ChevronUp size={18} />
    </button>
  )
}
