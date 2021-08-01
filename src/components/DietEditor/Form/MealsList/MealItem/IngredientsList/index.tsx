import { Box } from '@chakra-ui/react'
import IngredientItem from './IngredientItem'
import { Droppable } from 'react-beautiful-dnd'
import EmptyList from './EmptyList'
import { MealForm, IngredientForm, useDietFormActions } from 'core/diets'
import { memo } from 'react'
import { Stats } from 'core/stats'

type Props = {
  mealIndex: number
  variantIndex: number
  mealForm: MealForm
  onAddIngredients: () => void
  ingredientsForms: IngredientForm[]
  ingredientsStats: Stats[]
}

function IngredientsList({
  variantIndex,
  mealIndex,
  mealForm,
  onAddIngredients,
  ingredientsForms,
  ingredientsStats,
}: Props) {
  const dietFormActions = useDietFormActions()

  return (
    <Droppable droppableId={mealForm.fieldId} type="ingredientsList">
      {provided => (
        <Box ref={provided.innerRef} minHeight="48px">
          {ingredientsForms.map((ingredientForm, index) => (
            <IngredientItem
              key={ingredientForm.fieldId}
              onRemove={dietFormActions.removeIngredientForm}
              variantIndex={variantIndex}
              mealIndex={mealIndex}
              index={index}
              ingredientForm={ingredientForm}
              ingredientStats={ingredientsStats[index]}
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
