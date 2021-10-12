import { makeStoreProvider, useCallbacksMemo } from 'general'
import { useRef, useCallback } from 'react'

type KeysMap = {
  [key: string]: boolean | undefined
}

function useOneTimeCheckStore() {
  const keysMapRef = useRef<KeysMap>({})

  const checkAndReset = useCallback((key: string) => {
    if (keysMapRef.current[key] === true) {
      setTimeout(() => {
        keysMapRef.current[key] = undefined
      }, 0)

      return true
    }

    return false
  }, [])

  const set = useCallback((key: string) => {
    keysMapRef.current[key] = true
  }, [])

  const actions = useCallbacksMemo({
    checkAndReset,
    set,
  })

  return [keysMapRef, actions] as const
}

const [
  OneTimeCheckStoreProvider,
  useOneTimeCheck,
  useOneTimeCheckActions,
] = makeStoreProvider(useOneTimeCheckStore)

type OneTimeCheckActions = ReturnType<typeof useOneTimeCheckActions>

export { OneTimeCheckStoreProvider, useOneTimeCheck, useOneTimeCheckActions }

export type { OneTimeCheckActions }

export default useOneTimeCheckStore
