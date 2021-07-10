import { getMealForm, getMealsFormsPath, MealField, MealForm } from './mealForm'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import tuple from 'general/tuple'
import { DietForm } from '../dietForm'

type Params = {
  variantIndex: number
  onBeforeMealFormAppend: (mealForm: MealForm) => void
  onAfterChange: () => void
  dietFormMethods: UseFormReturn<DietForm>
}

function useMealsFormsStore({
  variantIndex,
  onBeforeMealFormAppend,
  onAfterChange,
  dietFormMethods,
}: Params) {
  const { getValues, control } = dietFormMethods

  const { fields, append, remove, move } = useFieldArray({
    name: getMealsFormsPath(variantIndex) as any,
    control,
  })

  const mealsFields = fields as MealField[]

  function getLatestMealFormAt(variantIndex: number, mealIndex: number) {
    const dietForm = getValues()
    const { variantsForms } = dietForm
    const mealForm = variantsForms[variantIndex].mealsForms[mealIndex]

    return mealForm
  }

  function appendNewMealForm() {
    const mealForm = getMealForm()

    onBeforeMealFormAppend(mealForm)
    append(mealForm)
    onAfterChange()

    return mealForm.fieldId
  }

  function removeMealFrom(index: number) {
    remove(index)
    onAfterChange()
  }

  function reorderMealsForms(sourceIndex: number, destinationIndex: number) {
    move(sourceIndex, destinationIndex)
    onAfterChange()
  }

  const methods = {
    getLatestMealFormAt,
    appendNewMealForm,
    removeMealFrom,
    reorderMealsForms,
  }

  return tuple(mealsFields, methods)
}

type MealsFormsStore = ReturnType<typeof useMealsFormsStore>

export type { MealsFormsStore }

export default useMealsFormsStore
