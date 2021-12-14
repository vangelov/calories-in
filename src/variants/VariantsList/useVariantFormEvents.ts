import { useState, useCallback } from 'react'
import { VariantForm } from 'variants'
import { useDietFormActions } from 'diets'
import { UseDisclosureReturn } from '@chakra-ui/hooks'

type Params = {
  onVariantFormSelect: (variantForm: VariantForm, index: number) => void
  onVariantFormCopy: () => void
  nameModalDisclosure: UseDisclosureReturn
  detailsModalDisclosure: UseDisclosureReturn
}

function useVariantFormEvents({
  onVariantFormSelect,
  onVariantFormCopy,
  nameModalDisclosure,
  detailsModalDisclosure,
}: Params) {
  const [variantFormIndex, setVariantFormIndex] = useState<number>(0)
  const [variantForm, setVariantForm] = useState<VariantForm>()

  const dietFormActions = useDietFormActions()

  const onRename = useCallback(
    (index: number) => {
      setVariantFormIndex(index)
      nameModalDisclosure.onOpen()
    },
    [nameModalDisclosure]
  )

  const onViewDetails = useCallback(
    (selectedVariantForm: VariantForm) => {
      setVariantForm(selectedVariantForm)
      detailsModalDisclosure.onOpen()
    },
    [detailsModalDisclosure]
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
    variantForm,
    onRemove,
    onViewDetails,
  }
}

export default useVariantFormEvents
