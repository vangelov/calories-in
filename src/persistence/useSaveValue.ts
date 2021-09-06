import { useEffect } from 'react'

const TIMEOUT = 150

type Params = {
  value: any
  key: string
}

function useSaveValue({ value, key }: Params) {
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const valueString = JSON.stringify(value)
        localStorage.setItem(key, valueString)
      } catch (error) {
        // Do nothing
      }
    }, TIMEOUT)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [value, key])
}

export default useSaveValue
