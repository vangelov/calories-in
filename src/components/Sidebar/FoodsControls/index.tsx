import { Box } from '@chakra-ui/react'
import { RefObject } from 'react'
import TitleAndAdd from './TitleAndAdd'
import SearchBar from './SearchBar'

type Props = {
  getFoodCategoryItemRefById: (id: number) => RefObject<HTMLDivElement>
  foodCategoriesListRef: RefObject<HTMLDivElement>
}

function FoodsControls({
  getFoodCategoryItemRefById,
  foodCategoriesListRef,
}: Props) {
  return (
    <Box
      bg="white"
      borderBottomWidth={1}
      borderBottomColor="gray.200"
      px={6}
      py={4}
    >
      <TitleAndAdd
        getFoodCategoryItemRefById={getFoodCategoryItemRefById}
        foodCategoriesListRef={foodCategoriesListRef}
      />

      <SearchBar />
    </Box>
  )
}

export default FoodsControls
