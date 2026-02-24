'use client'

import { Settings2 } from 'lucide-react'
import { useWikiStore, selectEditorPanelOpen } from '@/store/wikiStore'

interface EditPageButtonProps {
  slug: string
}

export function EditPageButton({ slug }: EditPageButtonProps) {
  const { setEditorPanelOpen, setCurrentPage } = useWikiStore()
  const isOpen = useWikiStore(selectEditorPanelOpen)

  function handleClick() {
    setCurrentPage(slug)
    setEditorPanelOpen(true)
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-accent/40 text-accent hover:bg-accent hover:text-white transition-colors flex-shrink-0"
      aria-label="Редактировать страницу"
    >
      <Settings2 size={12} />
      Редактировать страницу
    </button>
  )
}
