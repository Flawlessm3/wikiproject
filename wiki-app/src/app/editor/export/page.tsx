'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, Upload, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react'
import { useWikiStore } from '@/store/wikiStore'
import { WikiDataSchema } from '@/lib/wikiSchema'
import type { WikiData } from '@/types/wiki'

export const dynamic = 'force-dynamic'

export default function ExportPage() {
  const wikiData = useWikiStore(s => s.wikiData)
  const replaceWikiData = useWikiStore(s => s.replaceWikiData)
  const loadWikiData = useWikiStore(s => s.loadWikiData)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [importError, setImportError] = useState('')
  const [resetConfirm, setResetConfirm] = useState(false)

  function handleExport() {
    if (!wikiData) return
    const blob = new Blob([JSON.stringify(wikiData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `wiki-export-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImportStatus('idle')
    setImportError('')

    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const raw = JSON.parse(ev.target?.result as string)
        const parsed = WikiDataSchema.parse(raw) as WikiData
        replaceWikiData(parsed)
        setImportStatus('success')
      } catch (err: unknown) {
        setImportStatus('error')
        setImportError(err instanceof Error ? err.message : 'Ошибка парсинга JSON')
      }
    }
    reader.readAsText(file)

    // Reset input so same file can be re-imported
    e.target.value = ''
  }

  async function handleReset() {
    if (!resetConfirm) {
      setResetConfirm(true)
      return
    }
    setResetConfirm(false)
    await loadWikiData()
  }

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Top bar */}
      <div className="border-b border-border bg-bg-surface sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 py-3 flex items-center gap-3">
          <Link
            href="/editor"
            className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <h1 className="text-sm font-semibold text-text-primary">Экспорт / Импорт</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6 space-y-4">
        {/* Export */}
        <div className="bg-bg-surface border border-border rounded-xl p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <Download size={15} className="text-emerald-400" />
                Экспорт данных
              </h2>
              <p className="text-xs text-text-muted mt-1">
                Скачать все данные вики (страницы, навигацию, настройки) в формате JSON.
              </p>
            </div>
            <button
              onClick={handleExport}
              disabled={!wikiData}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              <Download size={14} />
              Скачать JSON
            </button>
          </div>
        </div>

        {/* Import */}
        <div className="bg-bg-surface border border-border rounded-xl p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <Upload size={15} className="text-blue-400" />
                Импорт данных
              </h2>
              <p className="text-xs text-text-muted mt-1">
                Загрузить JSON-файл. Данные будут проверены по схеме перед применением.
                Текущие данные будут заменены.
              </p>

              {importStatus === 'success' && (
                <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
                  <CheckCircle size={14} />
                  Данные успешно импортированы
                </div>
              )}
              {importStatus === 'error' && (
                <div className="mt-3 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-red-400">
                    <AlertCircle size={14} />
                    Ошибка импорта
                  </div>
                  <p className="text-[11px] text-red-400/80 font-mono pl-5">{importError}</p>
                </div>
              )}
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImport}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Upload size={14} />
                Выбрать файл
              </button>
            </div>
          </div>
        </div>

        {/* Reset */}
        <div className="bg-bg-surface border border-border rounded-xl p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <RotateCcw size={15} className="text-red-400" />
                Перезагрузить данные
              </h2>
              <p className="text-xs text-text-muted mt-1">
                Перезагрузить данные с сервера (из файла data/wiki.json).
                Несохранённые изменения будут потеряны.
              </p>
            </div>
            <button
              onClick={handleReset}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                resetConfirm
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'border border-border text-text-secondary hover:text-text-primary hover:bg-bg-hover'
              }`}
            >
              <RotateCcw size={14} />
              {resetConfirm ? 'Подтвердить сброс' : 'Перезагрузить'}
            </button>
          </div>
          {resetConfirm && (
            <p className="mt-2 text-xs text-red-400">
              Нажмите ещё раз для подтверждения. Все несохранённые изменения будут потеряны.{' '}
              <button
                onClick={() => setResetConfirm(false)}
                className="underline hover:no-underline"
              >
                Отмена
              </button>
            </p>
          )}
        </div>

        {/* Info */}
        <div className="text-xs text-text-disabled text-center pt-2">
          Данные хранятся в <code className="font-mono">data/wiki.json</code> и сохраняются через API.
        </div>
      </div>
    </div>
  )
}
