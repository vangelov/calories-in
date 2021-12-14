import { RefObject, useEffect } from 'react'
import { isSafari } from 'react-device-detect'

type Params = {
  isSelected: boolean
  ref: RefObject<HTMLDivElement>
}

function useScrollIntoView({ ref, isSelected }: Params) {
  useEffect(() => {
    setTimeout(() => {
      if (isSelected) {
        ref.current?.scrollIntoView({
          block: 'nearest',
          behavior: isSafari ? undefined : 'smooth',
        })
      }
    }, 200)
  }, [ref, isSelected])
}

export default useScrollIntoView
