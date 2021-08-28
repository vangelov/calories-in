import { createRef, RefObject, useCallback, useRef } from 'react'

type RefsCache<T> = {
  [id: number]: RefObject<T>
  [id: string]: RefObject<T>
}

function useGetRefForId<T extends HTMLElement = HTMLElement>() {
  const cacheRef = useRef<RefsCache<T>>({})

  const getRef = useCallback((id: number | string) => {
    if (!cacheRef.current[id]) {
      cacheRef.current[id] = createRef()
    }

    return cacheRef.current[id]
  }, [])

  return getRef
}

export default useGetRefForId
