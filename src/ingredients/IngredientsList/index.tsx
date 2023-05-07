import { Box, Fade } from '@chakra-ui/react'
import IngredientItem from './IngredientItem'
import { Droppable } from 'react-beautiful-dnd'
import EmptyList from './EmptyList'
import { useDietFormActions } from 'diets'
import { IngredientForm } from 'ingredients'
import { memo } from 'react'
import { Stats } from 'stats'

type Props = {
  mealIndex: number
  variantIndex: number
  mealFormFieldId: string
  onAddIngredients: () => void
  ingredientsForms: IngredientForm[]
  ingredientsStats: Stats[]
  shouldAddRadiusToLastBottomBorder?: boolean
}

function IngredientsList({
  variantIndex,
  mealIndex,
  mealFormFieldId,
  onAddIngredients,
  ingredientsForms,
  ingredientsStats,
  shouldAddRadiusToLastBottomBorder,
}: Props) {
  const dietFormActions = useDietFormActions()

  return (
    <Droppable droppableId={mealFormFieldId} type="ingredientsList">
      {(provided, snapshot) => (
        <Box ref={provided.innerRef} minHeight="56px">
          {ingredientsForms.map((ingredientForm, index) => {
            const { energy, protein, carbs, fat } = ingredientsStats[index]

            return (
              <IngredientItem
                key={ingredientForm.fieldId}
                data-test-type="ingredient"
                data-test-index={index}
                onRemove={dietFormActions.removeIngredientForm}
                variantIndex={variantIndex}
                mealIndex={mealIndex}
                index={index}
                ingredientForm={ingredientForm}
                energy={energy}
                protein={protein}
                carbs={carbs}
                fat={fat}
                isLast={index === ingredientsForms.length - 1}
                isDraggingOver={snapshot.isDraggingOver}
                shouldAddRadiusToLastBottomBorder={
                  shouldAddRadiusToLastBottomBorder !== undefined
                    ? shouldAddRadiusToLastBottomBorder
                    : index === ingredientsForms.length - 1
                }
              />
            )
          })}
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
