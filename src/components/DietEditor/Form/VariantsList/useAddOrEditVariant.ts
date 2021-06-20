import { useDisclosure } from '@chakra-ui/hooks'
import { VariantsFieldArray } from 'core/dietForm'
import useAddOrEditVariantForm from 'core/dietForm/useAddOrEditVariantForm'
import { useState } from 'react'

type Params = {
  variantsFieldArray: VariantsFieldArray
}

type PendingAction = { type: 'add' } | { type: 'edit'; index: number }

function useAddOrEditVariant({ variantsFieldArray }: Params) {
  const variantNameModalDisclosure = useDisclosure()
  const [pendingAction, setPendingAction] = useState<PendingAction>()
  const addOrEditVariantForm = useAddOrEditVariantForm({ variantsFieldArray })

  function onAddNew() {
    setPendingAction({ type: 'add' })
    variantNameModalDisclosure.onOpen()
  }

  function onEdit(index: number) {
    setPendingAction({ type: 'edit', index })
    variantNameModalDisclosure.onOpen()
  }

  function onModalSave(name: string) {
    variantNameModalDisclosure.onClose()

    if (!pendingAction) {
      throw new Error()
    }

    if (pendingAction.type === 'add') {
      addOrEditVariantForm.onAdd(name)
    } else if (pendingAction.type === 'edit') {
      const { index } = pendingAction
      addOrEditVariantForm.onEdit(name, index)
    }
  }

  return {
    onAddNew,
    onEdit,
    isModalOpen: variantNameModalDisclosure.isOpen,
    onModalClose: variantNameModalDisclosure.onClose,
    onModalSave,
  }
}

export default useAddOrEditVariant
