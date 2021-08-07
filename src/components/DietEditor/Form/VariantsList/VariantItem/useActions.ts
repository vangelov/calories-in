import { getInsertVariantFormAnimationKey, VariantForm } from 'core/diets'
import { RefObject, useState } from 'react'
import { useOneTimeCheckActions } from 'general/oneTimeCheck'
import { MouseEvent } from 'react'
import { isSafari } from 'react-device-detect'

type Params = {
  onDelete: (index: number) => void
  onSelect: (variantForm: VariantForm, index: number) => void
  variantForm: VariantForm
  index: number

  ref: RefObject<HTMLDivElement>
}

function useActions({ onDelete, onSelect, variantForm, ref, index }: Params) {
  const oneTimeCheckActions = useOneTimeCheckActions()
  const [isVisible, setIsVisible] = useState(true)

  function onAnimationComplete() {
    if (shouldAnimate) {
      ref.current?.scrollIntoView(
        isSafari
          ? undefined
          : {
              block: 'end',
              behavior: 'smooth',
            }
      )
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

export default useActions
