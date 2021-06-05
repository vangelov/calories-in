import { ReactNode, useState } from 'react'
import {
  StateContext,
  FoodCategoryByIdMapContext,
  FoodCategoryByIdMap,
} from './context'
import FOODS_CATEGORIES from '../list'
import { FoodCategory } from 'core/types'

type Props = {
  children: ReactNode
}

function buildFoodCategoryByIdMap(
  foodsCategories: FoodCategory[]
): FoodCategoryByIdMap {
  const foodCategoryByIdMap: FoodCategoryByIdMap = {}

  for (const foodCategory of foodsCategories) {
    foodCategoryByIdMap[foodCategory.id] = foodCategory
  }

  return foodCategoryByIdMap
}

function DietFoodsProvider({ children }: Props) {
  const [foodCategoryByIdMap] = useState(() =>
    buildFoodCategoryByIdMap(FOODS_CATEGORIES)
  )

  return (
    <FoodCategoryByIdMapContext.Provider value={foodCategoryByIdMap}>
      <StateContext.Provider value={FOODS_CATEGORIES}>
        {children}
      </StateContext.Provider>
    </FoodCategoryByIdMapContext.Provider>
  )
}

export * from './context'

export default DietFoodsProvider
