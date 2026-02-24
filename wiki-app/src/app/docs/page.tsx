import { redirect } from 'next/navigation'
import { defaultSlug } from '@/config/navigation'

/** /docs → redirect to first page */
export default function DocsIndexPage() {
  redirect(`/docs/${defaultSlug}`)
}
