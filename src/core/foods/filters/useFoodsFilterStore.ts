import tuple from 'general/tuple'
import { useCallback, useState, useMemo, useRef } from 'react'
import { FoodsFilter, DEFAULT_FILTER } from './foodsFilter'

let savedFilter = DEFAULT_FILTER

function useFoodsFilterStore() {
  const [filter, setFilter] = useState<FoodsFilter>(savedFilter)
  const timeoutRef = useRef<number>()

  const saveFilter = useCallback((filter: FoodsFilter) => {
    const filterToSave: FoodsFilter = { ...DEFAULT_FILTER }

    filterToSave.onlyFoodsAddedbyUser = filter.onlyFoodsAddedbyUser
    window.clearTimeout(timeoutRef.current)

    timeoutRef.current = window.setTimeout(() => {
      savedFilter = filterToSave
    }, 500)
  }, [])

  const updateQuery = useCallback((query: string) => {
    setFilter(filter => {
      return { ...filter, query }
    })
  }, [])

  const updateCategoryId = useCallback((categoryId: number) => {
    setFilter(filter => {
      return { ...filter, categoryId }
    })
  }, [])

  const updateOnlyFoodsAddedByUser = useCallback(
    (onlyFoodsAddedbyUser: boolean) => {
      setFilter(filter => {
        const newFilter = { ...filter, onlyFoodsAddedbyUser }
        saveFilter(newFilter)

        return newFilter
      })
    },
    [saveFilter]
  )

  const resetFilter = useCallback(() => {
    setFilter(filter => {
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

  const methods = useMemo(
    () => ({
      updateQuery,
      updateCategoryId,
      updateOnlyFoodsAddedByUser,
      saveFilter,
      resetFilter,
      resetCategoryIdAndQuery,
    }),
    [
      updateQuery,
      updateCategoryId,
      updateOnlyFoodsAddedByUser,
      saveFilter,
      resetFilter,
      resetCategoryIdAndQuery,
    ]
  )

  return tuple(filter, methods)
}

type FoodsFilterStore = ReturnType<typeof useFoodsFilterStore>

export type { FoodsFilterStore }

export default useFoodsFilterStore
