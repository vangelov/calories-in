import { useEffect, useRef } from 'react'

function useScrollTo() {
  const scrollTimeoutRef = useRef<number>()

  useEffect(() => {
    return () => {
      window.clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  function scrollTo(container: HTMLElement, node: HTMLElement) {
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
