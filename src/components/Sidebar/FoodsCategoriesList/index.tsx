import { Box, BoxProps } from '@chakra-ui/react'
import { useFoodsPerCategories } from 'core/foods'
import { ForwardedRef, ReactElement, RefObject } from 'react'
import FoodCategoryItem from './FoodCategoryItem'
import { forwardRef } from 'react'

type Props = {
  getFoodCategoryItemRefById: (id: number) => RefObject<HTMLDivElement>
  forwardRef?: ForwardedRef<HTMLDivElement>
} & BoxProps

function FoodsCategoriesList({
  getFoodCategoryItemRefById,
  forwardRef,
  ...rest
}: Props) {
  const { foodsPerCategories, foodsCountDiff } = useFoodsPerCategories()
  const foodsCategoryItems: ReactElement<typeof FoodCategoryItem>[] = []
  const shouldAnimateFoodsOnMount = Math.abs(foodsCountDiff) === 1
  let foodsCountSoFar = 0

  for (const { foodCategory, foods } of foodsPerCategories) {
    foodsCategoryItems.push(
      <FoodCategoryItem
        key={foodCategory.id}
        ref={getFoodCategoryItemRefById(foodCategory.id)}
        foods={foods}
        foodCategory={foodCategory}
        indexOffset={foodsCountSoFar}
        shouldAnimateFoodsOnMount={shouldAnimateFoodsOnMount}
      />
    )

    foodsCountSoFar += foods.length
  }

  return (
    <Box ref={forwardRef} overflowY="scroll" {...rest}>
      <Box height={6} />
      {foodsCategoryItems}
    </Box>
  )
}

export default forwardRef<HTMLDivElement, Props>((props, ref) => (
  <FoodsCategoriesList forwardRef={ref} {...props} />
))
