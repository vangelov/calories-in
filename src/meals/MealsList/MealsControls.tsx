import { Flex, Text, chakra } from '@chakra-ui/react'
import { ResponsiveButton } from 'general'
import { MealForm } from 'meals'
import { Plus } from 'react-feather'

const PlusStyled = chakra(Plus)

type Props = {
  mealsForms: MealForm[]
  onAddMeal: () => void
}

function MealsControls({ mealsForms, onAddMeal }: Props) {
  return (
    <Flex pt={3} pb={6} justifyContent="space-between" alignItems="center">
      <Text fontWeight="semibold" textColor="gray.500">
        {`${mealsForms.length} ${mealsForms.length === 1 ? 'meal' : 'meals'}`}
      </Text>
      <ResponsiveButton
        colorScheme="teal"
        variant="outline"
        onClick={onAddMeal}
        leftIcon={<PlusStyled size={20} pointerEvents="none" />}
      >
        Add meal
      </ResponsiveButton>
    </Flex>
  )
}

export default MealsControls
