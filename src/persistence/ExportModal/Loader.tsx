import { Spinner, Text, HStack } from '@chakra-ui/react'

function Loader() {
  return (
    <HStack spacing={2}>
      <Spinner color="teal" />
      <Text size="lg">Exporting...</Text>
    </HStack>
  )
}

export default Loader
