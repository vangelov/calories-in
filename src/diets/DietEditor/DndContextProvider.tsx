import { useDietFormActions } from 'diets'
import { ReactNode } from 'react'

import { DragDropContext, DropResult } from 'react-beautiful-dnd'

type Props = {
  children: ReactNode
}

function DndContextProvider({ children }: Props) {
  const dietFormActions = useDietFormActions()

  const onDragEnd = (dropResult: DropResult) => {
    const { source, destination, type } = dropResult

    if (!destination) {
      return
    }

    if (type === 'variantsList') {
      dietFormActions.moveVariantForm(source.index, destination.index)
    } else if (type === 'mealsList') {
      dietFormActions.moveMealForm(source.index, destination.index)
    } else if (type === 'ingredientsList') {
      dietFormActions.moveIngredientForm(
        source.droppableId,
        source.index,
        destination.droppableId,
        destination.index
      )
    }
  }

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
}

export default DndContextProvider
