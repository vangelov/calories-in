import { HStack, Text } from '@chakra-ui/react'
import { Tooltip } from 'general'
import { ReactNode } from 'react'

type Props = {
  label: string
  tooltipLabel?: string
  leftIcon?: ReactNode
  isLarge?: boolean
}

function StatValueDetail({
  label,
  tooltipLabel,
  leftIcon,
  isLarge = false,
}: Props) {
  return (
    <HStack alignItems="center" spacing={1}>
      {leftIcon}

      <Tooltip label={tooltipLabel}>
        <Text color="gray.800" fontSize={isLarge ? 'md' : 'sm'}>
          {label}
        </Text>
      </Tooltip>
    </HStack>
  )
}

export default StatValueDetail
