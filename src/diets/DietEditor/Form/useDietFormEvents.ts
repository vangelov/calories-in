import { DietForm, useDietFormActions, ScrollManager } from 'diets'
import { AppLocation } from 'undoRedo'

type Params = {
  scrollManager: ScrollManager
}

function useDietFormEvents({ scrollManager }: Params) {
  const dietFormActions = useDietFormActions()
  const { setScrollState } = scrollManager

  function onUndoOrRedo(
    form: DietForm,
    { scrollTop, scrollLeft, variantIndex }: AppLocation
  ) {
    const finalVariantIndex = form.variantsForms[variantIndex]
      ? variantIndex
      : form.selectedVariantFormIndex

    dietFormActions.updateDietForm({
      ...form,
      selectedVariantFormIndex: finalVariantIndex,
    })

    setScrollState({ top: scrollTop, left: scrollLeft })
  }

  return {
    onUndoOrRedo,
  }
}

export default useDietFormEvents
