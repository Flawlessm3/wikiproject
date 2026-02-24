import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex items-center flex-wrap gap-1 text-sm text-text-muted">
        <li>
          <Link href="/docs" className="hover:text-text-secondary transition-colors">
            Docs
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronRight size={13} className="text-text-disabled flex-shrink-0" aria-hidden />
            {item.href ? (
              <Link href={item.href} className="hover:text-text-secondary transition-colors capitalize">
                {item.label}
              </Link>
            ) : (
              <span className="text-text-secondary capitalize" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
