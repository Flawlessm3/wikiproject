import { parseInline } from '@/lib/inline-md'
import type { StepItem } from '@/types/blocks'

export function StepsBlock({
  title,
  items,
}: {
  title?: string
  items: StepItem[]
}) {
  return (
    <div className="my-6">
      {title && (
        <h3 className="text-base font-semibold text-text-primary mb-5">{title}</h3>
      )}

      <ol className="relative space-y-0 list-none pl-0">
        {items.map((step, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="flex gap-5">
              {/* Step number + line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-sm font-bold text-accent-hover z-10 flex-shrink-0">
                  {i + 1}
                </div>
                {!isLast && (
                  <div className="w-px flex-1 bg-border mt-1 mb-1 min-h-[1.5rem]" aria-hidden />
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 min-w-0 ${isLast ? 'pb-0' : 'pb-6'}`}>
                <h4 className="text-sm font-semibold text-text-primary mb-1.5 mt-1">
                  {step.title}
                </h4>
                {step.description && (
                  <p className="text-sm text-text-secondary leading-relaxed mb-2">
                    {parseInline(step.description)}
                  </p>
                )}
                {step.code && (
                  <pre className="text-xs font-mono bg-bg-elevated border border-border rounded-lg p-3 overflow-x-auto text-text-secondary mb-2">
                    <code>{step.code}</code>
                  </pre>
                )}
                {step.note && (
                  <p className="text-xs text-text-muted italic">
                    {parseInline(step.note)}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
