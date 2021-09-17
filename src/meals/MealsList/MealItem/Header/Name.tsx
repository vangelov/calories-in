import { BoxProps, Input } from '@chakra-ui/react'
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
    <Input
      ref={getMealNameInputRefById(mealForm.fieldId)}
      placeholder="Meal name"
      onChange={onNameChange}
      autoComplete="off"
      bg="white"
      width="85%"
      fontSize="md"
      textColor="gray.600"
      fontWeight="medium"
      size="md"
      value={mealForm.name}
      {...rest}
    />
  )
}

export default Name
