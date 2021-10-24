import { makeStoreProvider, useCallbacksMemo } from 'general'
import { useMemo, useState } from 'react'
import { Portion } from './types'
import defaultPortions from './defaultPortions'

type PortionsMap = Record<string, Portion>

function usePortionsStore() {
  const [portionsById, setPortionsById] = useState<PortionsMap>(() => {
    const initialMap: PortionsMap = {}

    for (const portion of defaultPortions) {
      initialMap[portion.id] = portion
    }

    return initialMap
  })

  const portions = useMemo(() => Object.values(portionsById), [portionsById])

  const state = useCallbacksMemo({
    portionsById,
    portions,
  })

  return [state, setPortionsById] as const
}

const [
  PortionsStoreProvider,
  usePortions,
  usePortionsActions,
] = makeStoreProvider(usePortionsStore)

export { PortionsStoreProvider, usePortions, usePortionsActions }

export default usePortionsStore
