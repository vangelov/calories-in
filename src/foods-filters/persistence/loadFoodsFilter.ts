import { DEFAULT_FILTER, FoodsFilter } from 'foods-filters'

function loadFoodsFilter() {
  const foodsFilterString = localStorage.getItem('foodsFilter')

  if (foodsFilterString) {
    const foodsFilter = JSON.parse(foodsFilterString) as FoodsFilter
    return foodsFilter
  }

  return DEFAULT_FILTER
}

export default loadFoodsFilter
