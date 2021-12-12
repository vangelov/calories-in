import { Text, HStack, Input } from '@chakra-ui/react'
import { MealForm } from 'meals'

type Props = {
  mealForm: MealForm
  onChange: (servings: string) => void
}

function Servings({ mealForm, onChange }: Props) {
  return (
    <HStack width="120px">
      <Input
        fontSize="md"
        size="sm"
        variant="filled"
        borderRadius={6}
        textAlign="center"
        fontWeight="medium"
        value={mealForm.servings}
        onChange={event => {
          onChange(event.target.value)
        }}
      />
      <Text textColor="gray.600">servings</Text>
    </HStack>
  )
}

export default Servings
