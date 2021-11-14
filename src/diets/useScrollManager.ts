import { VariantForm } from 'variants'
import { useState, useRef, useEffect, RefObject, useCallback } from 'react'

type ScrollState = {
  top?: number
  left?: number
}

type Params = {
  selectedVariantForm: VariantForm
  horizontalScrollRef: RefObject<HTMLDivElement>
}

function useScrollManager({
  selectedVariantForm,
  horizontalScrollRef,
}: Params) {
  const scrollTopCacheRef = useRef<Record<string, number | undefined>>({})
  const [scrollState, setScrollState] = useState<ScrollState>({
    top: 0,
    left: 0,
  })

  const getCachedScrollTop = useCallback((variantFormFieldId: string) => {
    return scrollTopCacheRef.current[variantFormFieldId] || 0
  }, [])

  useEffect(() => {
    function onScroll() {
      scrollTopCacheRef.current[selectedVariantForm.fieldId] = window.scrollY
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [selectedVariantForm.fieldId])

  useEffect(() => {
    const { top, left } = scrollState

    if (top !== undefined) {
      window.scroll({ top })
    }

    if (left !== undefined && horizontalScrollRef.current) {
      horizontalScrollRef.current.scrollLeft = left
    }
  }, [scrollState, horizontalScrollRef])

  return {
    setScrollState,
    getCachedScrollTop,
  }
}

type ScrollManager = ReturnType<typeof useScrollManager>

export type { ScrollManager }

export default useScrollManager
