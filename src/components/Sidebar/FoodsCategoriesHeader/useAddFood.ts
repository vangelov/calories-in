import { useFoodsListDispatch } from 'core/foods/FoodsListProvider'
import { delay, useScrollTo } from 'core/utils'
import { RefObject } from 'react'

type UseAddFoodParams = {
  foodCategoriesListRef: RefObject<HTMLDivElement>
  getFoodCategoryItemRefById: (id: number) => RefObject<HTMLDivElement>
}

let id = 100

function useAddFood({
  foodCategoriesListRef,
  getFoodCategoryItemRefById,
}: UseAddFoodParams) {
  const foodsListDispatch = useFoodsListDispatch()
  const scrollTo = useScrollTo()

  async function onAddFood() {
    const food = { name: 'test', categoryId: 5, id: id++ }
    const foodCategoryItemRef = getFoodCategoryItemRefById(food.categoryId)

    if (!foodCategoryItemRef.current || !foodCategoriesListRef.current) {
      throw new Error()
    }

    await delay(300)
    await scrollTo(foodCategoriesListRef.current, foodCategoryItemRef.current)

    foodsListDispatch({
      type: 'addFood',
      food,
    })
  }

  return onAddFood
}

export default useAddFood
