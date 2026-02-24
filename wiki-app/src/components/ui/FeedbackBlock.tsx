'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { uiLabels } from 'content/config/ui-labels'

type Vote = 'yes' | 'no' | null

/**
 * Feedback widget — thumbs up / down.
 * All text strings come from content/config/ui-labels.ts → feedback.*
 */
export function FeedbackBlock() {
  const [vote, setVote] = useState<Vote>(null)
  const labels = uiLabels.feedback

  function handleVote(v: Vote) {
    setVote(v)
    // Replace with your analytics / API call:
    console.info('[Feedback]', v, typeof window !== 'undefined' ? window.location.href : '')
  }

  return (
    <div className="flex items-center flex-wrap gap-4 px-5 py-4 rounded-lg border border-border bg-bg-elevated my-8">
      {!vote ? (
        <>
          <p className="text-sm font-medium text-text-secondary mr-auto">
            {labels.question}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleVote('yes')}
              className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md border border-border bg-bg-overlay text-text-muted hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-colors"
              aria-label={labels.yes}
            >
              <ThumbsUp size={13} /> {labels.yes}
            </button>
            <button
              onClick={() => handleVote('no')}
              className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md border border-border bg-bg-overlay text-text-muted hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-colors"
              aria-label={labels.no}
            >
              <ThumbsDown size={13} /> {labels.no}
            </button>
          </div>
        </>
      ) : (
        <p className="text-sm text-text-secondary w-full text-center" aria-live="polite">
          {vote === 'yes' ? labels.thanksYes : labels.thanksNo}
        </p>
      )}
    </div>
  )
}
