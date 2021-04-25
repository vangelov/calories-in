import { IngredientField, MealField } from 'core/dietForm'
import { Box, Text } from '@chakra-ui/react'
import IngredientItem from './IngredientItem'
import { Stats } from 'core/stats'
import { Droppable } from 'react-beautiful-dnd'

type Props = {
  mealIndex: number
  mealField: MealField
  ingredientsFields: IngredientField[]
  ingredientsStats: Stats[]
  onIngredientRemove: (index: number) => void
}

function IngredientsList({
  mealIndex,
  mealField,
  onIngredientRemove,
  ingredientsFields,
  ingredientsStats,
}: Props) {
  return (
    <Droppable droppableId={mealField.fieldId as string}>
      {(provided, snapshot) => (
        <Box padding={2} ref={provided.innerRef} minHeight="56px">
          {ingredientsFields.map((ingredientField, index) => (
            <IngredientItem
              key={ingredientField.fieldId}
              onRemove={onIngredientRemove}
              mealIndex={mealIndex}
              index={index}
              ingredientField={ingredientField}
              ingredientStats={ingredientsStats[index]}
            />
          ))}
          {ingredientsFields.length > 0 && provided.placeholder}
          {ingredientsFields.length === 0 && <Text>Empty</Text>}
        </Box>
      )}
    </Droppable>
  )
}

export default IngredientsList
