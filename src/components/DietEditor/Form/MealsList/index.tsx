import { Box, Input } from '@chakra-ui/react'
import MealItem from './MealItem'
import {
  useMealsFieldArray,
  useScrollToAndFocusMeal,
  useRemoveMealForm,
  useAppendMealForm,
} from 'core/diets'
import { MutableRefObject, useRef } from 'react'
import useGetRefForId from 'general/useGetRefForId'
import { Droppable } from 'react-beautiful-dnd'
import { useReorderMealsForms } from 'core/diets'
import { getVariantsFormsPath, VariantField } from 'core/diets'
import { useFormContext } from 'react-hook-form'

type Props = {
  variantIndex: number
  variantField: VariantField
  onAppendMealRef: MutableRefObject<(() => void) | undefined>
}

function MealsList({ onAppendMealRef, variantIndex, variantField }: Props) {
  const getMealNameInputRefById = useGetRefForId()
  const { register } = useFormContext()
  const scrollTargetRef = useRef<HTMLDivElement>(null)

  const { pendingMealFieldIdRef, onScrollToMeal } = useScrollToAndFocusMeal({
    scrollTargetRef,
    getMealNameInputRefById,
  })

  const mealsFieldArray = useMealsFieldArray({
    variantIndex,
  })

  const removeMealForm = useRemoveMealForm({ mealsFieldArray })
  const appendMealForm = useAppendMealForm({
    mealsFieldArray,
    pendingMealFieldIdRef,
  })

  useReorderMealsForms({ mealsFieldArray })

  onAppendMealRef.current = appendMealForm.onAppend

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
