import { Text, Box, HStack, FlexProps } from '@chakra-ui/react'
import { ReactNode } from 'react'
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
  valueDetail?: string
  valueDetailLeftIcon?: ReactNode
  label?: string
  type: StatVariant
  showsValueDetail?: boolean
  isLarge?: boolean
} & FlexProps

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
        <Text
          fontSize={isLarge ? 'md' : 'xs'}
          fontWeight={isLarge ? 'medium' : undefined}
          textColor={getLabelColor(type)}
        >
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
