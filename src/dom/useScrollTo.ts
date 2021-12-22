import { useEffect, useRef, useCallback } from 'react'

function useScrollTo() {
  const scrollTimeoutRef = useRef<number>()
  const didScrollCheckTimeoutRef = useRef<number>()

  const didScrollRef = useRef(false)

  useEffect(() => {
    return () => {
      window.clearTimeout(scrollTimeoutRef.current)
      window.clearTimeout(didScrollCheckTimeoutRef.current)
    }
  }, [])

  const scrollTo = useCallback((node: HTMLElement) => {
    didScrollRef.current = false

    return new Promise<void>(resolve => {
      function listener() {
        window.clearTimeout(scrollTimeoutRef.current)

        scrollTimeoutRef.current = window.setTimeout(() => {
          didScrollRef.current = true
          window.removeEventListener('scroll', listener)
          resolve()
        }, 50)
      }

      didScrollCheckTimeoutRef.current = window.setTimeout(() => {
        window.clearTimeout(didScrollCheckTimeoutRef.current)

        if (!didScrollRef.current) {
          window.removeEventListener('scroll', listener)
          resolve()
        }
      }, 100)

      window.addEventListener('scroll', listener)

      node.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    })
  }, [])

  return scrollTo
}

export default useScrollTo
