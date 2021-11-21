import { Box, Flex } from '@chakra-ui/react'
import MealItem from './MealItem'
import { useRef, memo } from 'react'
import { useGetRefForId } from 'dom'
import { Droppable } from 'react-beautiful-dnd'
import { useDietFormActions } from 'diets'
import { MealForm } from 'meals'
import useScrollToAndFocusMeal from './useScrollToAndFocusMeal'
import EmptyList from './EmptyList'
import MealsControls from './MealsControls'

type Props = {
  mealsForms: MealForm[]
  selectedVariantFormIndex: number
  selectedVariantFormFieldId: string
  headerHeight: number
  onAddMeal: () => void
}

function MealsList({
  mealsForms,
  selectedVariantFormIndex,
  selectedVariantFormFieldId,
  headerHeight,
  onAddMeal,
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
      {(provided, snapshot) => (
        <Flex
          p={3}
          ref={provided.innerRef}
          minHeight={`calc(100vh - ${headerHeight}px)`}
          bg="white"
          flexDirection="column"
        >
          {mealsForms.length > 0 ? (
            mealsForms.map((mealForm, index) => (
              <MealItem
                key={mealForm.fieldId}
                variantIndex={selectedVariantFormIndex}
                getMealNameInputRefById={getMealNameInputRefById}
                index={index}
                onRemove={dietFormActions.removeMealForm}
                mealForm={mealForm}
                onFirstAppear={onScrollToMeal}
                selectedVariantFormFieldId={selectedVariantFormFieldId}
                mb={3}
                isDragging={snapshot.isDraggingOver}
              />
            ))
          ) : (
            <EmptyList onAddMeal={onAddMeal} />
          )}

          {provided.placeholder}
          {mealsForms.length > 0 && (
            <MealsControls mealsForms={mealsForms} onAddMeal={onAddMeal} />
          )}
          <Box ref={scrollTargetRef} height="48px" />
        </Flex>
      )}
    </Droppable>
  )
}

export default memo(MealsList)
