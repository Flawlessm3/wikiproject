import type { RecipeIngredient } from '@/types/wiki'

interface RecipeBlockProps {
  title?: string
  ingredients: RecipeIngredient[]
  result: string
  shape?: string[][]
}

export function RecipeBlock({ title, ingredients, result, shape }: RecipeBlockProps) {
  return (
    <div className="my-6 p-4 rounded-lg border border-border bg-bg-elevated">
      {title && (
        <h3 className="text-base font-semibold text-text-primary mb-3">{title}</h3>
      )}

      {shape ? (
        // Grid recipe (like Minecraft crafting table)
        <div className="flex items-center gap-6 mb-4">
          <div className="grid grid-cols-3 gap-1">
            {shape.flat().map((slot, i) => {
              const ingredient = ingredients.find(ing => ing.slot === slot)
              return (
                <div
                  key={i}
                  title={ingredient ? `${ingredient.item}${ingredient.count ? ` ×${ingredient.count}` : ''}` : ''}
                  className="w-10 h-10 border border-border-strong bg-bg-base rounded flex items-center justify-center text-xs text-text-muted"
                >
                  {slot || ''}
                </div>
              )
            })}
          </div>
          <div className="text-text-muted text-lg">→</div>
          <div className="w-12 h-12 border-2 border-accent bg-bg-base rounded flex items-center justify-center text-xs text-center text-text-muted px-1">
            {result}
          </div>
        </div>
      ) : (
        // Shapeless recipe
        <div className="flex flex-wrap gap-2 mb-4">
          {ingredients.map((ing, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-bg-hover border border-border text-xs text-text-secondary"
            >
              {ing.item}
              {ing.count && ing.count > 1 && (
                <span className="text-text-muted">×{ing.count}</span>
              )}
            </span>
          ))}
          <span className="text-text-muted">→</span>
          <span className="px-2 py-1 rounded-md bg-accent-subtle border border-accent-border text-xs text-accent font-medium">
            {result}
          </span>
        </div>
      )}

      <div className="mt-3 border-t border-border pt-3">
        <table className="w-full text-xs">
          <tbody>
            {ingredients.map((ing, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="py-1 pr-3 font-mono text-text-secondary">{ing.slot}</td>
                <td className="py-1 text-text-primary">{ing.item}</td>
                {ing.count && <td className="py-1 pl-3 text-text-muted">×{ing.count}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
