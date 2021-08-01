import { useState, useCallback, RefObject } from 'react'
import { VariantNameFormSubmitAction } from 'core/diets/variantForm/useSubmitVariantForm'
import { isSafari } from 'react-device-detect'
import { useDietForm, useDietFormActions, VariantForm } from 'core/diets'
import { useDisclosure } from '@chakra-ui/hooks'

type Props = {
  onVariantFormSelect: (variantForm: VariantForm) => void
  onVariantFormCopy: () => void
  appendButtonRef: RefObject<HTMLDivElement>
}

function useActions({
  onVariantFormSelect,
  onVariantFormCopy,
  appendButtonRef,
}: Props) {
  const modalDisclosure = useDisclosure()
  const [submitAction, setSubmitAction] = useState<VariantNameFormSubmitAction>(
    'append'
  )
  const [variantFormIndex, setVariantFormIndex] = useState<number>()
  const dietFormActions = useDietFormActions()
  const dietForm = useDietForm()

  const onVariantItemFirstAppear = useCallback(() => {
    // Safari also scrolls the meals list if behaviour is 'smooth'
    appendButtonRef.current?.scrollIntoView(
      isSafari
        ? undefined
        : {
            block: 'start',
            behavior: 'smooth',
          }
    )
  }, [appendButtonRef])

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
    (index: number) => {
      dietFormActions.setSelectedVariantFormIndex(index)
      onVariantFormSelect(dietForm.variantsForms[index])
    },
    [dietFormActions, onVariantFormSelect, dietForm.variantsForms]
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

  return {
    onVariantModalClose,
    onAppend,
    onCopy,
    onRename,
    onVariantItemFirstAppear,
    onSelect,
    variantFormIndex,
    submitAction,
    onRemove,
    modalDisclosure,
  }
}

export default useActions
