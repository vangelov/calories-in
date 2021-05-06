import { Box } from '@chakra-ui/react'
import MealItem from './MealItem'
import useMealsController, { MealsController } from './useMealsController'
import { MutableRefObject, RefObject } from 'react'
import { useGetRefForId } from 'core/utils'

type Props = {
  scrollRef: RefObject<HTMLDivElement>
  mealsControllerRef: MutableRefObject<MealsController | undefined>
}

function MealsList({ mealsControllerRef, scrollRef }: Props) {
  const getMealNameInputRefById = useGetRefForId()
  const mealsController = useMealsController({
    scrollRef,
    getMealNameInputRefById,
  })

  mealsControllerRef.current = mealsController

  return (
    <Box height="100%">
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
