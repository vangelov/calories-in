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
  const foodsPerCategories = useFoodsPerCategories()
  const foodsCategoryItems: ReactElement<typeof FoodCategoryItem>[] = []
  let foodsCountByNow = 0

  for (const { foodCategory, foods } of foodsPerCategories) {
    foodsCategoryItems.push(
      <FoodCategoryItem
        key={foodCategory.id}
        ref={getFoodCategoryItemRefById(foodCategory.id)}
        foods={foods}
        foodCategory={foodCategory}
        indexOffset={foodsCountByNow}
      />
    )

    foodsCountByNow += foods.length
  }

  return (
    <Box ref={forwardRef} overflow="scroll" {...rest}>
      {foodsCategoryItems}
    </Box>
  )
}

export default forwardRef<HTMLDivElement, Props>((props, ref) => (
  <FoodsCategoriesList forwardRef={ref} {...props} />
))
