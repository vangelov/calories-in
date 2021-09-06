import builInFoods from 'foods/builtIn.json'
import { useMemo } from 'react'

function useLoadFoods() {
  const foods = useMemo(() => {
    const userFoodsString = localStorage.getItem('userFoods')

    if (userFoodsString) {
      const userFoods = JSON.parse(userFoodsString)
      return [...userFoods, ...builInFoods]
    }

    return builInFoods
  }, [])

  return foods
}

export default useLoadFoods
