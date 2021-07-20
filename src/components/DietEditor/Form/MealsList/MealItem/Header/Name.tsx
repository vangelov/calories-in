import { BoxProps, Input } from '@chakra-ui/react'
import { MealField, useDietFormActions } from 'core/diets'
import { RefObject, ChangeEvent } from 'react'

type Props = {
  variantIndex: number
  mealField: MealField
  index: number
  getMealNameInputRefById: (id: string) => RefObject<HTMLInputElement>
} & BoxProps

function Name({
  variantIndex,
  mealField,
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
      ref={getMealNameInputRefById(mealField.fieldId as string)}
      placeholder="Meal name"
      onChange={onNameChange}
      autoComplete="off"
      bg="white"
      textColor="gray.600"
      width="85%"
      fontSize="md"
      fontWeight="medium"
      size="md"
      value={mealField.name}
      {...rest}
    />
  )
}

export default Name
