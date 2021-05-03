import { Flex, Text, Box } from '@chakra-ui/react'
import { FoodCategory } from 'core/types'

type Props = {
  foodCategory: FoodCategory
}

const Header = ({ foodCategory }: Props) => {
  return (
    <Flex zIndex={1} backgroundColor="white" position="sticky" top="0">
      <Box
        mt={4}
        p={3}
        borderRadius={4}
        backgroundColor={foodCategory.color}
        position="sticky"
        top="0"
        width="100%"
      >
        <Text fontSize="lg" fontWeight="bold" textColor="text.name">
          {foodCategory.name}
        </Text>
      </Box>
    </Flex>
  )
}

export default Header
