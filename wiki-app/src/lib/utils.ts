import { clsx, type ClassValue } from 'clsx'

/** Merge Tailwind class names */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/** Format a date string for display */
export function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

/** Estimate reading time in minutes */
export function readingTime(text: string): string {
  const wpm = 200
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wpm)
  return `${minutes} min read`
}

/** Convert a heading text to a URL-safe ID (matches rehype-slug output) */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
