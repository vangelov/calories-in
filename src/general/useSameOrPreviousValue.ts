import { useEffect, useRef } from 'react'

function useSameOrPreviousValue<T>(value: T) {
  const previous = useRef(value)

  useEffect(() => {
    previous.current = value
  }, [value])

  return previous.current
}

export default useSameOrPreviousValue
