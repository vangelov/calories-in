const DEFAULT_FILTER: FoodsFilter = {
  query: '',
  onlyFoodsAddedbyUser: false,
  categoryId: 0,
}

type FoodsFilter = {
  categoryId?: number
  onlyFoodsAddedbyUser?: boolean
  query: string
}

function nonQueryChangesCount(filter: FoodsFilter) {
  let count = 0
  const { categoryId, onlyFoodsAddedbyUser } = filter

  if (categoryId !== DEFAULT_FILTER.categoryId) {
    count++
  }

  if (onlyFoodsAddedbyUser !== DEFAULT_FILTER.onlyFoodsAddedbyUser) {
    count++
  }

  return count
}

export type { FoodsFilter }

export { nonQueryChangesCount, DEFAULT_FILTER }
