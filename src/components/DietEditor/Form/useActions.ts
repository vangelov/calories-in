import { DietForm, useDietFormActions, VariantForm } from 'core/diets'
import { useCallback } from 'react'
import { ScrollManager } from './useScrollManager'

type Params = {
  scrollManager: ScrollManager
}

function useActions({ scrollManager }: Params) {
  const dietFormActions = useDietFormActions()
  const { setScrollState, getCachedScrollTop } = scrollManager

  function onUndoOrRedo(form: object, scrollTop: number, scrollLeft: number) {
    dietFormActions.setDietForm(form as DietForm)
    setScrollState({ top: scrollTop, left: scrollLeft })
  }

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
    onUndoOrRedo,
  }
}

export default useActions
