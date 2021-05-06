import { Box } from '@chakra-ui/react'
import MealItem from './MealItem'
import useMealsController, { MealsController } from './useMealsController'
import { MutableRefObject, RefObject } from 'react'
import { useGetRefForId } from 'core/utils'
import useScrollToAndFocusMeal from './useScrollToAndFocusMeal'

type Props = {
  scrollRef: RefObject<HTMLDivElement>
  mealsControllerRef: MutableRefObject<MealsController | undefined>
}

function MealsList({ mealsControllerRef, scrollRef }: Props) {
  const getMealNameInputRefById = useGetRefForId()
  const pendingMealFieldIdRef = useScrollToAndFocusMeal({
    getMealNameInputRefById,
    scrollRef,
  })
  const mealsController = useMealsController({
    pendingMealFieldIdRef,
  })

  mealsControllerRef.current = mealsController

  return (
    <Box
      borderLeftWidth={1}
      borderLeftColor="gray.200"
      borderRightWidth={1}
      borderRightColor="gray.200"
      ref={scrollRef}
      zIndex={0}
      flex={1}
      overflowY="scroll"
    >
      {mealsController.mealsFields.map((mealField, index) => (
        <MealItem
          key={mealField.fieldId}
          getMealNameInputRefById={getMealNameInputRefById}
          index={index}
          onRemove={mealsController.onMealRemove}
          mealField={mealField}
        />
      ))}
    </Box>
  )
}

export * from './useMealsController'

export default MealsList
