import { useFoodsByIdState } from './FoodsByIdProvider'

function useGetGoodById(foodId: number) {
  const foodsByIdState = useFoodsByIdState()
  return foodsByIdState[foodId]
}

export default useGetGoodById
