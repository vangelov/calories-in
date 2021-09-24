import { getDietForm } from 'diets'

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

export default loadLastOrDefaultDietForm
