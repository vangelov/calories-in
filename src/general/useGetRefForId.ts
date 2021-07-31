import { createRef, RefObject, useCallback, useRef } from 'react'

type RefsCache = {
  [id: number]: RefObject<HTMLInputElement>
  [id: string]: RefObject<HTMLInputElement>
}

function useGetRefForId() {
  const cacheRef = useRef<RefsCache>({})

  const getRef = useCallback((id: number | string) => {
    if (!cacheRef.current[id]) {
      cacheRef.current[id] = createRef()
    }

    return cacheRef.current[id]
  }, [])

  return getRef
}

export default useGetRefForId
