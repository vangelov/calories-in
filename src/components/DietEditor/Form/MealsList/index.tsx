import { Box } from '@chakra-ui/react'
import MealItem from './MealItem'
import {
  useMealsFieldArray,
  MealsFieldArray,
  useScrollToAndFocusMeal,
} from 'core/dietForm'
import { MutableRefObject, RefObject } from 'react'
import { useGetRefForId } from 'core/utils'

type Props = {
  scrollRef: RefObject<HTMLDivElement>
  mealsFieldArrayRef: MutableRefObject<MealsFieldArray | undefined>
}

function MealsList({ mealsFieldArrayRef, scrollRef }: Props) {
  const getMealNameInputRefById = useGetRefForId()
  const pendingMealFieldIdRef = useScrollToAndFocusMeal({
    getMealNameInputRefById,
    scrollRef,
  })
  const mealsFieldArray = useMealsFieldArray({
    pendingMealFieldIdRef,
  })

  mealsFieldArrayRef.current = mealsFieldArray

  return (
    <Box ref={scrollRef}>
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
