'use client'

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { v4 as uuidv4 } from 'uuid'
import type { WikiData, ContentBlock, NavNode, PageDocument, WikiSettings, UILabels } from '@/types/wiki'
import { fetchWikiData, saveWikiData } from '@/lib/wikiApi'

// ── Helper: find a NavNode recursively ────────────────────────────────────────

function findNavNode(
  nodes: NavNode[],
  id: string
): { node: NavNode; siblings: NavNode[]; index: number } | null {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === id) return { node: nodes[i], siblings: nodes, index: i }
    const children = nodes[i].children
    if (children) {
      const found = findNavNode(children, id)
      if (found) return found
    }
  }
  return null
}

// ── Store interface ────────────────────────────────────────────────────────────

interface WikiStore {
  // Data state
  wikiData: WikiData | null
  isLoading: boolean
  isSaving: boolean
  hasUnsavedChanges: boolean
  loadError: string | null
  saveError: string | null

  // Editor UI state
  isEditorMode: boolean
  currentSlug: string | null
  editorPanelOpen: boolean

  // ── Data actions ─────────────────────────────────────────────────────────
  loadWikiData: () => Promise<void>
  saveWikiData: () => Promise<void>
  replaceWikiData: (data: WikiData) => void

  // Settings
  updateSettings: (patch: Partial<WikiSettings>) => void
  updateUILabels: (labels: UILabels) => void

  // Navigation
  addNavNode: (parentId: string | null, node: Omit<NavNode, 'id'>) => string
  updateNavNode: (id: string, patch: Partial<NavNode>) => void
  deleteNavNode: (id: string) => void
  moveNavNodeUp: (id: string) => void
  moveNavNodeDown: (id: string) => void

  // Pages
  addPage: (doc: Omit<PageDocument, 'id'>) => string
  updatePageMeta: (slug: string, patch: Partial<PageDocument['meta']>) => void
  deletePage: (slug: string) => void

  // Blocks
  addBlock: (slug: string, block: ContentBlock, afterId?: string) => void
  updateBlock: (slug: string, blockId: string, patch: Record<string, unknown>) => void
  deleteBlock: (slug: string, blockId: string) => void
  moveBlock: (slug: string, blockId: string, newIndex: number) => void
  duplicateBlock: (slug: string, blockId: string) => void

  // UI
  toggleEditorMode: () => void
  setEditorMode: (on: boolean) => void
  setCurrentPage: (slug: string | null) => void
  setEditorPanelOpen: (open: boolean) => void
}

// ── Store implementation ──────────────────────────────────────────────────────

