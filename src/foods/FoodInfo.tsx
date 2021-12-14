import { Text, Box, Flex, BoxProps, Link } from '@chakra-ui/react'
import { Food } from 'foods'
import { ReactNode } from 'react'
import { DEFAULT_SERVING_SIZE_IN_GRAMS } from './foodForm'

type Props = {
  food: Food
  nameNoOfLines?: number
  canBeLink?: boolean
  notes?: string

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
  canBeLink = false,
  ...rest
}: Props) {
  return (
    <Flex height="100%" align="center" {...rest}>
      <Box>
        {food.url && canBeLink ? (
          <Link target="_blank" href={food.url} color="teal.500">
            {food.name}
          </Link>
        ) : (
          <Text noOfLines={nameNoOfLines} color="gray.800">
            {food.name}
          </Text>
        )}

        {energy !== undefined && (
          <Text fontSize="sm" textColor="gray.500">
            <Text as="span" fontWeight="medium">
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
