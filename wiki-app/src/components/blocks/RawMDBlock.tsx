'use client'

import { useState, useEffect } from 'react'

interface RawMDBlockProps {
  content: string
}

// Simple markdown to HTML conversion for display
function simpleMarkdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/^---$/gm, '<hr>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, (line) => {
      if (/^<[h123]|<hr|<p/.test(line)) return line
      return line
    })
}

export function RawMDBlock({ content }: RawMDBlockProps) {
  return (
    <div
      className="my-4 prose prose-sm max-w-none dark:prose-invert text-text-primary"
      dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(content) }}
    />
  )
}
