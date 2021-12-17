import { Text, Center, chakra, Button, VStack } from '@chakra-ui/react'
import { Plus } from 'react-feather'

const PlusStyled = chakra(Plus)

type Props = {
  onAddMeal: () => void
}

function EmptyList({ onAddMeal }: Props) {
  return (
    <Center
      textAlign="center"
      bg="white"
      boxShadow="base"
      borderRadius={6}
      flex={1}
      p={6}
      flexDirection="column"
    >
      <VStack spacing={6}>
        <Text fontSize="xl" fontWeight="medium" textColor="gray.500">
          You haven't added any meals to this day yet
        </Text>
        <Text maxWidth="450px" mt={3} fontSize="md" textColor="gray.500">
          Days can be specific weekdays or just types of days. For example: a
          training or a rest day.
        </Text>
        <Button
          mt={3}
          onClick={onAddMeal}
          colorScheme="teal"
          variant="outline"
          size="md"
          leftIcon={<PlusStyled size={16} pointerEvents="none" />}
        >
          Add meal
        </Button>
      </VStack>
    </Center>
  )
}

export default EmptyList
