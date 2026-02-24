import { FolderOpen, AlertCircle, SearchX, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── EmptyState ────────────────────────────────────────────────────────────────

interface EmptyStateProps {
  title?: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  title = 'No content yet',
  description = 'This section is empty. Add content to get started.',
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center gap-4 py-16 px-8 rounded-xl border border-dashed border-border bg-bg-elevated',
        className,
      )}
      role="status"
    >
      <div className="w-14 h-14 rounded-full bg-bg-overlay border border-border flex items-center justify-center">
        <FolderOpen size={24} className="text-text-muted" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-text-primary">{title}</h3>
        <p className="text-sm text-text-muted max-w-xs mx-auto leading-relaxed">{description}</p>
      </div>
      {action}
    </div>
  )
}

// ─── ErrorState ────────────────────────────────────────────────────────────────

interface ErrorStateProps {
  title?: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'Failed to load content. Please try again.',
  action,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center gap-4 py-16 px-8 rounded-xl border border-red-500/25 bg-red-500/5',
        className,
      )}
      role="alert"
    >
      <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center">
        <AlertCircle size={24} className="text-red-400" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-red-300">{title}</h3>
        <p className="text-sm text-red-300/70 max-w-xs mx-auto leading-relaxed">{description}</p>
      </div>
      {action}
    </div>
  )
}

// ─── NoResultsState ─────────────────────────────────────────────────────────────

export function NoResultsState({ query }: { query?: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center gap-4 py-12 px-8"
      role="status"
    >
      <div className="w-14 h-14 rounded-full bg-bg-elevated border border-border flex items-center justify-center">
        <SearchX size={24} className="text-text-muted" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-text-primary">No results found</h3>
        <p className="text-sm text-text-muted max-w-xs mx-auto leading-relaxed">
          {query
            ? <>No results for <strong>&ldquo;{query}&rdquo;</strong>. Try different keywords.</>
            : 'No articles matched your search.'}
        </p>
      </div>
    </div>
  )
}

// ─── SkeletonBlock ─────────────────────────────────────────────────────────────

export function SkeletonBlock() {
  return (
    <div
      className="space-y-4 p-6 rounded-xl border border-border bg-bg-elevated"
      aria-busy="true"
      aria-label="Loading content"
      role="status"
    >
      <div className="h-7 w-1/2 rounded-md bg-bg-hover animate-shimmer bg-gradient-to-r from-bg-hover via-bg-active to-bg-hover bg-[length:200%_100%]" />
      <div className="space-y-2">
        <div className="h-3.5 w-full rounded bg-bg-hover animate-shimmer bg-gradient-to-r from-bg-hover via-bg-active to-bg-hover bg-[length:200%_100%]" />
        <div className="h-3.5 w-4/5 rounded bg-bg-hover animate-shimmer bg-gradient-to-r from-bg-hover via-bg-active to-bg-hover bg-[length:200%_100%]" />
        <div className="h-3.5 w-full rounded bg-bg-hover animate-shimmer bg-gradient-to-r from-bg-hover via-bg-active to-bg-hover bg-[length:200%_100%]" />
      </div>
      <div className="h-20 w-full rounded-lg bg-bg-hover animate-shimmer bg-gradient-to-r from-bg-hover via-bg-active to-bg-hover bg-[length:200%_100%]" />
    </div>
  )
}

// ─── LoadingSpinner ────────────────────────────────────────────────────────────

export function LoadingSpinner({ label = 'Loading…' }: { label?: string }) {
  return (
    <div
      className="flex items-center justify-center gap-2 py-12 text-text-muted text-sm"
      role="status"
      aria-label={label}
    >
      <Loader2 size={18} className="animate-spin" />
      {label}
    </div>
  )
}
