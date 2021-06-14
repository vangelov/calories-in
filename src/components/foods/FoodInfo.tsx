import { Text, Box, Flex, BoxProps, TypographyProps } from '@chakra-ui/react'
import { Food } from 'core/types'

type Props = {
  food: Food
  nameNoOfLines?: number
  detailText?: string
  fontSize: TypographyProps['fontSize']
} & BoxProps

function FoodInfo({
  food,
  detailText,
  fontSize,
  nameNoOfLines,
  ...rest
}: Props) {
  return (
    <Flex height="100%" alignItems="center" {...rest}>
      <Box>
        <Text fontSize={fontSize} noOfLines={nameNoOfLines} color="gray.600">
          {food.name}
        </Text>

        {detailText && (
          <Text fontSize="xs" textColor="gray.400">
            <Text as="span" fontWeight="bold" fontSize="xs">
              200kcal
            </Text>{' '}
            / 100g
          </Text>
        )}
      </Box>
    </Flex>
  )
}

export default FoodInfo
