const DEFAULT_FILTER: FoodsFilter = {
  query: '',
  onlyFoodsAddedByUser: false,
  categoryId: 0,
}

type FoodsFilter = {
  categoryId?: number
  onlyFoodsAddedByUser?: boolean
  query: string
}

function nonQueryChangesCount(filter: FoodsFilter) {
  let count = 0
  const { categoryId, onlyFoodsAddedByUser } = filter

  if (categoryId !== DEFAULT_FILTER.categoryId) {
    count++
  }

  if (onlyFoodsAddedByUser !== DEFAULT_FILTER.onlyFoodsAddedByUser) {
    count++
  }

  return count
}

export type { FoodsFilter }

export { nonQueryChangesCount, DEFAULT_FILTER }
