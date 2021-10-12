import { DietForm } from 'diets'
import { RefObject } from 'react'

type AppLocation = {
  scrollTop: number
  scrollLeft: number
  variantIndex: number
}

type Params = {
  horizontalScrollRef: RefObject<HTMLDivElement>
  dietForm: DietForm
}

function getAppLocation({
  horizontalScrollRef,
  dietForm,
}: Params): AppLocation {
  return {
    scrollTop: window.scrollY,
    scrollLeft: horizontalScrollRef.current
      ? horizontalScrollRef.current.scrollLeft
      : 0,
    variantIndex: dietForm.selectedVariantFormIndex,
  }
}

export type { AppLocation }

export default getAppLocation
