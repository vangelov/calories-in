import { DietForm, IngredientForm } from 'core/dietForm'
import { useDragAndDropResponder } from 'core/dndResponders'
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

    console.log('v', values)

    const meal = values.variantsForms[0].mealsForms.find(
      ({ fieldId }) => fieldId === source.droppableId
    )

    if (meal) {
      const ingredientForm = meal.ingredientsForms[source.index]
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
