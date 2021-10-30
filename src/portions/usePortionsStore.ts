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

  const allPortions = useMemo(() => Object.values(portionsById), [portionsById])

  const weightBasedPortions = useMemo(
    () =>
      allPortions.filter(({ gramsPerAmount }) => gramsPerAmount !== undefined),
    [allPortions]
  )

  const volumeBasedPortions = useMemo(
    () =>
      allPortions.filter(
        ({ millilitersPerAmount }) => millilitersPerAmount !== undefined
      ),
    [allPortions]
  )

  const state = useCallbacksMemo({
    portionsById,
    allPortions,
    volumeBasedPortions,
    weightBasedPortions,
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
