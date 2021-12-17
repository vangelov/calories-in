import { Flex, Text, Button } from '@chakra-ui/react'

type Props = {
  onAddIngredients: () => void
}

function EmptyList({ onAddIngredients }: Props) {
  return (
    <Flex p={3} justifyContent="space-between" alignItems="center">
      <Text fontSize="md" textColor="gray.500">
        You haven't added any foods
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
