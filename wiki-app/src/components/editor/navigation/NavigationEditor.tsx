'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useWikiStore } from '@/store/wikiStore'
import { NavNodeItem } from './NavNodeItem'
import { AddNavNodeModal } from './AddNavNodeModal'

export function NavigationEditor() {
  const navigation = useWikiStore(s => s.wikiData?.navigation ?? [])
  const [adding, setAdding] = useState(false)

  return (
    <div className="space-y-2">
      <div className="bg-bg-surface border border-border rounded-xl overflow-hidden">
        {navigation.length === 0 ? (
          <div className="py-12 text-center text-sm text-text-muted">
            Навигация пуста. Добавьте первый элемент.
          </div>
        ) : (
          <div className="p-2">
            {navigation.map((node, i) => (
              <NavNodeItem
                key={node.id}
                node={node}
                isFirst={i === 0}
                isLast={i === navigation.length - 1}
              />
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => setAdding(true)}
        className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-border rounded-xl text-sm text-text-muted hover:text-text-secondary hover:border-border-strong transition-colors"
      >
        <Plus size={15} />
        Добавить элемент навигации
      </button>

      <AddNavNodeModal
        open={adding}
        onClose={() => setAdding(false)}
        parentId={null}
      />
    </div>
  )
}
