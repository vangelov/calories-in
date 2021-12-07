import { useState, useCallback } from 'react'
import { VariantForm } from 'variants'
import { useDietFormActions } from 'diets'
import { useDisclosure } from '@chakra-ui/hooks'

type Props = {
  onVariantFormSelect: (variantForm: VariantForm, index: number) => void
  onVariantFormCopy: () => void
}

function useVariantFormEvents({
  onVariantFormSelect,
  onVariantFormCopy,
}: Props) {
  const modalDisclosure = useDisclosure()

  const [variantFormIndex, setVariantFormIndex] = useState<number>(0)
  const dietFormActions = useDietFormActions()

  const { onOpen } = modalDisclosure

  const onRename = useCallback(
    (index: number) => {
      setVariantFormIndex(index)
      onOpen()
    },
    [onOpen]
  )

  const onCopy = useCallback(
    (index: number) => {
      dietFormActions.duplicateVariantForm(index)
      onVariantFormCopy()
    },
    [dietFormActions, onVariantFormCopy]
  )

  const onAppend = useCallback(() => {
    dietFormActions.appendVariantForm()
  }, [dietFormActions])

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

  return {
    onAppend,
    onCopy,
    onRename,
    onSelect,
    variantFormIndex,
    onRemove,
    modalDisclosure,
  }
}

export default useVariantFormEvents
