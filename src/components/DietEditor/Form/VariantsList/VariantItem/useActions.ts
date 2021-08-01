import { getInsertVariantFormAnimationKey, VariantForm } from 'core/diets'
import { useState } from 'react'
import { useOneTimeCheckActions } from 'general/oneTimeCheck'
import { MouseEvent } from 'react'

type Params = {
  onDelete: (index: number) => void
  onSelect: (index: number) => void
  variantForm: VariantForm
  index: number
  onFirstAppear?: () => void
}

function useActions({
  onDelete,
  onSelect,
  variantForm,

  index,
  onFirstAppear,
}: Params) {
  const oneTimeCheckActions = useOneTimeCheckActions()
  const [isVisible, setIsVisible] = useState(true)

  function onAnimationComplete() {
    if (shouldAnimate) {
      onFirstAppear && onFirstAppear()
    } else if (!isVisible) {
      onDelete(index)
    }
  }

  const shouldAnimate = oneTimeCheckActions.checkAndReset(
    getInsertVariantFormAnimationKey(variantForm.fieldId)
  )

  function onClick(event: MouseEvent<HTMLDivElement>) {
    const anyTarget: any = event.target

    if (
      anyTarget.type !== 'button' &&
      anyTarget.getAttribute('role') !== 'menuitem'
    ) {
      onSelect(index)
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

export default useActions
