import { RefObject, useEffect } from 'react'

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
          behavior: 'smooth',
        })
      }
    }, 200)
  }, [ref, isSelected])
}

export default useScrollIntoView
