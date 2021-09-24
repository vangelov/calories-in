import builInFoods from 'foods/builtIn.json'

function loadFoods() {
  const userFoodsString = localStorage.getItem('userFoods')

  if (userFoodsString) {
    const userFoods = JSON.parse(userFoodsString)
    return [...userFoods, ...builInFoods]
  }

  return builInFoods
}

export default loadFoods
