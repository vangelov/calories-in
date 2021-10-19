import { Text, Center, chakra } from '@chakra-ui/react'
import { Plus } from 'react-feather'
import { ResponsiveButton } from 'general'

const PlusStyled = chakra(Plus)

type Props = {
  onAddMeal: () => void
}

function EmptyList({ onAddMeal }: Props) {
  return (
    <Center flex={1} flexDirection="column">
      <Text fontSize="md" textColor="gray.400">
        You haven't added any meals yet
      </Text>
      <ResponsiveButton
        mt={3}
        onClick={onAddMeal}
        colorScheme="teal"
        variant="outline"
        leftIcon={<PlusStyled size={20} pointerEvents="none" />}
      >
        Add meal
      </ResponsiveButton>
    </Center>
  )
}

export default EmptyList
