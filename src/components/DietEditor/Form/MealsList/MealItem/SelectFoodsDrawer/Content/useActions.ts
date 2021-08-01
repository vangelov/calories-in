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

    foodModalDisclosure.onOpen()
  }

  function onPreviewFood(food: Food) {
    setFood(food)

    foodModalDisclosure.onOpen()
  }

  function onFoodCreatedOrUpdated(newFood: Food, oldFood?: Food) {
    if (!listRef.current) {
      return
    }

    if (!oldFood || (oldFood && newFood.categoryId !== oldFood.categoryId)) {
      listRef.current.scrollToFood(newFood)
    }
  }

  return {
    onCreateFood,
    onPreviewFood,
    onFoodCreatedOrUpdated,
    onSave,
    food,
    foodModalDisclosure,
  }
}

export default useActions
