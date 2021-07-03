import tuple from 'general/tuple'
import { useCallback, useMemo, useState } from 'react'

type State = {
  canUndo: boolean
  canRedo: boolean
}

const INITIAL_STATE: State = { canUndo: false, canRedo: false }

function useFormChangesCapabilitiesStore() {
  const [state, setState] = useState(INITIAL_STATE)

  const updateCapabilities = useCallback(
    (canUndo: boolean, canRedo: boolean) => {
      setState({ canUndo, canRedo })
    },
    []
  )

  const methods = useMemo(
    () => ({
      updateCapabilities,
    }),
    [updateCapabilities]
  )

  return tuple(state, methods)
}

type FormChangesCapabilitiesStore = ReturnType<
  typeof useFormChangesCapabilitiesStore
>

export type { FormChangesCapabilitiesStore }

export default useFormChangesCapabilitiesStore
