import { Text, Box, Flex, BoxProps, TypographyProps } from '@chakra-ui/react'
import { Food } from 'foods'
import { ReactNode } from 'react'
import { DEFAULT_SERVING_SIZE_IN_GRAMS } from './foodForm'

type Props = {
  food: Food
  nameNoOfLines?: number

  notes?: string
  fontSize: TypographyProps['fontSize']
  energy?: number
  children?: ReactNode
} & BoxProps

function FoodInfo({
  food,

  fontSize,
  nameNoOfLines,
  energy,
  notes,
  children,
  ...rest
}: Props) {
  return (
    <Flex height="100%" align="center" {...rest}>
      <Box>
        <Text fontSize={fontSize} noOfLines={nameNoOfLines} color="gray.600">
          {food.name}
        </Text>

        {energy !== undefined && (
          <Text fontSize="sm" textColor="gray.400">
            <Text as="span" fontWeight="bold" fontSize="xs">
              {`${Math.round(energy as number)}kcal`}
            </Text>{' '}
            / {food.servingSizeInGrams || DEFAULT_SERVING_SIZE_IN_GRAMS}g
          </Text>
        )}

        {children}
      </Box>
    </Flex>
  )
}

export default FoodInfo
