import { ReactNode, useMemo, useRef, useCallback } from 'react'
import { OneTimeCheckContext } from './context'

type Props = {
  children: ReactNode
}

type KeysMap = {
  [key: string]: boolean | undefined
}

function OneTimeCheckProvider({ children }: Props) {
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

  return (
    <OneTimeCheckContext.Provider value={methods}>
      {children}
    </OneTimeCheckContext.Provider>
  )
}

export * from './context'

export default OneTimeCheckProvider
