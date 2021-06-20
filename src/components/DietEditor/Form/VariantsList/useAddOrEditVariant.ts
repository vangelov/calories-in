import { useDisclosure } from '@chakra-ui/hooks'
import { VariantsFieldArray } from 'core/dietForm'
import useAddOrEditVariantForm from 'core/dietForm/useAddOrEditVariantForm'
import { useRef } from 'react'

type Params = {
  variantsFieldArray: VariantsFieldArray
}

function useAddOrEditVariant({ variantsFieldArray }: Params) {
  const variantNameModalDisclosure = useDisclosure()
  const onModalSaveRef = useRef<(name: string) => void>(() => {})
  const addOrEditVariantForm = useAddOrEditVariantForm({ variantsFieldArray })
  const { variantsFields } = variantsFieldArray

  function onAddNew() {
    variantNameModalDisclosure.onOpen()

    onModalSaveRef.current = (name: string) => {
      variantNameModalDisclosure.onClose()
      addOrEditVariantForm.onAdd(name)
    }
  }

  function onCloneExisting(index: number) {
    variantNameModalDisclosure.onOpen()

    onModalSaveRef.current = (name: string) => {
      variantNameModalDisclosure.onClose()
      addOrEditVariantForm.onClone(name, index)
    }
  }

  function onEdit(index: number) {
    variantNameModalDisclosure.onOpen()

    onModalSaveRef.current = (name: string) => {
      variantNameModalDisclosure.onClose()
      addOrEditVariantForm.onEdit(name, index)
    }
  }

  return {
    onAddNew,
    onCloneExisting,
    onEdit,
    isModalOpen: variantNameModalDisclosure.isOpen,
    onModalClose: variantNameModalDisclosure.onClose,
    onModalSave: onModalSaveRef.current,
    existingVariantsNames: variantsFields.map(({ name }) => name as string),
  }
}

export default useAddOrEditVariant
