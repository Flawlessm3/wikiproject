import type { WikiData } from '@/types/wiki'

const API_URL = '/api/wiki'

export async function fetchWikiData(): Promise<WikiData> {
  const res = await fetch(API_URL, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch wiki data: ${res.status}`)
  return res.json()
}

export async function saveWikiData(data: WikiData): Promise<void> {
  const res = await fetch(API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Failed to save wiki data: ${res.status}`)
}
