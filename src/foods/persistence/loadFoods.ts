import { builtInFoods } from 'foods'

function loadFoods() {
  const userFoodsString = localStorage.getItem('userFoods')

  if (userFoodsString) {
    const userFoods = JSON.parse(userFoodsString)
    return [...userFoods, ...builtInFoods]
  }

  return builtInFoods
}

export default loadFoods
