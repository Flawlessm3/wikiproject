/**
 * prisma/seed.ts — loads data/wiki.json into the database.
 * Run with:  npx prisma db seed
 */
import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import path from 'path'

const prisma = new PrismaClient()
const wikiData = JSON.parse(
  readFileSync(path.join(__dirname, '../data/wiki.json'), 'utf-8')
)

async function main() {
  await prisma.wikiStore.upsert({
    where:  { id: 1 },
    create: { id: 1, data: wikiData },
    update: { data: wikiData },
  })
  console.log('✓ Wiki data seeded successfully')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
