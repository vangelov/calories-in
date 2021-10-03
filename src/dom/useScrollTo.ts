import { useEffect, useRef, useCallback } from 'react'
import isElementInViewport from './isElementInViewport'

function useScrollTo() {
  const scrollTimeoutRef = useRef<number>()

  useEffect(() => {
    return () => {
      window.clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  const scrollTo = useCallback((node: HTMLElement) => {
    if (isElementInViewport(node)) {
      return Promise.resolve()
    }

    return new Promise<void>(resolve => {
      function listener() {
        window.clearTimeout(scrollTimeoutRef.current)

        scrollTimeoutRef.current = window.setTimeout(() => {
          window.removeEventListener('scroll', listener)
          resolve()
        }, 50)
      }

      window.addEventListener('scroll', listener)
      console.log('n', node)
      node.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }, [])

  return scrollTo
}

export default useScrollTo
