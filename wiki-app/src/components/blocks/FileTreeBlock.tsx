import { Folder, File } from 'lucide-react'
import type { FileTreeNode } from '@/types/blocks'

function TreeNode({
  node,
  depth = 0,
}: {
  node: FileTreeNode
  depth?: number
}) {
  const isDir = node.type === 'dir'

  return (
    <li>
      <div
        className="flex items-center gap-2 py-0.5 group"
        style={{ paddingLeft: `${depth * 16}px` }}
      >
        {isDir ? (
          <Folder size={14} className="flex-shrink-0 text-amber-400" />
        ) : (
          <File size={14} className="flex-shrink-0 text-text-muted" />
        )}
        <span
          className={`text-sm font-mono ${
            isDir ? 'text-text-primary' : 'text-text-secondary'
          }`}
        >
          {node.name}
        </span>
        {node.description && (
          <span className="text-xs text-text-disabled ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* — {node.description} */}
            — {node.description}
          </span>
        )}
      </div>

      {node.children && node.children.length > 0 && (
        <ul className="list-none pl-0">
          {node.children.map((child, i) => (
            <TreeNode key={i} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

export function FileTreeBlock({
  title,
  root,
}: {
  title?: string
  root: FileTreeNode[]
}) {
  return (
    <div className="my-5 rounded-lg border border-border bg-bg-elevated overflow-hidden">
      {title && (
        <div className="px-4 py-2 border-b border-border bg-bg-overlay text-xs font-mono text-text-muted">
          {title}
        </div>
      )}
      <div className="px-4 py-3">
        <ul className="space-y-0.5 list-none pl-0">
          {root.map((node, i) => (
            <TreeNode key={i} node={node} />
          ))}
        </ul>
      </div>
    </div>
  )
}
