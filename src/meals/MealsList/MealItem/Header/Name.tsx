import { BoxProps, Input, Flex } from '@chakra-ui/react'
import { useDietFormActions } from 'diets'
import { MealForm } from 'meals'
import { RefObject, ChangeEvent } from 'react'

type Props = {
  variantIndex: number
  mealForm: MealForm
  index: number
  getMealNameInputRefById: (id: string) => RefObject<HTMLInputElement>
} & BoxProps

function Name({
  variantIndex,
  mealForm,
  index,
  getMealNameInputRefById,
  ...rest
}: Props) {
  const dietFormActions = useDietFormActions()

  function onNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    dietFormActions.updateMealForm(variantIndex, index, {
      name: value,
    })
  }

  return (
    <Flex alignItems="center" height="100%">
      <Input
        ref={getMealNameInputRefById(mealForm.fieldId)}
        placeholder="Meal name"
        onChange={onNameChange}
        autoComplete="off"
        width="80%"
        bg="white"
        fontWeight="medium"
        textColor="gray.800"
        size="md"
        value={mealForm.name}
        {...rest}
      />
    </Flex>
  )
}

export default Name
