import { createRef, RefObject, useRef } from 'react'

type RefsCache = {
  [refId: number]: RefObject<HTMLDivElement>
}

function useGetRefForId() {
  const cacheRef = useRef<RefsCache>({})

  function getRef(refId: number) {
    if (!cacheRef.current[refId]) {
      cacheRef.current[refId] = createRef()
    }

    return cacheRef.current[refId]
  }

  return getRef
}

export default useGetRefForId
