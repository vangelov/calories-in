import { Input, Button, Flex, Text } from '@chakra-ui/react'
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
      top="0"
      bg="gray.50"
      padding={4}
      zIndex={zIndex}
      justifyContent="space-between"
      borderBottomWidth={1}
      borderBottomColor="gray.200"
      borderTopWidth={mealIndex === 0 ? 0 : 1}
      borderTopColor="gray.200"
    >
      <Input
        {...nameRegister}
        onChange={onNameChange}
        autoComplete="off"
        height={12}
        bg="white"
        borderColor="gray.200"
        width="30%"
        defaultValue={mealField.name}
      />
      <Text>{mealStats.protein}</Text>
      <Button onClick={() => onRemove(mealIndex)}>Remove</Button>
    </Flex>
  )
}

export default Header
