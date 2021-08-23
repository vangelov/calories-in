import { Text, Box, HStack, FlexProps } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { RightAligned } from 'layout'

type StatType =
  | 'ingredient'
  | 'ingredientEnergy'
  | 'meal'
  | 'mealEnergy'
  | 'diet'
  | 'dietEnergy'

type Props = {
  value: number
  valueDetail?: string
  valueDetailLeftIcon?: ReactNode
  label?: string
  type: StatType
  showsValueDetail?: boolean
  isLarge?: boolean
} & FlexProps

function getValueTextColor(statType: StatType) {
  if (statType.startsWith('ingredient')) {
    return 'gray.400'
  }

  if (statType.startsWith('meal')) {
    return 'gray.500'
  }

  return undefined
}

function Stat({
  value,
  valueDetail,
  label,
  type,
  valueDetailLeftIcon,
  showsValueDetail = false,
  isLarge = false,
  ...rest
}: Props) {
  const isForDiet = type.startsWith('diet')
  const isEnergy = type.endsWith('Energy')

  return (
    <RightAligned position="relative" {...rest}>
      {isForDiet && (
        <Box
          position="absolute"
          top="2px"
          bottom="2px"
          right="-10px"
          width="1px"
          bg="gray.300"
        />
      )}

      {label && (
        <Text
          fontSize={isLarge ? 'md' : 'xs'}
          fontWeight={isLarge ? 'medium' : undefined}
          textColor={isForDiet ? undefined : 'gray.400'}
        >
          {label}
        </Text>
      )}

      <Text
        lineHeight={5}
        fontSize={isLarge ? 'xl' : { base: 'sm', md: 'md' }}
        fontWeight={
          type === 'dietEnergy'
            ? 'bold'
            : isForDiet || type === 'mealEnergy'
            ? 'semibold'
            : undefined
        }
        css={{ fontVariantNumeric: 'tabular-nums' }}
        textColor={getValueTextColor(type)}
      >
        {value}
        <Text as="span" fontSize={isLarge ? 'md' : 'sm'}>
          {isEnergy ? 'kcal' : 'g'}
        </Text>
      </Text>

      {showsValueDetail && (
        <HStack alignItems="center" spacing={1}>
          {valueDetail && valueDetailLeftIcon}

          <Text fontSize={isLarge ? 'md' : 'sm'}>{valueDetail}</Text>
        </HStack>
      )}
    </RightAligned>
  )
}

export default Stat
