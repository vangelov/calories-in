import { Flex, Text, Button } from '@chakra-ui/react'

type Props = {
  onAddIngredients: () => void
}

function EmptyList({ onAddIngredients }: Props) {
  return (
    <Flex py={2} px={3} justifyContent="space-between" alignItems="center">
      <Text fontSize="md" textColor="gray.400" fontWeight="medium">
        No foods added yet
      </Text>

      <Button
        colorScheme="teal"
        size="sm"
        variant="ghost"
        onClick={onAddIngredients}
      >
        Add foods
      </Button>
    </Flex>
  )
}

export default EmptyList
