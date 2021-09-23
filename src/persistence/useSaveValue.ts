import { useEffect } from 'react'

const TIMEOUT = 150

type Params = {
  value: any
  key: string
  isEnabled?: boolean
}

function useSaveValue({ value, key, isEnabled = true }: Params) {
  useEffect(() => {
    if (isEnabled) {
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
    }
  }, [value, key, isEnabled])
}

export default useSaveValue
