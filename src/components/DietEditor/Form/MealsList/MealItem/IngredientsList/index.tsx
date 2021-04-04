import { IngredientField, MealForm } from 'core/dietForm'
import { Box, Text } from '@chakra-ui/react'
import IngredientItem from './IngredientItem'
import { Stats } from 'core/stats'
import { Droppable } from 'react-beautiful-dnd'
import { ArrayField } from 'react-hook-form'

type Props = {
  mealIndex: number
  mealField: Partial<ArrayField<MealForm, 'id'>>
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
    <Droppable
      key={mealField.fieldId}
      droppableId={mealField.fieldId as string}
    >
      {(provided, snapshot) => (
        <Box padding={2} ref={provided.innerRef} minHeight="56px">
          {ingredientsFields.map((ingredientField, index) => (
            <IngredientItem
              key={ingredientField.fieldId}
              mealIndex={mealIndex}
              index={index}
              ingredientField={ingredientField}
              ingredientStats={ingredientsStats[index]}
              onRemove={() => onIngredientRemove(index)}
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
