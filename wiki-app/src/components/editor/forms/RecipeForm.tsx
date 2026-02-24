'use client'

import { useState } from 'react'
import { useWikiStore } from '@/store/wikiStore'
import { FormField, inputCls } from '../shared/FormField'
import { DynamicList } from '../shared/DynamicList'
import type { RecipeIngredient } from '@/types/wiki'

interface Props {
  block: { id: string; type: 'recipe'; title?: string; ingredients: RecipeIngredient[]; result: string; shape?: string[][] }
  slug: string
  onClose: () => void
}

export function RecipeForm({ block, slug, onClose }: Props) {
  const { updateBlock } = useWikiStore()
  const [title, setTitle] = useState(block.title ?? '')
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>(block.ingredients.map(i => ({ ...i })))
  const [result, setResult] = useState(block.result)

  function handleSave() {
    updateBlock(slug, block.id, { title: title || undefined, ingredients, result })
    onClose()
  }

  function addIngredient() {
    setIngredients(prev => [...prev, { slot: '', item: '' }])
  }

  function removeIngredient(index: number) {
    setIngredients(prev => prev.filter((_, i) => i !== index))
  }

  function updateIngredient(index: number, patch: Partial<RecipeIngredient>) {
    setIngredients(prev => prev.map((item, i) => i === index ? { ...item, ...patch } : item))
  }

  return (
    <div className="space-y-4">
      <FormField label="Заголовок рецепта" hint="Необязательно">
        <input
          className={inputCls}
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Рецепт..."
          autoFocus
        />
      </FormField>

      <FormField label="Результат крафта" required>
        <input
          className={inputCls}
          value={result}
          onChange={e => setResult(e.target.value)}
          placeholder="Название предмета-результата"
        />
      </FormField>

      <FormField label="Ингредиенты" required hint="Слот: A1-C3 или позиция (1-9), Item: название предмета">
        <DynamicList
          items={ingredients}
          onAdd={addIngredient}
          onRemove={removeIngredient}
          minItems={1}
          addLabel="Добавить ингредиент"
          renderItem={(item, index) => (
            <div className="grid grid-cols-3 gap-2">
              <input
                className={inputCls + ' font-mono text-sm'}
                value={item.slot}
                onChange={e => updateIngredient(index, { slot: e.target.value })}
                placeholder="A1"
              />
              <input
                className={inputCls}
                value={item.item}
                onChange={e => updateIngredient(index, { item: e.target.value })}
                placeholder="Item"
              />
              <input
                className={inputCls}
                type="number"
                min={1}
                value={item.count ?? ''}
                onChange={e => updateIngredient(index, { count: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="Кол-во"
              />
            </div>
          )}
        />
      </FormField>

      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors"
        >
          Отмена
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm rounded-md font-medium bg-accent text-white hover:bg-accent-hover transition-colors"
        >
          Сохранить
        </button>
      </div>
    </div>
  )
}
