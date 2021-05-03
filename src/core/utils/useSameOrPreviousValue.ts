import { useEffect, useRef } from 'react'

function useSameOrPreviousValue(value: any) {
  const previous = useRef(value)

  useEffect(() => {
    previous.current = value
  }, [value])

  return previous.current
}

export default useSameOrPreviousValue
