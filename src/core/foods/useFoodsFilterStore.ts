import tuple from 'general/tuple'
import { useCallback, useState, useMemo, useRef, useEffect } from 'react'
import { FoodsFilter } from './useFilterFoods'

const DEFAULT_FILTER: FoodsFilter = {
  query: '',
  onlyFoodsAddedbyUser: false,
  categoryId: 0,
}

function useFoodsFilterStore() {
  const [filter, setFilter] = useState<FoodsFilter>(DEFAULT_FILTER)
  const timeoutRef = useRef<number>()

  useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current)
    }
  })

  const saveFilter = useCallback((filter: FoodsFilter) => {
    const filterToSave: FoodsFilter = { ...DEFAULT_FILTER }

    filterToSave.onlyFoodsAddedbyUser = filter.onlyFoodsAddedbyUser
    window.clearTimeout(timeoutRef.current)

    timeoutRef.current = window.setTimeout(() => {
      setFilter(filterToSave)
    }, 500)
  }, [])

  const methods = useMemo(
    () => ({
      saveFilter,
    }),
    [saveFilter]
  )

  return tuple(filter, methods)
}

type FoodsFilterStore = ReturnType<typeof useFoodsFilterStore>

export type { FoodsFilterStore }

export default useFoodsFilterStore
