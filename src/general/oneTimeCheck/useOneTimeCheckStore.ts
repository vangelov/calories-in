import { useMemo, useRef, useCallback } from 'react'

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

  const methods = useMemo(
    () => ({
      checkAndReset,
      set,
    }),
    [checkAndReset, set]
  )

  return methods
}

type OneTimeCheckStore = ReturnType<typeof useOneTimeCheckStore>

export type { OneTimeCheckStore }

export default useOneTimeCheckStore
