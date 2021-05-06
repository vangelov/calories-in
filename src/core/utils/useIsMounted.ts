import { useRef, useEffect } from 'react'

function useIsMounted() {
  const isMountedRef = useRef(true)

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  return isMountedRef
}

export default useIsMounted
