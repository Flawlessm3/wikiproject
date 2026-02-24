'use client'

import { useEffect, useRef } from 'react'
import { useWikiStore } from '@/store/wikiStore'

const AUTOSAVE_DELAY_MS = 2000

interface WikiProviderProps {
  children: React.ReactNode
}

/**
 * WikiProvider — loads wiki data from /api/wiki on mount,
 * restores editor mode preference from localStorage, and
 * autosaves on changes (debounced 2s).
 */
export function WikiProvider({ children }: WikiProviderProps) {
  // Use specific selectors to avoid subscribing to the entire store,
  // which would cause this component (and all children) to re-render on
  // every single state mutation.
  const loadWikiData = useWikiStore(s => s.loadWikiData)
  const saveWikiData = useWikiStore(s => s.saveWikiData)
  const setEditorMode = useWikiStore(s => s.setEditorMode)
  const hasUnsavedChanges = useWikiStore(s => s.hasUnsavedChanges)
  const wikiData = useWikiStore(s => s.wikiData)

  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Initial load + restore editor mode
  useEffect(() => {
    loadWikiData()
    const savedMode = localStorage.getItem('wiki-editor-mode')
    if (savedMode === 'true') setEditorMode(true)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Autosave when there are unsaved changes
  useEffect(() => {
    if (!hasUnsavedChanges || !wikiData) return
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current)
    autosaveTimer.current = setTimeout(() => {
      saveWikiData()
    }, AUTOSAVE_DELAY_MS)
    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current)
    }
  }, [hasUnsavedChanges, wikiData]) // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>
}
