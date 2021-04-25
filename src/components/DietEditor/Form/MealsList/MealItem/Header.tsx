import { Input, Button, Flex } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { MealField, getMealsFormsPath, IngredientField } from 'core/dietForm'
import { useUndoRedoMethods } from 'core/undoRedo'
import { useMealStats, useUpdateMealStats } from 'core/stats'

type Props = {
  mealIndex: number
  mealField: MealField
  ingredientsFields: IngredientField[]
  zIndex: number
  index: number
  onRemove: (mealIndex: number) => void
}

function Header({
  mealIndex,
  mealField,
  index,
  onRemove,
  ingredientsFields,
  zIndex,
}: Props) {
  const { register } = useFormContext()
  const { saveLastChange } = useUndoRedoMethods()
  const nameRegister = register(getMealsFormsPath(mealIndex, 'name'))
  const { mealStats } = useMealStats(index, mealField, ingredientsFields)

  useUpdateMealStats(index, mealStats)

  function onNameChange(event: any) {
    nameRegister.onChange(event)
    saveLastChange()
  }

  return (
    <Flex
      position="sticky"
      top="0px"
      bg="rgba(0, 0, 255, 0.88)"
      padding={2}
      zIndex={zIndex}
      justifyContent="space-between"
    >
      <Input
        {...nameRegister}
        onChange={onNameChange}
        bg="white"
        width="30%"
        defaultValue={mealField.name}
      />
      <Button onClick={() => onRemove(mealIndex)}>Remove</Button>
    </Flex>
  )
}

export default Header
