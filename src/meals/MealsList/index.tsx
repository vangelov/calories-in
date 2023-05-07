import { BoxProps, Flex, Box } from '@chakra-ui/react'
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
} & BoxProps

function MealsList({
  mealsForms,
  selectedVariantFormIndex,
  selectedVariantFormFieldId,
  headerHeight,
  onAddMeal,
  ...rest
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
        <Flex ref={provided.innerRef} flexDirection="column" {...rest}>
          {mealsForms.length > 0 ? (
            mealsForms.map((mealForm, index) => (
              <MealItem
                key={mealForm.fieldId}
                data-test-type="meal"
                data-test-index={index}
                variantIndex={selectedVariantFormIndex}
                getMealNameInputRefById={getMealNameInputRefById}
                index={index}
                onRemove={dietFormActions.removeMealForm}
                mealForm={mealForm}
                onFirstAppear={onScrollToMeal}
                selectedVariantFormFieldId={selectedVariantFormFieldId}
                mb={5}
                isDragging={snapshot.isDraggingOver}
              />
            ))
          ) : (
            <EmptyList onAddMeal={onAddMeal} />
          )}

          {provided.placeholder}
          {mealsForms.length > 0 && (
            <>
              <MealsControls mealsForms={mealsForms} onAddMeal={onAddMeal} />
              <Box ref={scrollTargetRef} />
            </>
          )}
        </Flex>
      )}
    </Droppable>
  )
}

export default memo(MealsList)
