import { FoodForm } from 'foods'
import { useFormContext } from 'react-hook-form'
import { NutritionData } from 'stats'

function useGetValue() {
  const { getValues } = useFormContext<FoodForm>()
  const values = getValues()

  function get(name: keyof NutritionData) {
    const valueAsNumber = Number(values[name])
    return valueAsNumber
  }

  return get
}

export default useGetValue
