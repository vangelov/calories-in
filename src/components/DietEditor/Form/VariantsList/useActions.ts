import { useState, useCallback } from 'react'
import { VariantNameFormSubmitAction } from 'core/diets/variantForm/useSubmitVariantForm'
import { useDietFormActions, VariantForm } from 'core/diets'
import { useDisclosure } from '@chakra-ui/hooks'

type Props = {
  onVariantFormSelect: (variantForm: VariantForm, index: number) => void
  onVariantFormCopy: () => void
}

function useActions({ onVariantFormSelect, onVariantFormCopy }: Props) {
  const modalDisclosure = useDisclosure()
  const [submitAction, setSubmitAction] = useState<VariantNameFormSubmitAction>(
    'append'
  )
  const [variantFormIndex, setVariantFormIndex] = useState<number>()
  const dietFormActions = useDietFormActions()
  const [showsScrollButtons, setShowsScrollButtons] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const { onOpen } = modalDisclosure

  const onRename = useCallback(
    (index: number) => {
      setSubmitAction('rename')
      setVariantFormIndex(index)
      onOpen()
    },
    [onOpen]
  )

  const onCopy = useCallback(
    (index: number) => {
      setSubmitAction('copy')
      setVariantFormIndex(index)
      onOpen()
    },
    [onOpen]
  )

  const onAppend = useCallback(() => {
    setSubmitAction('append')
    setVariantFormIndex(undefined)
    onOpen()
  }, [onOpen])

  const onSelect = useCallback(
    (variantForm: VariantForm, index: number) => {
      dietFormActions.setSelectedVariantFormIndex(index)
      onVariantFormSelect(variantForm, index)
    },
    [dietFormActions, onVariantFormSelect]
  )

  const onRemove = useCallback(
    (index: number) => {
      dietFormActions.removeVariantForm(index)
    },
    [dietFormActions]
  )

  const onVariantModalClose = () => {
    modalDisclosure.onClose()

    if (submitAction === 'copy') {
      onVariantFormCopy()
    }
  }

  function onScrollStateChange(
    isScrollable: boolean,
    canScrollLeft: boolean,
    canScrollRight: boolean
  ) {
    setCanScrollLeft(canScrollLeft)
    setCanScrollRight(canScrollRight)
    setShowsScrollButtons(isScrollable)
  }

  return {
    onVariantModalClose,
    onAppend,
    onCopy,
    onRename,
    onSelect,
    variantFormIndex,
    submitAction,
    onRemove,
    modalDisclosure,
    showsScrollButtons,
    canScrollLeft,
    canScrollRight,
    onScrollStateChange,
  }
}

export default useActions
