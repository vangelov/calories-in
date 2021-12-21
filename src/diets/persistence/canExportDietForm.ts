import { DietForm } from 'diets'

function canExportDietForm(dietForm: DietForm) {
  const { variantsForms } = dietForm

  return variantsForms.some(({ mealsForms }) => {
    return mealsForms.length > 0
  })
}

export default canExportDietForm
