import { Box } from '@chakra-ui/react'
import MealItem from './MealItem'
import useMealsFieldArray, { MealsFieldArray } from './useMealsFieldArray'
import { MutableRefObject, RefObject } from 'react'
import { useGetRefForId } from 'core/utils'
import useScrollToAndFocusMeal from './useScrollToAndFocusMeal'

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
