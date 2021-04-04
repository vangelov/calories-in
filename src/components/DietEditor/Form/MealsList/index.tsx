import { Box } from '@chakra-ui/react'
import MealItem from './MealItem'
import useMealsController, { MealsController } from './useMealsController'
import { MutableRefObject } from 'react'

type Props = {
  mealsControllerRef: MutableRefObject<MealsController | undefined>
}

function MealsList({ mealsControllerRef }: Props) {
  const mealsController = useMealsController()

  mealsControllerRef.current = mealsController

  return (
    <Box height="100%">
      {mealsController.mealsFields.map((mealField, index) => (
        <MealItem
          key={mealField.fieldId}
          index={index}
          onRemove={mealsController.onMealRemove}
          mealField={mealField}
        />
      ))}
      <Box height="50%" />
    </Box>
  )
}

export * from './useMealsController'

export default MealsList
