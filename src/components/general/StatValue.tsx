import { Text, Box, Collapse } from '@chakra-ui/react'
import RightAligned from './RightAligned'

type StatType = 'ingredient' | 'meal' | 'mealEnergy' | 'diet' | 'dietEnergy'

type Props = {
  value: string
  valueDetail?: any
  label?: string
  type: StatType
}

function getValueTextColor(statType: StatType) {
  if (statType === 'ingredient') {
    return 'gray.400'
  }

  if (statType.startsWith('meal')) {
    return 'gray.500'
  }

  return 'gray.600'
}

function StatValue({ value, valueDetail, label, type }: Props) {
  const isForDiet = type.startsWith('diet')

  return (
    <RightAligned position="relative">
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
        fontWeight={type.endsWith('Energy') ? 'bold' : undefined}
        textColor={getValueTextColor(type)}
      >
        {value}
      </Text>

      <Collapse in={valueDetail !== undefined} animateOpacity>
        <Text fontSize="md" textColor="gray.400">
          {valueDetail}
        </Text>
      </Collapse>
    </RightAligned>
  )
}

export default StatValue
