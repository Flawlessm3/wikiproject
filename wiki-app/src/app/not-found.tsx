import Link from 'next/link'
import { FileQuestion } from 'lucide-react'
import { defaultSlug } from '@/config/navigation'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-bg-elevated border border-border flex items-center justify-center">
          <FileQuestion className="text-text-muted" size={28} />
        </div>

        <div className="mb-3 text-sm font-semibold tracking-widest uppercase text-text-muted">
          404
        </div>
        <h1 className="mb-3 text-2xl font-bold text-text-primary tracking-tight">
          Page not found
        </h1>
        <p className="mb-8 text-text-secondary text-sm leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href={`/docs/${defaultSlug}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-colors"
          >
            Go to Docs
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-text-secondary text-sm font-medium hover:bg-bg-hover transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}
