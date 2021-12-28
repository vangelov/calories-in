import { getInsertVariantFormAnimationKey, VariantForm } from 'variants'
import { RefObject, useState } from 'react'
import { useOneTimeCheckActions } from 'general'
import { MouseEvent } from 'react'

type Params = {
  onDelete: (index: number) => void
  onSelect: (variantForm: VariantForm, index: number) => void
  variantForm: VariantForm
  index: number
  ref: RefObject<HTMLDivElement>
}

function useVariantFormEvents({
  onDelete,
  onSelect,
  variantForm,

  index,
}: Params) {
  const oneTimeCheckActions = useOneTimeCheckActions()
  const [isVisible, setIsVisible] = useState(true)

  const shouldAnimate = oneTimeCheckActions.checkAndReset(
    getInsertVariantFormAnimationKey(variantForm.fieldId)
  )

  function onAnimationComplete() {
    if (!isVisible) {
      onDelete(index)
    }
  }

  function onClick(event: MouseEvent<HTMLDivElement>) {
    const anyTarget: any = event.target

    if (
      anyTarget.type !== 'button' &&
      anyTarget.getAttribute('role') !== 'menuitem'
    ) {
      onSelect(variantForm, index)
    }
  }

  function onRemoveRequest() {
    setIsVisible(false)
  }

  return {
    onClick,
    shouldAnimate,
    onAnimationComplete,
    isVisible,
    onRemoveRequest,
  }
}

export default useVariantFormEvents
