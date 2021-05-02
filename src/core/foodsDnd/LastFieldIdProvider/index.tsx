import { ReactNode, useMemo, useRef, useCallback } from 'react'
import { LastFieldIdContext } from './context'

type Props = {
  children: ReactNode
}

function LastFieldIdProvider({ children }: Props) {
  const lastFieldIdRef = useRef<string>()

  const getAndResetLastFieldId = useCallback((fieldId: string) => {
    if (fieldId === lastFieldIdRef.current) {
      setTimeout(() => {
        lastFieldIdRef.current = undefined
      }, 0)
      return true
    }

    return false
  }, [])

  const setLastFieldId = useCallback((fieldId: string) => {
    lastFieldIdRef.current = fieldId
  }, [])

  const methods = useMemo(
    () => ({
      getAndResetLastFieldId,
      setLastFieldId,
    }),
    [getAndResetLastFieldId, setLastFieldId]
  )

  return (
    <LastFieldIdContext.Provider value={methods}>
      {children}
    </LastFieldIdContext.Provider>
  )
}

export * from './context'

export default LastFieldIdProvider
