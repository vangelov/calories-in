import { useEffect, useRef } from 'react'
import isElementVisible from './isElementVisible'

function useScrollTo() {
  const scrollTimeoutRef = useRef<number>()

  useEffect(() => {
    return () => {
      window.clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  function scrollTo(node: HTMLElement, container: HTMLElement) {
    if (isElementVisible(node, container)) {
      return Promise.resolve()
    }

    return new Promise<void>(resolve => {
      function listener() {
        window.clearTimeout(scrollTimeoutRef.current)

        scrollTimeoutRef.current = window.setTimeout(() => {
          container.removeEventListener('scroll', listener)
          resolve()
        }, 50)
      }

      container.addEventListener('scroll', listener)

      node.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }

  return scrollTo
}

export default useScrollTo
