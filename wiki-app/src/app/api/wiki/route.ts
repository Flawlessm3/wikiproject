import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'data', 'wiki.json')

export async function GET() {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8')
    const data = JSON.parse(raw)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to read wiki data' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    if (!body.version || !body.settings || !body.navigation || !body.pages) {
      return NextResponse.json({ error: 'Invalid wiki data structure' }, { status: 400 })
    }
    await fs.writeFile(DATA_PATH, JSON.stringify(body, null, 2), 'utf-8')
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to write wiki data' }, { status: 500 })
  }
}
