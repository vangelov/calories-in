import { getDailyValuePercent, NutritionData } from 'stats'
import useGetValue from './useGetValue'

function useGetDailyValuePercent() {
  const getValue = useGetValue()

  function get(name: keyof NutritionData) {
    const value = getValue(name)
    return getDailyValuePercent(name, value)
  }

  return get
}

export default useGetDailyValuePercent
