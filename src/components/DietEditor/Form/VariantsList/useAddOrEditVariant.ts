import { useDisclosure } from '@chakra-ui/hooks'
import { VariantsFieldArray } from 'core/dietForm'
import useAddOrEditVariantForm from 'core/dietForm/useAddOrEditVariantForm'
import { useRef, useState } from 'react'

type Params = {
  variantsFieldArray: VariantsFieldArray
}

function useAddOrEditVariant({ variantsFieldArray }: Params) {
  const variantNameModalDisclosure = useDisclosure()
  const onModalSaveRef = useRef<(name: string) => void>(() => {})
  const addOrEditVariantForm = useAddOrEditVariantForm({ variantsFieldArray })
  const { variantsFields } = variantsFieldArray
  const [modalTitle, setModalTitle] = useState('')

  function onAddNew() {
    variantNameModalDisclosure.onOpen()
    setModalTitle('Add Variant')

    onModalSaveRef.current = (name: string) => {
      variantNameModalDisclosure.onClose()
      addOrEditVariantForm.onAdd(name)
    }
  }

  function onCloneExisting(index: number) {
    variantNameModalDisclosure.onOpen()
    const variantField = variantsFields[index]
    setModalTitle(`Clone ${variantField.name as string}`)

    onModalSaveRef.current = (name: string) => {
      variantNameModalDisclosure.onClose()
      addOrEditVariantForm.onClone(name, index)
    }
  }

  function onEdit(index: number) {
    const variantField = variantsFields[index]
    setModalTitle(`Edit ${variantField.name as string}`)
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
    modalTitle,
  }
}

export default useAddOrEditVariant
