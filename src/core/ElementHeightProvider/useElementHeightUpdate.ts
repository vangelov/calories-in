import useResizeObserver from '@react-hook/resize-observer'
import { RefObject, useLayoutEffect } from 'react'
import { useElementHeightDispatch } from './context'

function useElementHeightUpdate(ref: RefObject<HTMLElement>) {
  const elementHeightDispatch = useElementHeightDispatch()

  useLayoutEffect(() => {
    if (ref.current) {
      const boundingRect = ref.current.getBoundingClientRect()
      elementHeightDispatch(boundingRect.height)
    }
  })

  useResizeObserver(ref, event => {
    elementHeightDispatch(event.contentRect.height)
  })
}

export default useElementHeightUpdate
