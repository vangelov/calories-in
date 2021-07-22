import { Box } from '@chakra-ui/react'
import IngredientItem from './IngredientItem'
import { Droppable } from 'react-beautiful-dnd'
import EmptyList from './EmptyList'
import { MealField, IngredientForm, useDietFormActions } from 'core/diets'
import { memo } from 'react'

type Props = {
  mealIndex: number
  variantIndex: number
  mealField: MealField
  onAddIngredients: () => void
  ingredientsForms: IngredientForm[]
}

function IngredientsList({
  variantIndex,
  mealIndex,
  mealField,
  onAddIngredients,
  ingredientsForms,
}: Props) {
  const dietFormActions = useDietFormActions()

  return (
    <Droppable droppableId={mealField.fieldId as string} type="ingredientsList">
      {provided => (
        <Box ref={provided.innerRef} minHeight="48px">
          {ingredientsForms.map((ingredientField, index) => (
            <IngredientItem
              key={ingredientField.fieldId}
              onRemove={dietFormActions.removeIngredientForm}
              variantIndex={variantIndex}
              mealIndex={mealIndex}
              index={index}
              ingredientField={ingredientField}
            />
          ))}
          {ingredientsForms.length > 0 && provided.placeholder}
          {ingredientsForms.length === 0 && (
            <EmptyList onAddIngredients={onAddIngredients} />
          )}
        </Box>
      )}
    </Droppable>
  )
}

export default memo(IngredientsList)
