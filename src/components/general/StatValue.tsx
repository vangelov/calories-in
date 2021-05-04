import { Text, Box } from '@chakra-ui/react'
import RightAligned from './RightAligned'

type Props = {
  value: string
  color?: string
  label?: string
  isBold?: boolean
}

function StatValue({
  value,
  color = 'gray.300',
  label,
  isBold = false,
}: Props) {
  return (
    <RightAligned position="relative">
      {isBold && (
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
        lineHeight="4"
        fontSize="md"
        fontWeight={isBold ? 'bold' : undefined}
        textColor={color}
      >
        {value}
      </Text>

      {isBold && (
        <Text fontSize="md" textColor="gray.400">
          563g
        </Text>
      )}
    </RightAligned>
  )
}

export default StatValue
