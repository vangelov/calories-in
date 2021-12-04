import { Flex, chakra, Button } from '@chakra-ui/react'
import { MealForm } from 'meals'
import { Plus } from 'react-feather'

const PlusStyled = chakra(Plus)

type Props = {
  mealsForms: MealForm[]
  onAddMeal: () => void
}

function MealsControls({ mealsForms, onAddMeal }: Props) {
  return (
    <Flex pt={3} pb={6} justifyContent="center" alignItems="center">
      <Button
        colorScheme="teal"
        variant="outline"
        onClick={onAddMeal}
        size="md"
        leftIcon={<PlusStyled size={16} pointerEvents="none" />}
      >
        Add meal
      </Button>
    </Flex>
  )
}

export default MealsControls
