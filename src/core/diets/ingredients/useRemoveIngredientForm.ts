import { useUndoRedoMethods } from 'general/undoRedo'
import { IngredientsFieldArray } from './useIngredientsFieldArray'

type Params = {
  ingredientsFieldArray: IngredientsFieldArray
}

function useRemoveIngredientForm({ ingredientsFieldArray }: Params) {
  const { saveLastChange } = useUndoRedoMethods()

  function onRemove(index: number) {
    ingredientsFieldArray.removeIngredientForm(index)
    saveLastChange()
  }

  return {
    onRemove,
  }
}

export default useRemoveIngredientForm
