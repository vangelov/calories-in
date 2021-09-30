import { Box } from '@chakra-ui/react'
import MealItem from './MealItem'

import { useRef, memo } from 'react'
import { useGetRefForId } from 'dom'
import { Droppable } from 'react-beautiful-dnd'
import { useDietFormActions } from 'diets'
import { MealForm } from 'meals'
import useScrollToAndFocusMeal from './useScrollToAndFocusMeal'

type Props = {
  mealsForms: MealForm[]
  selectedVariantFormIndex: number
  selectedVariantFormFieldId: string
  headerHeight: number
}

function MealsList({
  mealsForms,
  selectedVariantFormIndex,
  selectedVariantFormFieldId,
  headerHeight,
}: Props) {
  const getMealNameInputRefById = useGetRefForId<HTMLInputElement>()
  const scrollTargetRef = useRef<HTMLDivElement>(null)

  const { onScrollToMeal } = useScrollToAndFocusMeal({
    scrollTargetRef,
    getMealNameInputRefById,
  })

  const dietFormActions = useDietFormActions()

  return (
    <Droppable droppableId="mealsList" type="mealsList">
      {provided => (
        <Box
          px={{ base: 0, lg: 3 }}
          py={3}
          ref={provided.innerRef}
          minHeight={`calc(100vh - ${headerHeight}px)`}
          bg="white"
        >
          {mealsForms.map((mealForm, index) => (
            <MealItem
              key={mealForm.fieldId}
              variantIndex={selectedVariantFormIndex}
              getMealNameInputRefById={getMealNameInputRefById}
              index={index}
              onRemove={dietFormActions.removeMealForm}
              mealForm={mealForm}
              onFirstAppear={onScrollToMeal}
              selectedVariantFormFieldId={selectedVariantFormFieldId}
            />
          ))}

          {provided.placeholder}
          <Box ref={scrollTargetRef} height="48px" />
        </Box>
      )}
    </Droppable>
  )
}

export default memo(MealsList)
