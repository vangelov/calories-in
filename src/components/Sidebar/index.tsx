import FoodsCategoriesList from './FoodsCategoriesList'
import { Flex } from '@chakra-ui/react'
import FoodsControls from './FoodsControls'
import { useGetRefForId } from 'core/utils'
import { useRef } from 'react'

function Sidebar() {
  const getFoodCategoryItemRefById = useGetRefForId()
  const foodCategoriesListRef = useRef<HTMLDivElement>(null)

  return (
    <Flex height="100%" flexDirection="column">
      <FoodsControls
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
