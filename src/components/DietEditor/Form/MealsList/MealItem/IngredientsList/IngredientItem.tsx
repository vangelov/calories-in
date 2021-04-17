import { Input, Flex, Text, Button } from '@chakra-ui/react'
import { getIngredinetsFormsPath, IngredientField } from 'core/dietForm'
import { useFormContext, Controller } from 'react-hook-form'
import { Stats } from 'core/stats'
import { Draggable } from 'react-beautiful-dnd'
import { useUndoRedoMethods } from 'core/undoRedo'
import { useFoodsByIdState } from 'core/foods/FoodsByIdProvider'

type Props = {
  mealIndex: number
  index: number
  ingredientField: IngredientField
  ingredientStats: Stats
  onRemove: () => void
}

function Ingredient({
  mealIndex,
  index,
  ingredientField,
  ingredientStats,
  onRemove,
}: Props) {
  const { register, control } = useFormContext()
  const { saveLastChange } = useUndoRedoMethods()
  const foodsByIdState = useFoodsByIdState()

  const onChange = () => {
    saveLastChange()
  }

  if (!ingredientField.foodId) {
    throw new Error('Food id is missing')
  }

  const food = foodsByIdState[ingredientField.foodId]

  return (
    <Draggable
      key={ingredientField.fieldId}
      draggableId={ingredientField.fieldId as string}
      index={index}
    >
      {(provided, snapshot) => (
        <Flex
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
          justifyContent="space-between"
          bg="gray"
        >
          <Text>{food.name}</Text>

          <Input
            type="hidden"
            name={getIngredinetsFormsPath(mealIndex, index, 'fieldId')}
            ref={node => register(node)}
            defaultValue={ingredientField.fieldId}
          />

          <Controller
            render={() => <div />}
            name={getIngredinetsFormsPath(mealIndex, index, 'foodId')}
            control={control}
            defaultValue={ingredientField.foodId}
          />

          <Input
            css={{ 'z-index': '0 !important' }}
            width="100px"
            autoComplete="off"
            bg="white"
            name={getIngredinetsFormsPath(mealIndex, index, 'amountInGrams')}
            ref={node => register(node)}
            defaultValue={ingredientField.amountInGrams}
            onChange={onChange}
          />
          <Text width="50px">{ingredientStats.protein}</Text>
          <Button onClick={onRemove}>Remove</Button>
        </Flex>
      )}
    </Draggable>
  )
}

export default Ingredient
