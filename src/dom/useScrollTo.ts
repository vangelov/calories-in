import { useEffect, useRef, useCallback } from 'react'

function useScrollTo() {
  const scrollTimeoutRef = useRef<number>()
  const didScrollCheckTimeoutRef = useRef<number>()

  useEffect(() => {
    return () => {
      window.clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  const scrollTo = useCallback((node: HTMLElement) => {
    return new Promise<void>(resolve => {
      const resolveWihoutScrollTimeout = window.setTimeout(() => {
        window.clearTimeout(didScrollCheckTimeoutRef.current)

        window.removeEventListener('scroll', listener)
        resolve()
      }, 100)

      function listener() {
        window.clearTimeout(scrollTimeoutRef.current)
        window.clearTimeout(resolveWihoutScrollTimeout)

        scrollTimeoutRef.current = window.setTimeout(() => {
          window.removeEventListener('scroll', listener)
          resolve()
        }, 50)
      }

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
