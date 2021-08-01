import { useDisclosure } from '@chakra-ui/react'
import { Food } from 'core/types'
import { useState, RefObject } from 'react'
import { FoodsListMethods } from 'components/foods/FoodsList'
import { Selection } from 'general/useSelection'
import { useDietFormActions } from 'core/diets'

type Params = {
  onClose: () => void
  variantFormIndex: number
  mealFormIndex: number
  selection: Selection<Food>
  listRef: RefObject<FoodsListMethods>
}

function useActions({
  onClose,
  selection,
  variantFormIndex,
  mealFormIndex,
  listRef,
}: Params) {
  const foodModalDisclosure = useDisclosure()
  const [food, setFood] = useState<Food>()
  const [canEdit, setCanEdit] = useState(false)
  const dietFormActions = useDietFormActions()

  function onSave() {
    dietFormActions.appendIngredientsForms(
      variantFormIndex,
      mealFormIndex,
      selection.selectedItems
    )
    onClose()
  }

  function onCreateFood() {
    setFood(undefined)
    setCanEdit(true)
    foodModalDisclosure.onOpen()
  }

  function onPreviewFood(food: Food) {
    setFood(food)
    setCanEdit(false)
    foodModalDisclosure.onOpen()
  }

  function onFoodCreated(food: Food) {
    if (listRef.current) {
      listRef.current.scrollToFood(food)
    }
  }

  return {
    onCreateFood,
    onPreviewFood,
    onFoodCreated,
    onSave,
    food,
    canEdit,
    foodModalDisclosure,
  }
}

export default useActions
