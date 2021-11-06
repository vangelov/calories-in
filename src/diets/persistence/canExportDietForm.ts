import { DietForm } from 'diets'

function canExportDietForm(dietForm: DietForm) {
  const { variantsForms, selectedVariantFormIndex } = dietForm
  const variantForm = variantsForms[selectedVariantFormIndex]

  return variantForm.mealsForms.length > 0
}

export default canExportDietForm
