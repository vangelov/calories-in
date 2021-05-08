import { Text, Box, HStack, FlexProps, Collapse } from '@chakra-ui/react'
import { ReactNode } from 'react'
import RightAligned from './RightAligned'

type StatType = 'ingredient' | 'meal' | 'mealEnergy' | 'diet' | 'dietEnergy'

type Props = {
  value: string
  valueDetail?: string
  valueDetailLeftIcon?: ReactNode
  label?: string
  type: StatType
  showsValueDetail?: boolean
} & FlexProps

function getValueTextColor(statType: StatType) {
  if (statType === 'ingredient') {
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
        fontWeight={type.endsWith('Energy') ? 'bold' : undefined}
        textColor={getValueTextColor(type)}
      >
        {value}
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
