import { Food } from 'core/types'
import {
  useState,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from 'react'

function useFoodsStore() {
  const [foodsById, setFoodsById] = useState<Record<number, Food>>({})

  const addFood = useCallback(
    (food: Food) =>
      setFoodsById({
        ...foodsById,
        [food.id]: food,
      }),
    [foodsById]
  )

  const getFoodById = useCallback((id: number) => foodsById[id], [foodsById])

  const getFoods = useCallback(() => Object.values(foodsById), [foodsById])

  return useMemo(() => ({ addFood, getFoodById, getFoods }), [
    addFood,
    getFoodById,
    getFoods,
  ])
}

type FoodsStore = ReturnType<typeof useFoodsStore>
const Context = createContext<FoodsStore | undefined>(undefined)

function useFoodsStoreContext() {
  const store = useContext(Context)

  if (!store) {
    throw new Error('Missing store context provider')
  }

  return store
}

export { useFoodsStoreContext, useFoodsStore, Context }
