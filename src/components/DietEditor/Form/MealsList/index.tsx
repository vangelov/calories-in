import { Box } from '@chakra-ui/react'
import MealItem from './MealItem'
import {
  useMealsFieldArray,
  MealsFieldArray,
  useScrollToAndFocusMeal,
} from 'core/dietForm'
import { MutableRefObject } from 'react'
import { useGetRefForId } from 'core/utils'
import { Droppable } from 'react-beautiful-dnd'

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
    <Droppable droppableId="mealsList" type="mealsList">
      {provided => (
        <Box ref={provided.innerRef}>
          {mealsFieldArray.mealsFields.map((mealField, index) => (
            <MealItem
              key={mealField.fieldId}
              getMealNameInputRefById={getMealNameInputRefById}
              index={index}
              onRemove={mealsFieldArray.onMealRemove}
              mealField={mealField}
            />
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  )
}

export default MealsList
