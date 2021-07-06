import { Box, Input } from '@chakra-ui/react'
import MealItem from './MealItem'

import { MutableRefObject, useRef } from 'react'
import useGetRefForId from 'general/useGetRefForId'
import { Droppable } from 'react-beautiful-dnd'
import { getVariantsFormsPath } from 'core/diets'
import { useFormContext } from 'react-hook-form'
import { useVariantsFormsStoreState } from 'core/diets/variants/VariantsFormsStoreProvider'
import {
  useMealsFormsStoreMethods,
  useMealsFormsStoreState,
} from 'core/diets/meals/MealsFormsStoreProvider'
import useScrollToAndFocusMeal from './useScrollToAndFocusMeal'

type Props = {
  onAppendMealRef: MutableRefObject<(() => void) | undefined>
}

function MealsList({ onAppendMealRef }: Props) {
  const getMealNameInputRefById = useGetRefForId()
  const { register } = useFormContext()
  const scrollTargetRef = useRef<HTMLDivElement>(null)

  const {
    variantsFields,
    selectedVariantFormIndex,
  } = useVariantsFormsStoreState()
  const selectedVariantField = variantsFields[selectedVariantFormIndex]

  const mealsFields = useMealsFormsStoreState()
  const mealsFormsStoreMethods = useMealsFormsStoreMethods()

  const { onScrollToMeal } = useScrollToAndFocusMeal({
    scrollTargetRef,
    getMealNameInputRefById,
  })

  onAppendMealRef.current = mealsFormsStoreMethods.appendNewMealForm

  return (
    <Droppable droppableId="mealsList" type="mealsList">
      {provided => (
        <Box pt={3} ref={provided.innerRef}>
          <Input
            type="hidden"
            {...register(
              getVariantsFormsPath(selectedVariantFormIndex, 'fieldId')
            )}
            defaultValue={selectedVariantField.fieldId}
          />

          {mealsFields.map((mealField, index) => (
            <MealItem
              key={mealField.fieldId}
              variantIndex={selectedVariantFormIndex}
              getMealNameInputRefById={getMealNameInputRefById}
              index={index}
              onRemove={mealsFormsStoreMethods.removeMealFrom}
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
