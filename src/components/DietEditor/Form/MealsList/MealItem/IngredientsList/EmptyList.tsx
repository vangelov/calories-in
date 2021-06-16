import { Flex, Text, Button } from '@chakra-ui/react'

type Props = {
  onAddIngredients: () => void
}

function EmptyList({ onAddIngredients }: Props) {
  return (
    <Flex py={2} px={3} justifyContent="space-between" alignItems="center">
      <Text fontSize="md" textColor="gray.500">
        No foods added.
      </Text>

      <Button
        size="sm"
        colorScheme="teal"
        variant="outline"
        onClick={onAddIngredients}
      >
        Add foods
      </Button>
    </Flex>
  )
}

export default EmptyList
