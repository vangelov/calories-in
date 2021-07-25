import { Box } from '@chakra-ui/react'
import MealItem from './MealItem'

import { useRef, memo, useEffect } from 'react'
import useGetRefForId from 'general/useGetRefForId'
import { Droppable } from 'react-beautiful-dnd'
import { MealForm, useDietFormActions } from 'core/diets'
import useScrollToAndFocusMeal from './useScrollToAndFocusMeal'
import useSameOrPreviousValue from 'general/useSameOrPreviousValue'

type Props = {
  mealsForms: MealForm[]
  selectedVariantFormIndex: number
}

function MealsList({ mealsForms, selectedVariantFormIndex }: Props) {
  const getMealNameInputRefById = useGetRefForId()
  const scrollTargetRef = useRef<HTMLDivElement>(null)

  const { onScrollToMeal } = useScrollToAndFocusMeal({
    scrollTargetRef,
    getMealNameInputRefById,
  })

  const dietFormActions = useDietFormActions()

  return (
    <Droppable droppableId="mealsList" type="mealsList">
      {provided => (
        <Box pt={3} ref={provided.innerRef}>
          {mealsForms.map((mealForm, index) => (
            <MealItem
              key={mealForm.fieldId}
              variantIndex={selectedVariantFormIndex}
              getMealNameInputRefById={getMealNameInputRefById}
              index={index}
              onRemove={dietFormActions.removeMealForm}
              mealForm={mealForm}
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

export default memo(MealsList)
