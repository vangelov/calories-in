import { DietForm } from '../../dietForm'
import { IngredientForm } from '../../ingredients/ingredientForm'
import { useDragAndDropResponder } from 'general/dndResponders'
import { ReactNode, useRef } from 'react'
import { DragStart } from 'react-beautiful-dnd'
import { useFormContext } from 'react-hook-form'
import { StateContext } from './context'

type Props = {
  children: ReactNode
}

function IngredientsFormsDndProvider({ children }: Props) {
  const ingredientFormRef = useRef<IngredientForm>()
  const { getValues } = useFormContext<DietForm>()

  // We save the form so that after dragging has ended (in useReorderIngredientsForms) we can insert it
  useDragAndDropResponder('onDragStart', (initial: DragStart) => {
    const { source, type } = initial

    if (type !== 'ingredientsList') {
      return
    }

    const values = getValues()

    let sourceMealForm = null

    for (const variantForm of values.variantsForms) {
      for (const mealForm of variantForm.mealsForms) {
        if (mealForm.fieldId === source.droppableId) {
          sourceMealForm = mealForm
        }
      }
    }

    if (sourceMealForm) {
      const ingredientForm = sourceMealForm.ingredientsForms[source.index]
      ingredientFormRef.current = ingredientForm
    }
  })

  return (
    <StateContext.Provider value={ingredientFormRef}>
      {children}
    </StateContext.Provider>
  )
}

export * from './context'

export default IngredientsFormsDndProvider
