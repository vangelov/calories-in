import { Flex, Text } from '@chakra-ui/react'

type Props = {
  value: string
  color?: string
  label?: string
}

function StatValue({ value, color = 'gray.400', label }: Props) {
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
      <Text fontSize="md" textColor={color}>
        {value}
      </Text>
    </Flex>
  )
}

export default StatValue
