import { Text, Center, chakra, Button } from '@chakra-ui/react'
import { Plus } from 'react-feather'

const PlusStyled = chakra(Plus)

type Props = {
  onAddMeal: () => void
}

function EmptyList({ onAddMeal }: Props) {
  return (
    <Center flex={1} flexDirection="column">
      <Text fontSize="md" fontWeight="medium" textColor="gray.400">
        You haven't added any meals yet
      </Text>
      <Button
        mt={3}
        onClick={onAddMeal}
        colorScheme="teal"
        variant="outline"
        size="sm"
        leftIcon={<PlusStyled size={16} pointerEvents="none" />}
      >
        Add meal
      </Button>
    </Center>
  )
}

export default EmptyList
