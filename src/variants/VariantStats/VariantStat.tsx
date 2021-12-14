import { Flex, Text, BoxProps } from '@chakra-ui/react'
import { Tooltip } from 'general'

type VariantStatType = 'energy' | 'primaryMacro' | 'secondaryMacro'

type Props = {
  label: string
  detail?: string
  value: number
  type: VariantStatType
  isDisabled?: boolean
  tooltipLabel?: string
} & BoxProps

function getLabelFontWeight(type: VariantStatType) {
  switch (type) {
    case 'energy':
      return 'bold'
    case 'primaryMacro':
      return 'medium'
    case 'secondaryMacro':
      return 'normal'
  }
}

function getValueFontWeight(type: VariantStatType) {
  switch (type) {
    case 'energy':
      return 'medium'
    case 'primaryMacro':
    case 'secondaryMacro':
      return 'normal'
  }
}

function VariantStat({
  label,
  detail,
  value,
  type,
  isDisabled = false,
  tooltipLabel,
  ...rest
}: Props) {
  return (
    <Flex
      opacity={isDisabled ? 0.5 : 1.0}
      pointerEvents={isDisabled ? 'none' : 'all'}
      justifyContent="space-between"
      {...rest}
    >
      <Text fontSize="lg" fontWeight={getLabelFontWeight(type)}>
        {label}{' '}
        {detail !== undefined && (
          <Tooltip label={tooltipLabel}>
            <Text as="span" fontSize="md" fontWeight="normal">
              {`(${detail})`}
            </Text>
          </Tooltip>
        )}
      </Text>
      <Text fontSize="lg" fontWeight={getValueFontWeight(type)}>
        {value}
        {type === 'energy' ? 'kcal' : 'g'}
      </Text>
    </Flex>
  )
}

export default VariantStat
