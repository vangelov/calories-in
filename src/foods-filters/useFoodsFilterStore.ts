import { useCallback, useState } from 'react'
import { FoodsFilter, DEFAULT_FILTER } from './foodsFilter'
import { makeStoreProvider, useCallbacksMemo } from 'general'
import { useSaveValue } from 'persistence'

type Params = {
  initialFilter: FoodsFilter
  shouldSaveFilter?: boolean
}

function filterWithoutQuery(filter: FoodsFilter) {
  return { ...filter, query: '' }
}

function useFoodsFilterStore({
  initialFilter,
  shouldSaveFilter = true,
}: Params) {
  const [filter, setFilter] = useState<FoodsFilter>(initialFilter)

  useSaveValue({
    value: filterWithoutQuery(filter),
    key: 'foodsFilter',
    isEnabled: shouldSaveFilter,
  })

  const updateFilter = useCallback(
    (partialFilter: Partial<FoodsFilter>) =>
      setFilter(filter => {
        return { ...filter, ...partialFilter }
      }),
    []
  )

  const resetFilter = useCallback(() => {
    setFilter({ ...DEFAULT_FILTER })
  }, [])

  const resetCategoryIdAndQuery = useCallback(() => {
    setFilter(filter => ({
      ...DEFAULT_FILTER,
      onlyFoodsAddedByUser: filter.onlyFoodsAddedByUser,
    }))
  }, [])

  const actions = useCallbacksMemo({
    updateFilter,
    resetFilter,
    resetCategoryIdAndQuery,
  })

  return [filter, actions] as const
}

const [
  FoodsFilterStoreProvider,
  useFoodsFilter,
  useFoodsFilterActions,
] = makeStoreProvider(useFoodsFilterStore)

export { FoodsFilterStoreProvider, useFoodsFilter, useFoodsFilterActions }

export default useFoodsFilterStore
