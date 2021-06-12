import { Box } from '@chakra-ui/react'
import MealItem from './MealItem'
import {
  useMealsFieldArray,
  MealsFieldArray,
  useScrollToAndFocusMeal,
} from 'core/dietForm'
import { MutableRefObject } from 'react'
import { useGetRefForId } from 'core/utils'

type Props = {
  mealsFieldArrayRef: MutableRefObject<MealsFieldArray | undefined>
}

function MealsList({ mealsFieldArrayRef }: Props) {
  const getMealNameInputRefById = useGetRefForId()
  const pendingMealFieldIdRef = useScrollToAndFocusMeal({
    getMealNameInputRefById,
  })
  const mealsFieldArray = useMealsFieldArray({
    pendingMealFieldIdRef,
  })

  mealsFieldArrayRef.current = mealsFieldArray

  return (
    <Box>
      {mealsFieldArray.mealsFields.map((mealField, index) => (
        <MealItem
          key={mealField.fieldId}
          getMealNameInputRefById={getMealNameInputRefById}
          index={index}
          onRemove={mealsFieldArray.onMealRemove}
          mealField={mealField}
        />
      ))}
    </Box>
  )
}

export default MealsList
