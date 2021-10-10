import { Text, Box, FlexProps } from '@chakra-ui/react'
import { cloneElement, ReactElement } from 'react'
import { RightAligned } from 'layout'
import {
  isForDiet,
  isForEnergy,
  StatVariant,
  getValueFontWeight,
  getValueTextColor,
  getLabelColor,
} from './statsVariants'

type Props = {
  value: number

  label?: string
  type: StatVariant
  valueDetailElement?: ReactElement
  isLarge?: boolean
} & FlexProps

function Stat({
  value,
  label,
  type,
  isLarge = false,
  valueDetailElement,
  ...rest
}: Props) {
  return (
    <RightAligned position="relative" {...rest}>
      {isForDiet(type) && (
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
        <Text fontSize={isLarge ? 'md' : 'xs'} textColor={getLabelColor(type)}>
          {label}
        </Text>
      )}

      <Text
        lineHeight={5}
        fontSize={isLarge ? 'xl' : { base: 'sm', md: 'md' }}
        fontWeight={getValueFontWeight(type)}
        textColor={getValueTextColor(type)}
      >
        {value}
        <Text as="span" fontSize={isLarge ? 'md' : 'sm'}>
          {isForEnergy(type) ? 'kcal' : 'g'}
        </Text>
      </Text>

      {valueDetailElement && cloneElement(valueDetailElement, { isLarge })}
    </RightAligned>
  )
}

export default Stat
