import { Box, Input } from '@chakra-ui/react'
import MealItem from './MealItem'
import {
  useMealsFieldArray,
  MealsFieldArray,
  useScrollToAndFocusMeal,
  useRemoveMealForm,
} from 'core/dietForm'
import { MutableRefObject, useRef } from 'react'
import { useGetRefForId } from 'core/utils'
import { Droppable } from 'react-beautiful-dnd'
import { useReorderMealsForms } from 'core/dietForm'
import { getVariantsFormsPath, VariantField } from 'core/dietForm'
import { useFormContext } from 'react-hook-form'

type Props = {
  variantIndex: number
  variantField: VariantField
  mealsFieldArrayRef: MutableRefObject<MealsFieldArray | undefined>
}

function MealsList({ mealsFieldArrayRef, variantIndex, variantField }: Props) {
  const getMealNameInputRefById = useGetRefForId()
  const { register } = useFormContext()
  const scrollTargetRef = useRef<HTMLDivElement>(null)

  const { pendingMealFieldIdRef, onScrollToMeal } = useScrollToAndFocusMeal({
    scrollTargetRef,
    getMealNameInputRefById,
  })

  const mealsFieldArray = useMealsFieldArray({
    variantIndex,
    pendingMealFieldIdRef,
  })

  const removeMealForm = useRemoveMealForm({ mealsFieldArray })

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
              onRemove={removeMealForm.onRemove}
              mealField={mealField}
              onFirstAppear={onScrollToMeal}
            />
          ))}

          {provided.placeholder}
          <Box ref={scrollTargetRef} height="58px" />
        </Box>
      )}
    </Droppable>
  )
}

export default MealsList
