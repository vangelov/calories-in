import { useDietFormActions, ScrollManager } from 'diets'
import { RefObject } from 'react'
import { VariantForm } from 'variants'

type Params = {
  nameInputRef: RefObject<HTMLInputElement>
  scrollManager: ScrollManager
  selectedVariantFormIndex: number
}

function useVariantFormEvents({
  scrollManager,
  nameInputRef,
  selectedVariantFormIndex,
}: Params) {
  const dietFormActions = useDietFormActions()
  const { setScrollState, getCachedScrollTop } = scrollManager

  function onSelect(variantForm: VariantForm, index: number) {
    dietFormActions.setSelectedVariantFormIndex(index)
    setScrollState({ top: getCachedScrollTop(variantForm.fieldId) })
  }

  function onCreate() {
    setTimeout(() => {
      dietFormActions.appendVariantForm()

      if (nameInputRef.current) {
        nameInputRef.current.focus()
      }
    }, 200)
  }

  function onCopy() {
    dietFormActions.duplicateVariantForm(selectedVariantFormIndex)
    setScrollState({ top: 0 })

    if (nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }

  function onRemove() {
    dietFormActions.removeVariantForm(
      selectedVariantFormIndex,
      newSelectedVariantForm => {
        setScrollState({
          top: getCachedScrollTop(newSelectedVariantForm.fieldId),
        })
      }
    )
  }

  function onNameChange(name: string) {
    dietFormActions.updateVariantForm(selectedVariantFormIndex, {
      name,
    })
  }

  return {
    onSelect,
    onCreate,
    onCopy,
    onRemove,
    onNameChange,
  }
}

export default useVariantFormEvents
