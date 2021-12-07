import { VariantForm } from 'variants'
import { useCallback } from 'react'
import { ScrollManager } from 'diets/useScrollManager'

type Params = {
  scrollManager: ScrollManager
}

function useVariantFormEvents({ scrollManager }: Params) {
  const { setScrollState, getCachedScrollTop } = scrollManager

  const onVariantFormSelect = useCallback(
    (variantForm: VariantForm) => {
      setScrollState({ top: getCachedScrollTop(variantForm.fieldId) })
    },
    [setScrollState, getCachedScrollTop]
  )

  const onVariantFormCopy = useCallback(() => {
    setScrollState({ top: 0 })
  }, [setScrollState])

  return {
    onVariantFormCopy,
    onVariantFormSelect,
  }
}

export default useVariantFormEvents
