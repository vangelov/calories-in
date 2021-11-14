import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import MealItem from './MealItem'
import { useRef, memo } from 'react'
import { useGetRefForId } from 'dom'
import { Droppable } from 'react-beautiful-dnd'
import { useDietFormActions } from 'diets'
import { MealForm } from 'meals'
import useScrollToAndFocusMeal from './useScrollToAndFocusMeal'
import EmptyList from './EmptyList'
import { FoodsDrawer } from 'foods'
import MealsControls from './MealsControls'

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
  const foodsDrawerDisclosure = useDisclosure()

  const { onScrollToMeal, onMealAdd } = useScrollToAndFocusMeal({
    scrollTargetRef,
    getMealNameInputRefById,
    foodsDrawerDisclosure,
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
            <EmptyList onAddMeal={foodsDrawerDisclosure.onOpen} />
          )}

          {provided.placeholder}
          {mealsForms.length > 0 && (
            <MealsControls
              mealsForms={mealsForms}
              onAddMeal={foodsDrawerDisclosure.onOpen}
            />
          )}
          <Box ref={scrollTargetRef} height="48px" />

          <FoodsDrawer
            isOpen={foodsDrawerDisclosure.isOpen}
            onClose={foodsDrawerDisclosure.onClose}
            mealName={`Meal ${mealsForms.length + 1}`}
            onSelectedFoods={onMealAdd}
          />
        </Flex>
      )}
    </Droppable>
  )
}

export default memo(MealsList)
