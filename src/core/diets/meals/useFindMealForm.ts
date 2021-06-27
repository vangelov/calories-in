import { useFormContext } from 'react-hook-form'
import { DietForm } from '../dietForm'

function useFindMealForm() {
  const { getValues } = useFormContext<DietForm>()

  function findMealForm(variantIndex: number, mealIndex: number) {
    const dietForm = getValues()
    const { variantsForms } = dietForm
    const mealForm = variantsForms[variantIndex].mealsForms[mealIndex]

    return mealForm
  }

  return findMealForm
}

export default useFindMealForm
