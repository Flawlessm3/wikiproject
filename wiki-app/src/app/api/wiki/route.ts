import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import type { WikiData } from '@/types/wiki'

const DATA_PATH = path.join(process.cwd(), 'data', 'wiki.json')

// Use Prisma when DATABASE_URL is set (Vercel / any PostgreSQL).
// Fall back to the local filesystem otherwise — zero setup for local dev.
const useDatabase = !!process.env.DATABASE_URL

async function readData(): Promise<WikiData> {
  if (useDatabase) {
    const { prisma } = await import('@/lib/prisma')
    let record = await prisma.wikiStore.findUnique({ where: { id: 1 } })
    if (!record) {
      // First deploy: seed from bundled wiki.json
      const seed = JSON.parse(await fs.readFile(DATA_PATH, 'utf-8'))
      record = await prisma.wikiStore.create({ data: { id: 1, data: seed } })
    }
    return record.data as unknown as WikiData
  }
  return JSON.parse(await fs.readFile(DATA_PATH, 'utf-8')) as WikiData
}

async function writeData(data: WikiData): Promise<void> {
  if (useDatabase) {
    const { prisma } = await import('@/lib/prisma')
    await prisma.wikiStore.upsert({
      where:  { id: 1 },
      create: { id: 1, data: data as object },
      update: { data: data as object },
    })
    return
  }
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
