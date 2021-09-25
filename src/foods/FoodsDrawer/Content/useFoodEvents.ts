import { useDisclosure } from '@chakra-ui/react'
import { Food } from 'foods'
import { useState, RefObject } from 'react'
import { FoodsListMethods } from 'foods'

type Params = {
  listRef: RefObject<FoodsListMethods>
}

function useFoodEvents({ listRef }: Params) {
  const foodModalDisclosure = useDisclosure()
  const [food, setFood] = useState<Food>()

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
    food,
    foodModalDisclosure,
  }
}

export default useFoodEvents
