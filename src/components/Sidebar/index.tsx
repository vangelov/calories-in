import FoodsCategoriesList from './FoodsCategoriesList'
import { Flex } from '@chakra-ui/react'
import FoodsCategoriesHeader from './FoodsCategoriesHeader'
import { useGetRefForId } from 'core/utils'
import { useRef } from 'react'

function Sidebar() {
  const getFoodCategoryItemRefById = useGetRefForId()
  const foodCategoriesListRef = useRef<HTMLDivElement>(null)

  return (
    <Flex height="100%" flexDirection="column">
      <FoodsCategoriesHeader
        foodCategoriesListRef={foodCategoriesListRef}
        getFoodCategoryItemRefById={getFoodCategoryItemRefById}
      />
      <FoodsCategoriesList
        ref={foodCategoriesListRef}
        getFoodCategoryItemRefById={getFoodCategoryItemRefById}
        flex={1}
      />
    </Flex>
  )
}

export default Sidebar