export const useWikiStore = create<WikiStore>()(
  immer((set, get) => ({
    wikiData: null,
    isLoading: false,
    isSaving: false,
    hasUnsavedChanges: false,
    loadError: null,
    saveError: null,
    isEditorMode: false,
    currentSlug: null,
    editorPanelOpen: false,

    loadWikiData: async () => {
      set(s => { s.isLoading = true; s.loadError = null })
      try {
        const data = await fetchWikiData()
        set(s => {
          s.wikiData = data
          s.isLoading = false
          s.hasUnsavedChanges = false
        })
      } catch (e) {
        set(s => { s.loadError = String(e); s.isLoading = false })
      }
    },

    saveWikiData: async () => {
      const data = get().wikiData
      if (!data) return
      set(s => { s.isSaving = true; s.saveError = null })
      try {
        await saveWikiData(data)
        set(s => { s.isSaving = false; s.hasUnsavedChanges = false })
      } catch (e) {
        set(s => { s.saveError = String(e); s.isSaving = false })
      }
    },

    replaceWikiData: (data) => {
      set(s => {
        s.wikiData = data
        s.hasUnsavedChanges = true
      })
    },

    // ── Settings ──────────────────────────────────────────────────────────────

    updateSettings: (patch) => set(s => {
      if (!s.wikiData) return
      Object.assign(s.wikiData.settings, patch)
      s.hasUnsavedChanges = true
    }),

    updateUILabels: (labels) => set(s => {
      if (!s.wikiData) return
      s.wikiData.settings.uiLabels = labels
      s.hasUnsavedChanges = true
    }),

    // ── Navigation ────────────────────────────────────────────────────────────

    addNavNode: (parentId, nodeData) => {
      const id = uuidv4()
      set(s => {
        if (!s.wikiData) return
        const newNode: NavNode = { ...nodeData, id }
        if (parentId === null) {
          s.wikiData.navigation.push(newNode)
        } else {
          const found = findNavNode(s.wikiData.navigation, parentId)
          if (found?.node.children !== undefined) {
            found.node.children.push(newNode)
          } else if (found) {
            found.node.children = [newNode]
          }
        }
        s.hasUnsavedChanges = true
      })
      return id
    },

    updateNavNode: (id, patch) => set(s => {
      if (!s.wikiData) return
      const found = findNavNode(s.wikiData.navigation, id)
      if (found) Object.assign(found.node, patch)
      s.hasUnsavedChanges = true
    }),

    deleteNavNode: (id) => set(s => {
      if (!s.wikiData) return
      const found = findNavNode(s.wikiData.navigation, id)
      if (found) found.siblings.splice(found.index, 1)
      s.hasUnsavedChanges = true
    }),

    moveNavNodeUp: (id) => set(s => {
      if (!s.wikiData) return
      const found = findNavNode(s.wikiData.navigation, id)
      if (!found || found.index === 0) return
      const arr = found.siblings
      const tmp = arr[found.index - 1]
      arr[found.index - 1] = arr[found.index]
      arr[found.index] = tmp
      // re-order
      arr.forEach((n, i) => { n.order = i })
      s.hasUnsavedChanges = true
    }),

    moveNavNodeDown: (id) => set(s => {
      if (!s.wikiData) return
      const found = findNavNode(s.wikiData.navigation, id)
      if (!found || found.index === found.siblings.length - 1) return
      const arr = found.siblings
      const tmp = arr[found.index + 1]
      arr[found.index + 1] = arr[found.index]
      arr[found.index] = tmp
      arr.forEach((n, i) => { n.order = i })
      s.hasUnsavedChanges = true
    }),

    // ── Pages ─────────────────────────────────────────────────────────────────

    addPage: (doc) => {
      const id = uuidv4()
      set(s => {
        if (!s.wikiData) return
        s.wikiData.pages[doc.meta.slug] = { ...doc, id }
        s.hasUnsavedChanges = true
      })
      return doc.meta.slug
    },

    updatePageMeta: (slug, patch) => set(s => {
      if (!s.wikiData?.pages[slug]) return
      Object.assign(s.wikiData.pages[slug].meta, patch)
      s.hasUnsavedChanges = true
    }),

    deletePage: (slug) => set(s => {
      if (!s.wikiData) return
      delete s.wikiData.pages[slug]
      s.hasUnsavedChanges = true
    }),

    // ── Blocks ────────────────────────────────────────────────────────────────

    addBlock: (slug, block, afterId) => set(s => {
      const page = s.wikiData?.pages[slug]
      if (!page) return
      if (!afterId) {
        page.blocks.push(block)
      } else {
        const idx = page.blocks.findIndex(b => b.id === afterId)
        page.blocks.splice(idx === -1 ? page.blocks.length : idx + 1, 0, block)
      }
      s.hasUnsavedChanges = true
    }),

    updateBlock: (slug, blockId, patch) => set(s => {
      const page = s.wikiData?.pages[slug]
      if (!page) return
      const idx = page.blocks.findIndex(b => b.id === blockId)
      if (idx !== -1) Object.assign(page.blocks[idx], patch)
      s.hasUnsavedChanges = true
    }),

    deleteBlock: (slug, blockId) => set(s => {
      const page = s.wikiData?.pages[slug]
      if (!page) return
      page.blocks = page.blocks.filter(b => b.id !== blockId)
      s.hasUnsavedChanges = true
    }),

    moveBlock: (slug, blockId, newIndex) => set(s => {
      const page = s.wikiData?.pages[slug]
      if (!page) return
      const idx = page.blocks.findIndex(b => b.id === blockId)
      if (idx === -1) return
      const [block] = page.blocks.splice(idx, 1)
      page.blocks.splice(newIndex, 0, block)
      s.hasUnsavedChanges = true
    }),

    duplicateBlock: (slug, blockId) => set(s => {
      const page = s.wikiData?.pages[slug]
      if (!page) return
      const idx = page.blocks.findIndex(b => b.id === blockId)
      if (idx === -1) return
      const copy = { ...page.blocks[idx], id: uuidv4() }
      page.blocks.splice(idx + 1, 0, copy)
      s.hasUnsavedChanges = true
    }),

    // ── UI state ──────────────────────────────────────────────────────────────

    toggleEditorMode: () => set(s => {
      s.isEditorMode = !s.isEditorMode
      if (typeof window !== 'undefined') {
        localStorage.setItem('wiki-editor-mode', String(s.isEditorMode))
      }
    }),

    setEditorMode: (on) => set(s => {
      s.isEditorMode = on
      if (typeof window !== 'undefined') {
        localStorage.setItem('wiki-editor-mode', String(on))
      }
    }),

    setCurrentPage: (slug) => set(s => { s.currentSlug = slug }),

    setEditorPanelOpen: (open) => set(s => { s.editorPanelOpen = open }),
  }))
)

// ── Selector helpers (stable references, avoid re-renders) ────────────────────

// Stable empty fallbacks — prevents new object references on every selector call
// when wikiData is null, which would cause useSyncExternalStore to loop.
const EMPTY_NAV: import('@/types/wiki').NavNode[] = []
const EMPTY_PAGES: Record<string, import('@/types/wiki').PageDocument> = {}

export const selectSettings = (s: WikiStore) => s.wikiData?.settings ?? null
export const selectNavigation = (s: WikiStore) => s.wikiData?.navigation ?? EMPTY_NAV
export const selectPages = (s: WikiStore) => s.wikiData?.pages ?? EMPTY_PAGES
export const selectPage = (slug: string) => (s: WikiStore) =>
  s.wikiData?.pages[slug] ?? null
export const selectIsEditorMode = (s: WikiStore) => s.isEditorMode
export const selectHasUnsavedChanges = (s: WikiStore) => s.hasUnsavedChanges
export const selectIsSaving = (s: WikiStore) => s.isSaving
export const selectEditorPanelOpen = (s: WikiStore) => s.editorPanelOpen
