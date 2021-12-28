import { useCallback, useEffect, useRef } from 'react'

function useRunIfNotUnmounted() {
  const isUnmountedRef = useRef(false)

  useEffect(() => {
    return () => {
      isUnmountedRef.current = true
    }
  }, [])

  const callIfNotUnmounted = useCallback((callback: Function) => {
    if (!isUnmountedRef.current) {
      callback()
    }
  }, [])

  return callIfNotUnmounted
}

export default useRunIfNotUnmounted
