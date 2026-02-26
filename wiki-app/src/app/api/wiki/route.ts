import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import type { WikiData } from '@/types/wiki'

const DATA_PATH = path.join(process.cwd(), 'data', 'wiki.json')
const KV_KEY = 'wiki-data'

// Vercel KV is available when KV_REST_API_URL + KV_REST_API_TOKEN env vars are set.
// Locally we fall back to the filesystem so no extra setup is needed.
function isKVAvailable() {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

async function readData(): Promise<WikiData> {
  if (isKVAvailable()) {
    const { kv } = await import('@vercel/kv')
    const data = await kv.get<WikiData>(KV_KEY)
    if (data) return data
    // KV is empty (first deploy) — seed from bundled wiki.json
    const seed = JSON.parse(await fs.readFile(DATA_PATH, 'utf-8')) as WikiData
    await kv.set(KV_KEY, seed)
    return seed
  }
  // Local dev: read from filesystem
  return JSON.parse(await fs.readFile(DATA_PATH, 'utf-8')) as WikiData
}

async function writeData(data: WikiData): Promise<void> {
  if (isKVAvailable()) {
    const { kv } = await import('@vercel/kv')
    await kv.set(KV_KEY, data)
    return
  }
  // Local dev: write to filesystem
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

export async function GET() {
  try {
    const data = await readData()
    return NextResponse.json(data)
  } catch (e) {
    return NextResponse.json({ error: `Failed to read wiki data: ${e}` }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    if (!body.version || !body.settings || !body.navigation || !body.pages) {
      return NextResponse.json({ error: 'Invalid wiki data structure' }, { status: 400 })
    }
    await writeData(body as WikiData)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: `Failed to write wiki data: ${e}` }, { status: 500 })
  }
}
