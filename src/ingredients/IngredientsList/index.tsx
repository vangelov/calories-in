import { Box, Fade } from '@chakra-ui/react'
import IngredientItem from './IngredientItem'
import { Droppable } from 'react-beautiful-dnd'
import EmptyList from './EmptyList'
import { useDietFormActions } from 'diets'
import { IngredientForm } from 'ingredients'
import { MealForm } from 'meals'
import { memo } from 'react'
import { Stats } from 'stats'

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

  console.log('list', mealIndex)

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
              isLast={index === ingredientsForms.length - 1}
            />
          ))}
          {ingredientsForms.length > 0 && provided.placeholder}
          {ingredientsForms.length === 0 && (
            <Fade initial={false} in={true}>
              <EmptyList onAddIngredients={onAddIngredients} />
            </Fade>
          )}
        </Box>
      )}
    </Droppable>
  )
}

export default memo(IngredientsList)
