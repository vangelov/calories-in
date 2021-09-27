import { useRef, useState } from 'react'
import useResizeObserver from '@react-hook/resize-observer'

function useElementHeight() {
  const elementRef = useRef<HTMLDivElement>(null)
  const [elementHeight, setElementHeight] = useState(0)

  useResizeObserver(elementRef, entry =>
    setElementHeight(entry.contentRect.height)
  )

  return {
    elementRef,
    elementHeight,
  }
}

export default useElementHeight
