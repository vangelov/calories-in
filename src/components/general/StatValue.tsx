import { Flex, Text } from '@chakra-ui/react'

type Props = {
  value: string
  color?: string
  label?: string
  isBold?: boolean
}

function StatValue({
  value,
  color = 'gray.400',
  label,
  isBold = false,
}: Props) {
  return (
    <Flex
      width="100%"
      height="100%"
      alignItems="flex-end"
      justifyContent="center"
      flexDirection="column"
    >
      {label && (
        <Text fontSize="xs" textColor="gray.400">
          {label}
        </Text>
      )}

      <Text
        fontSize="md"
        textColor={color}
        fontWeight={isBold ? 'bold' : undefined}
      >
        {value}
      </Text>
    </Flex>
  )
}

export default StatValue
