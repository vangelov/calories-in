import { Selection } from 'general'
import { useDietFormActions } from 'diets'
import { Food } from 'foods'

type Params = {
  onClose: () => void
  variantFormIndex?: number
  mealFormIndex?: number
  selection: Selection<Food>
}

function useAddFoods({
  onClose,
  selection,
  variantFormIndex,
  mealFormIndex,
}: Params) {
  const dietFormActions = useDietFormActions()

  function onAdd() {
    if (variantFormIndex !== undefined && mealFormIndex !== undefined) {
      dietFormActions.appendIngredientsForms(
        variantFormIndex,
        mealFormIndex,
        selection.selectedItems.map(({ id }) => id)
      )
    }
    onClose()
  }

  return {
    onAdd,
  }
}

export default useAddFoods
