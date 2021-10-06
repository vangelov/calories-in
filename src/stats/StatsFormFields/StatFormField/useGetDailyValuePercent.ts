import { useController } from 'react-hook-form'
import { getDailyValuePercent, NutritionData } from 'stats'

function useGetDailyValuePercent(name: keyof NutritionData) {
  const { field } = useController({ name })
  const valueAsNumber = Number(field.value)

  return getDailyValuePercent(name, valueAsNumber)
}

export default useGetDailyValuePercent
