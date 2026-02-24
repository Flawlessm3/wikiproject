'use client'

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useWikiStore, selectPage } from '@/store/wikiStore'
import { BlockEditorItem } from './BlockEditorItem'
import { AddBlockMenu } from './AddBlockMenu'
import type { ContentBlock } from '@/types/wiki'

interface BlockEditorListProps {
  blocks: ContentBlock[]
  slug: string
}

export function BlockEditorList({ blocks, slug }: BlockEditorListProps) {
  const { moveBlock } = useWikiStore()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIdx = blocks.findIndex(b => b.id === active.id)
    const newIdx = blocks.findIndex(b => b.id === over.id)
    if (oldIdx !== -1 && newIdx !== -1) {
      moveBlock(slug, String(active.id), newIdx)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2 pb-4">
          {blocks.map(block => (
            <BlockEditorItem key={block.id} block={block} slug={slug} />
          ))}
        </div>
      </SortableContext>

      <AddBlockMenu
        slug={slug}
        afterId={blocks[blocks.length - 1]?.id}
      />
    </DndContext>
  )
}
