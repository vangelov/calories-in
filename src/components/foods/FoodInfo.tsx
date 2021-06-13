import { Text, Box, Flex, BoxProps } from '@chakra-ui/react'
import { Food } from 'core/types'

type Props = {
  food: Food
  nameNoOfLines?: number
  detailText?: string
} & BoxProps

function FoodInfo({ food, detailText, nameNoOfLines, ...rest }: Props) {
  return (
    <Flex height="100%" alignItems="center" {...rest}>
      <Box>
        <Text
          fontSize={{ base: 'sm', md: 'md' }}
          noOfLines={nameNoOfLines}
          color="gray.600"
        >
          {food.name}
        </Text>

        {detailText && (
          <Text fontSize="xs" textColor="gray.400">
            <Text as="span" fontWeight="bold" fontSize="xs">
              200kcal
            </Text>{' '}
            per 100g
          </Text>
        )}
      </Box>
    </Flex>
  )
}

export default FoodInfo
