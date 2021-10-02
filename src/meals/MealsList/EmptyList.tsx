import { Text, Center } from '@chakra-ui/react'

function EmptyList() {
  return (
    <Center flex={1}>
      <Text fontSize="md" textColor="gray.400">
        You haven't added any meals yet
      </Text>
    </Center>
  )
}

export default EmptyList
