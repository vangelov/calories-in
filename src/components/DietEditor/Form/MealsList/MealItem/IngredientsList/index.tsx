import { Box } from '@chakra-ui/react'
import IngredientItem from './IngredientItem'
import { Droppable } from 'react-beautiful-dnd'
import EmptyList from './EmptyList'
import {
  useIngredientsFormsStoreMethods,
  useIngredientsFormsStoreState,
  MealField,
} from 'core/diets'

type Props = {
  mealIndex: number
  variantIndex: number
  mealField: MealField
  onAddIngredients: () => void
}

function IngredientsList({
  variantIndex,
  mealIndex,
  mealField,
  onAddIngredients,
}: Props) {
  const ingredientsFormsStoreMethods = useIngredientsFormsStoreMethods()
  const ingredientsFields = useIngredientsFormsStoreState()

  return (
    <Droppable droppableId={mealField.fieldId as string} type="ingredientsList">
      {provided => (
        <Box ref={provided.innerRef} minHeight="48px">
          {ingredientsFields.map((ingredientField, index) => (
            <IngredientItem
              key={ingredientField.fieldId}
              onRemove={ingredientsFormsStoreMethods.removeIngredientFrom}
              variantIndex={variantIndex}
              mealIndex={mealIndex}
              index={index}
              ingredientField={ingredientField}
            />
          ))}
          {ingredientsFields.length > 0 && provided.placeholder}
          {ingredientsFields.length === 0 && (
            <EmptyList onAddIngredients={onAddIngredients} />
          )}
        </Box>
      )}
    </Droppable>
  )
}

export default IngredientsList
