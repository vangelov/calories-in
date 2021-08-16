import { useCallback, useState, useRef } from 'react'
import { FoodsFilter, DEFAULT_FILTER } from './foodsFilter'
import { makeStoreProvider, useCallbacksMemo } from 'general/stores'

let savedFilter = DEFAULT_FILTER

function useFoodsFilterStore() {
  const [filter, setFilter] = useState<FoodsFilter>(savedFilter)
  const timeoutRef = useRef<number>()

  const saveFilter = useCallback((filter: FoodsFilter) => {
    window.clearTimeout(timeoutRef.current)

    timeoutRef.current = window.setTimeout(() => {
      const filterToSave: FoodsFilter = {
        ...DEFAULT_FILTER,
        onlyFoodsAddedbyUser: filter.onlyFoodsAddedbyUser,
      }

      savedFilter = filterToSave
    }, 500)
  }, [])

  const updateFilter = useCallback(
    (partialFilter: Partial<FoodsFilter>) =>
      setFilter(filter => {
        const newFilter = { ...filter, ...partialFilter }

        if (partialFilter.onlyFoodsAddedbyUser !== undefined) {
          saveFilter(newFilter)
        }
        return newFilter
      }),
    [saveFilter]
  )

  const resetFilter = useCallback(() => {
    setFilter(() => {
      const newFilter = { ...DEFAULT_FILTER }
      saveFilter(newFilter)

      return newFilter
    })
  }, [saveFilter])

  const resetCategoryIdAndQuery = useCallback(() => {
    setFilter(filter => ({
      ...DEFAULT_FILTER,
      onlyFoodsAddedbyUser: filter.onlyFoodsAddedbyUser,
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
