import { Input, Flex } from '@chakra-ui/react'
import { useDietForm, useDietFormActions } from 'diets'
import { ChangeEvent } from 'react'

function Name() {
  const dietForm = useDietForm()
  const dietFormActions = useDietFormActions()

  function onNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    dietFormActions.updateDietForm({ name: value })
  }

  return (
    <Flex height="100%" alignItems="center">
      <Input
        placeholder="Meal plan name"
        size="md"
        fontSize="md"
        fontWeight="semibold"
        autoComplete="off"
        textColor="gray.600"
        onChange={onNameChange}
        bg="white"
        value={dietForm.name}
      />
    </Flex>
  )
}

export default Name
