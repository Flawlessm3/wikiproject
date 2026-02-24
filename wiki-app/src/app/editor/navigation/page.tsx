'use client'

import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { useWikiStore } from '@/store/wikiStore'
import { NavigationEditor } from '@/components/editor/navigation/NavigationEditor'

export const dynamic = 'force-dynamic'

export default function NavigationPage() {
  const saveWikiData = useWikiStore(s => s.saveWikiData)
  const hasUnsavedChanges = useWikiStore(s => s.hasUnsavedChanges)
  const isSaving = useWikiStore(s => s.isSaving)

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Top bar */}
      <div className="border-b border-border bg-bg-surface sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/editor"
              className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
            >
              <ArrowLeft size={16} />
            </Link>
            <h1 className="text-sm font-semibold text-text-primary">Навигация</h1>
          </div>
          <button
            onClick={saveWikiData}
            disabled={!hasUnsavedChanges || isSaving}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-accent text-white rounded-md hover:bg-accent-hover transition-colors disabled:opacity-50"
          >
            <Save size={13} />
            {isSaving ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-6">
        <p className="text-xs text-text-muted mb-4">
          Управляйте деревом навигации: добавляйте, редактируйте и удаляйте группы, страницы и ссылки.
          Изменения отображаются сразу в боковой панели.
        </p>
        <NavigationEditor />
      </div>
    </div>
  )
}
