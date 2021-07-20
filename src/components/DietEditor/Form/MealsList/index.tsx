import { Box } from '@chakra-ui/react'
import MealItem from './MealItem'

import { useRef } from 'react'
import useGetRefForId from 'general/useGetRefForId'
import { Droppable } from 'react-beautiful-dnd'
import { useDietFormActions } from 'core/diets'
import useScrollToAndFocusMeal from './useScrollToAndFocusMeal'
import { useDietForm } from 'core/diets'

function MealsList() {
  const getMealNameInputRefById = useGetRefForId()
  const scrollTargetRef = useRef<HTMLDivElement>(null)

  const { onScrollToMeal } = useScrollToAndFocusMeal({
    scrollTargetRef,
    getMealNameInputRefById,
  })
  const dietForm = useDietForm()
  console.log('D', dietForm)
  const dietFormActions = useDietFormActions()
  const mealsForms =
    dietForm.variantsForms[dietForm.selectedVariantFormIndex].mealsForms

  return (
    <Droppable droppableId="mealsList" type="mealsList">
      {provided => (
        <Box pt={3} ref={provided.innerRef}>
          {mealsForms.map((mealForm, index) => (
            <MealItem
              key={mealForm.fieldId}
              variantIndex={dietForm.selectedVariantFormIndex}
              getMealNameInputRefById={getMealNameInputRefById}
              index={index}
              onRemove={dietFormActions.removeMealForm}
              mealField={mealForm}
              onFirstAppear={onScrollToMeal}
            />
          ))}

          {provided.placeholder}
          <Box ref={scrollTargetRef} height="58px" />
        </Box>
      )}
    </Droppable>
  )
}

export default MealsList
