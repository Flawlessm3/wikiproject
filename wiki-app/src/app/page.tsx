import { redirect } from 'next/navigation'
import { defaultSlug } from '@/config/navigation'

/**
 * Root page — redirects to the first documentation page.
 * Change `defaultSlug` in src/config/navigation.ts to update the redirect target.
 */
export default function HomePage() {
  redirect(`/docs/${defaultSlug}`)
}
