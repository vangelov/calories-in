import { Flex, Text, HStack } from '@chakra-ui/react'
import { getFoodCategoryIcon } from 'core/foodsCategories'
import { FoodCategory } from 'core/types'

type Props = {
  foodCategory: FoodCategory
}

const Header = ({ foodCategory }: Props) => {
  const FoodCategoryIcon = getFoodCategoryIcon(foodCategory)

  return (
    <Flex zIndex={1} backgroundColor="white" position="sticky" top="0">
      <HStack
        mt={4}
        p={4}
        borderRadius={4}
        spacing={3}
        backgroundColor={foodCategory.color}
        position="sticky"
        top="0"
        width="100%"
      >
        <FoodCategoryIcon fill="text.name" />
        <Text fontSize="lg" fontWeight="bold" textColor="text.name">
          {foodCategory.name}
        </Text>
      </HStack>
    </Flex>
  )
}

export default Header
