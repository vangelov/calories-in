import { Box, Input } from '@chakra-ui/react'
import MealItem from './MealItem'
import {
  useMealsFieldArray,
  MealsFieldArray,
  useScrollToAndFocusMeal,
} from 'core/dietForm'
import { MutableRefObject } from 'react'
import { useGetRefForId } from 'core/utils'
import { Droppable } from 'react-beautiful-dnd'
import { useReorderMealsForms } from 'core/mealsDnd'
import { getVariantsFormsPath, VariantField } from 'core/dietForm/variantForm'
import { useFormContext } from 'react-hook-form'

type Props = {
  variantIndex: number
  variantField: VariantField
  mealsFieldArrayRef: MutableRefObject<MealsFieldArray | undefined>
}

function MealsList({ mealsFieldArrayRef, variantIndex, variantField }: Props) {
  const getMealNameInputRefById = useGetRefForId()
  const { register } = useFormContext()

  const pendingMealFieldIdRef = useScrollToAndFocusMeal({
    getMealNameInputRefById,
  })

  const mealsFieldArray = useMealsFieldArray({
    variantIndex,
    pendingMealFieldIdRef,
  })

  useReorderMealsForms({ mealsFieldArray })

  mealsFieldArrayRef.current = mealsFieldArray

  return (
    <Droppable droppableId="mealsList" type="mealsList">
      {provided => (
        <Box pt={3} ref={provided.innerRef}>
          <Input
            type="hidden"
            {...register(getVariantsFormsPath(variantIndex, 'fieldId'))}
            defaultValue={variantField.fieldId}
          />

          {mealsFieldArray.mealsFields.map((mealField, index) => (
            <MealItem
              key={mealField.fieldId}
              variantIndex={variantIndex}
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
