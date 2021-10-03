import { RefObject, useEffect } from 'react'

function useSelectInputText(inputRef: RefObject<HTMLInputElement>) {
  useEffect(() => {
    const input = inputRef.current

    if (input) {
      input.setSelectionRange(0, input.value.length)
    }
  }, [inputRef])
}

export default useSelectInputText
