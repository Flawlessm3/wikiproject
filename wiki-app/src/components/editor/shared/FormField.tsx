import { cn } from '@/lib/utils'

interface FormFieldProps {
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
  className?: string
}

export function FormField({ label, required, hint, error, children, className }: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="block text-xs font-medium text-text-secondary">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-[11px] text-text-muted">{hint}</p>
      )}
      {error && (
        <p className="text-[11px] text-red-400">{error}</p>
      )}
    </div>
  )
}

// Shared input/textarea/select classes
export const inputCls = 'w-full px-3 py-2 text-sm bg-bg-base border border-border rounded-md text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors'
export const textareaCls = `${inputCls} resize-y min-h-[80px] leading-relaxed font-mono`
export const selectCls = `${inputCls} cursor-pointer`
