import { createRef, RefObject, useRef } from 'react'

type RefsCache = {
  [id: number]: RefObject<HTMLDivElement>
  [id: string]: RefObject<HTMLDivElement>
}

function useGetRefForId() {
  const cacheRef = useRef<RefsCache>({})

  function getRef(id: number | string) {
    if (!cacheRef.current[id]) {
      cacheRef.current[id] = createRef()
    }

    return cacheRef.current[id]
  }

  return getRef
}

export default useGetRefForId
