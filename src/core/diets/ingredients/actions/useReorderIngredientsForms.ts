import { MealField } from '../../meals/mealForm'
import { useDndResponder } from 'general/dndResponders'
import { useFormChangesStoreMethods } from 'general/undoRedo'
import { DropResult } from 'react-beautiful-dnd'
import { IngredientsFieldArray } from '../useIngredientsFieldArray'
import { useIngredientsFormsDndState } from './IngredientsFormsDndProvider'

type Params = {
  mealField: MealField
  ingredientsFieldArray: IngredientsFieldArray
}

function useReorderIngredientsForms({
  mealField,
  ingredientsFieldArray,
}: Params) {
  const ingredientFormRef = useIngredientsFormsDndState()
  const { saveLastChange } = useFormChangesStoreMethods()

  useDndResponder('onDragEnd', (result: DropResult) => {
    const { source, destination, type } = result

    if (!destination || type !== 'ingredientsList') {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      mealField.fieldId === destination.droppableId
    ) {
      ingredientsFieldArray.moveIngredientForm(source.index, destination.index)
    } else if (destination.droppableId === mealField.fieldId) {
      const ingredientForm = ingredientFormRef.current

      if (ingredientForm) {
        ingredientsFieldArray.insertIngredientForm(
          destination.index,
          ingredientForm,
          {
            shouldFocus: false,
          }
        )
      }
    } else if (source.droppableId === mealField.fieldId) {
      ingredientsFieldArray.removeIngredientForm(source.index)
    }

    saveLastChange()
  })
}

export default useReorderIngredientsForms
