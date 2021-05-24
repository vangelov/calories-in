import { Flex, Text, HStack, FlexProps } from '@chakra-ui/react'
import { getFoodCategoryIcon } from 'core/foodsCategories'
import { FoodCategory } from 'core/types'

type Props = {
  foodCategory: FoodCategory
} & FlexProps

const Header = ({ foodCategory, ...rest }: Props) => {
  const FoodCategoryIcon = getFoodCategoryIcon(foodCategory)

  return (
    <Flex
      zIndex={1}
      backgroundColor="white"
      position="sticky"
      top="0"
      {...rest}
    >
      <HStack
        mt={4}
        p={4}
        borderRadius={4}
        spacing={3}
        backgroundColor={foodCategory.color}
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
