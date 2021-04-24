import { Box, BoxProps } from '@chakra-ui/react'
import { useFoodsPerCategories } from 'core/foods'
import { ReactElement } from 'react'
import FoodCategoryItem from './FoodCategoryItem'

type Props = BoxProps

function FoodsCategoriesList({ ...rest }: Props) {
  const foodsPerCategories = useFoodsPerCategories()
  const foodsCategoryItems: ReactElement<typeof FoodCategoryItem>[] = []
  let foodsCountByNow = 0

  for (const { foodCategory, foods } of foodsPerCategories) {
    foodsCategoryItems.push(
      <FoodCategoryItem
        key={foodCategory.id}
        foods={foods}
        foodCategory={foodCategory}
        indexOffset={foodsCountByNow}
      />
    )

    foodsCountByNow += foods.length
  }

  return (
    <Box overflow="scroll" {...rest}>
      {foodsCategoryItems}
    </Box>
  )
}

export default FoodsCategoriesList
