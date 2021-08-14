import { Text, Box, Flex, BoxProps, TypographyProps } from '@chakra-ui/react'
import { Food } from 'foods'

type Props = {
  food: Food
  nameNoOfLines?: number
  detailText?: string
  fontSize: TypographyProps['fontSize']
  energy?: number
} & BoxProps

function FoodInfo({
  food,
  detailText,
  fontSize,
  nameNoOfLines,
  energy,
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
              {`${Math.round(energy as number)}kcal`}
            </Text>{' '}
            / 100g
          </Text>
        )}
      </Box>
    </Flex>
  )
}

export default FoodInfo
