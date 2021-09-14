import { getDietForm } from 'diets'
import { DietForm } from 'diets'
import { Food } from 'foods'

function getLocation(text: string) {
  const subject = '/Subject'
  const startIndex = text.indexOf('/Subject')
  const endIndex = text.indexOf('R', startIndex)

  if (startIndex < 0 || endIndex < 0) {
    throw new SyntaxError()
  }
  const locatioPrefix = text.slice(startIndex + subject.length, endIndex).trim()
  return `${locatioPrefix} obj`
}

function getData(location: string, text: string) {
  const startIndex = text.indexOf(location)
  const endIndex = text.indexOf('endobj', startIndex)

  if (startIndex < 0 || endIndex < 0) {
    throw new SyntaxError()
  }

  return text.slice(startIndex + location.length + 2, endIndex - 2)
}

function parseDietForm(text: string, fileName: string) {
  const location = getLocation(text)
  const data = getData(location, text)

  const dietForm = JSON.parse(data) as DietForm
  dietForm.fileName = fileName

  return dietForm
}

function hasMissingFoods(dietForm: DietForm, foodsById: Record<number, Food>) {
  const { variantsForms } = dietForm

  for (const variantForm of variantsForms) {
    const { mealsForms } = variantForm

    for (const mealForm of mealsForms) {
      const { ingredientsForms } = mealForm

      for (const ingredientForm of ingredientsForms) {
        const food = foodsById[ingredientForm.foodId]

        if (!food) {
          return true
        }
      }
    }
  }

  return false
}

function loadLastOrDefaultDietForm() {
  const savedValue = localStorage.getItem('lastDietForm')

  if (savedValue) {
    try {
      return JSON.parse(savedValue)
    } catch (error) {
      return getDietForm()
    }
  }

  return getDietForm()
}

export { loadLastOrDefaultDietForm, parseDietForm, hasMissingFoods }