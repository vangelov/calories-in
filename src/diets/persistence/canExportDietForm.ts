import { DietForm } from 'diets'

function canExportDietForm(dietForm: DietForm) {
  return dietForm.variantsForms.some(({ mealsForms }) => mealsForms.length > 0)
}

export default canExportDietForm
