import { Info, Lightbulb, AlertTriangle, XCircle, FileText, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type CalloutType = 'info' | 'tip' | 'warning' | 'danger' | 'note'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}

const VARIANTS: Record<CalloutType, {
  icon: LucideIcon
  containerClass: string
  iconClass: string
  titleClass: string
  textClass: string
}> = {
  info: {
    icon: Info,
    containerClass: 'bg-blue-500/10 border-blue-500/25',
    iconClass: 'text-blue-400',
    titleClass: 'text-blue-300',
    textClass:  'text-blue-200/80',
  },
  tip: {
    icon: Lightbulb,
    containerClass: 'bg-emerald-500/10 border-emerald-500/25',
    iconClass: 'text-emerald-400',
    titleClass: 'text-emerald-300',
    textClass:  'text-emerald-200/80',
  },
  warning: {
    icon: AlertTriangle,
    containerClass: 'bg-amber-500/10 border-amber-500/25',
    iconClass: 'text-amber-400',
    titleClass: 'text-amber-300',
    textClass:  'text-amber-200/80',
  },
  danger: {
    icon: XCircle,
    containerClass: 'bg-red-500/10 border-red-500/25',
    iconClass: 'text-red-400',
    titleClass: 'text-red-300',
    textClass:  'text-red-200/80',
  },
  note: {
    icon: FileText,
    containerClass: 'bg-violet-500/10 border-violet-500/25',
    iconClass: 'text-violet-400',
    titleClass: 'text-violet-300',
    textClass:  'text-violet-200/80',
  },
}

/** Default titles per type */
const DEFAULT_TITLES: Record<CalloutType, string> = {
  info:    'Good to know',
  tip:     'Tip',
  warning: 'Warning',
  danger:  'Danger',
  note:    'Note',
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const v = VARIANTS[type]
  const Icon = v.icon
  const displayTitle = title ?? DEFAULT_TITLES[type]

  return (
    <div
      className={cn(
        'not-prose flex gap-4 items-start p-4 rounded-lg border my-5',
        v.containerClass,
      )}
      role={type === 'danger' ? 'alert' : 'note'}
    >
      <Icon size={16} className={cn('mt-0.5 flex-shrink-0', v.iconClass)} />
      <div className="flex-1 min-w-0 space-y-1">
        <p className={cn('text-sm font-semibold leading-snug', v.titleClass)}>
          {displayTitle}
        </p>
        <div className={cn('text-sm leading-relaxed [&_p]:m-0 [&_code]:text-inherit', v.textClass)}>
          {children}
        </div>
      </div>
    </div>
  )
}
