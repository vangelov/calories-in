import { Box, Fade } from '@chakra-ui/react'
import IngredientItem from './IngredientItem'
import { Droppable } from 'react-beautiful-dnd'
import EmptyList from './EmptyList'
import { useDietFormActions } from 'diets'
import { IngredientForm } from 'ingredients'
import { memo } from 'react'
import { Stats } from 'stats'
import HeaderItem from './HeaderItem'

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
      {provided => (
        <Box ref={provided.innerRef} minHeight="48px">
          {ingredientsForms.map((ingredientForm, index) => {
            const { energy, protein, carbs, fat } = ingredientsStats[index]

            if (index === 3) {
              return (
                <HeaderItem
                  ingredientForm={ingredientForm}
                  index={index}
                  key={ingredientForm.fieldId}
                  variantIndex={variantIndex}
                  mealIndex={mealIndex}
                  isLast={index === ingredientsForms.length - 1}
                  shouldAddRadiusToLastBottomBorder={
                    shouldAddRadiusToLastBottomBorder !== undefined
                      ? shouldAddRadiusToLastBottomBorder
                      : index === ingredientsForms.length - 1
                  }
                />
              )
            }

            return (
              <IngredientItem
                key={ingredientForm.fieldId}
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
