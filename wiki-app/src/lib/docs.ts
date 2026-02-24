import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Doc, DocFrontmatter } from '@/types'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'docs')

// ─── Internal helpers ────────────────────────────────────────────────────────

/** Recursively collect all .mdx / .md file paths */
function collectMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files: string[] = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...collectMdxFiles(full))
    } else if (/\.(mdx?|md)$/.test(entry.name)) {
      files.push(full)
    }
  }
  return files
}

/** Convert an absolute file path to a slug array */
function filePathToSlug(filePath: string): string[] {
  const rel = path.relative(CONTENT_DIR, filePath)
  const withoutExt = rel.replace(/\.(mdx?|md)$/, '')
  const parts = withoutExt.split(path.sep)
  // Remove trailing "index" segment
  if (parts[parts.length - 1] === 'index') parts.pop()
  return parts
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Returns all valid slug param arrays.
 * Used by generateStaticParams() in [  ...slug]/page.tsx.
 */
export function getAllDocSlugs(): { slug: string[] }[] {
  return collectMdxFiles(CONTENT_DIR).map(fp => ({
    slug: filePathToSlug(fp),
  }))
}

/**
 * Load a single document by its slug array.
 * Tries: <slug>.mdx → <slug>/index.mdx → null
 */
export function getDocBySlug(slug: string[]): Doc | null {
  const slugPath = slug.join(path.sep)
  const candidates = [
    path.join(CONTENT_DIR, `${slugPath}.mdx`),
    path.join(CONTENT_DIR, `${slugPath}.md`),
    path.join(CONTENT_DIR, slugPath, 'index.mdx'),
    path.join(CONTENT_DIR, slugPath, 'index.md'),
  ]

  let filePath: string | null = null
  for (const c of candidates) {
    if (fs.existsSync(c)) { filePath = c; break }
  }
  if (!filePath) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    href: `/docs/${slug.join('/')}`,
    frontmatter: data as DocFrontmatter,
    content,
    filePath,
  }
}

/** Load all docs (used for related-links, search index, etc.) */
export function getAllDocs(): Doc[] {
  return collectMdxFiles(CONTENT_DIR)
    .map(fp => getDocBySlug(filePathToSlug(fp)))
    .filter((d): d is Doc => d !== null)
}
