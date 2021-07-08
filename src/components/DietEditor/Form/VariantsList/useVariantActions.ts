import { useDisclosure } from '@chakra-ui/hooks'
import {
  useVariantsFormsStoreMethods,
  useVariantsFormsStoreState,
} from 'core/diets'
import { useRef, useState } from 'react'

function useAddOrEditVariant() {
  const variantNameModalDisclosure = useDisclosure()
  const onModalSaveRef = useRef<(name: string) => void>(() => {})

  const variantsFormsStoreMethods = useVariantsFormsStoreMethods()
  const { variantsFields } = useVariantsFormsStoreState()

  const [modalTitle, setModalTitle] = useState('')

  function onAppend() {
    variantNameModalDisclosure.onOpen()
    setModalTitle('Add Variant')

    onModalSaveRef.current = (name: string) => {
      variantNameModalDisclosure.onClose()
      variantsFormsStoreMethods.appendVariantForm(name)
    }
  }

  function onClone(index: number) {
    variantNameModalDisclosure.onOpen()
    const variantField = variantsFields[index]
    setModalTitle(`Copy ${variantField.name as string}`)

    onModalSaveRef.current = (name: string) => {
      variantNameModalDisclosure.onClose()
      variantsFormsStoreMethods.cloneVariantForm(name, index)
    }
  }

  function onRename(index: number) {
    const variantField = variantsFields[index]
    setModalTitle(`Edit ${variantField.name as string}`)
    variantNameModalDisclosure.onOpen()

    onModalSaveRef.current = (name: string) => {
      variantNameModalDisclosure.onClose()
      variantsFormsStoreMethods.renameVariantForm(name, index)
    }
  }

  return {
    onAppend,
    onClone,
    onRename,
    isModalOpen: variantNameModalDisclosure.isOpen,
    onModalClose: variantNameModalDisclosure.onClose,
    onModalSave: onModalSaveRef.current,
    existingVariantsNames: variantsFields.map(({ name }) => name as string),
    modalTitle,
  }
}

export default useAddOrEditVariant
