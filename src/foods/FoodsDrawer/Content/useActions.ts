import { useDisclosure } from '@chakra-ui/react'
import { Food } from 'foods'
import { useState, RefObject } from 'react'
import { FoodsListMethods } from 'foods'
import { Selection, Item } from 'general/useSelection'
import { useDietFormActions } from 'diets'

type Params = {
  onClose: () => void
  variantFormIndex?: number
  mealFormIndex?: number
  selection: Selection<Item>
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
    if (variantFormIndex !== undefined && mealFormIndex !== undefined) {
      dietFormActions.appendIngredientsForms(
        variantFormIndex,
        mealFormIndex,
        selection.selectedItems.map(({ id }) => id)
      )
    }
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
