import { Text, Box, HStack, FlexProps, Collapse } from '@chakra-ui/react'
import { formatGrams } from 'core/format'
import formatEnergy from 'core/format/formatKcal'
import { ReactNode } from 'react'
import RightAligned from './RightAligned'

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
} & FlexProps

function getValueTextColor(statType: StatType) {
  if (statType.startsWith('ingredient')) {
    return 'gray.400'
  }

  if (statType.startsWith('meal')) {
    return 'gray.500'
  }

  return 'gray.600'
}

function Stat({
  value,
  valueDetail,
  label,
  type,
  valueDetailLeftIcon,
  showsValueDetail = false,
  ...rest
}: Props) {
  const isForDiet = type.startsWith('diet')
  const isEnergy = type.endsWith('Energy')
  const isBold = type !== 'ingredientEnergy' && isEnergy
  const formattedValue = isEnergy ? formatEnergy(value) : formatGrams(value)

  return (
    <RightAligned position="relative" {...rest}>
      {isForDiet && (
        <Box
          position="absolute"
          top="2px"
          bottom="5px"
          right="-10px"
          width="1px"
          bg="gray.400"
        />
      )}

      {label && (
        <Text fontSize="xs" textColor="gray.400">
          {label}
        </Text>
      )}

      <Text
        lineHeight={isForDiet ? '4' : undefined}
        fontSize="md"
        fontWeight={isBold ? 'bold' : undefined}
        textColor={getValueTextColor(type)}
      >
        {formattedValue}
      </Text>

      <Collapse
        transition={{ ease: 'easeInOut', duration: 2 }}
        style={{ overflow: 'hidden' }}
        in={showsValueDetail}
      >
        <HStack alignItems="center" spacing={1}>
          {valueDetail && valueDetailLeftIcon}

          <Text fontSize="md" textColor="gray.400">
            {valueDetail}
          </Text>
        </HStack>
      </Collapse>
    </RightAligned>
  )
}

export default Stat
