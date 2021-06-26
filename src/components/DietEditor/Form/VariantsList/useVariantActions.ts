import { useDisclosure } from '@chakra-ui/hooks'
import {
  useAppendVariantForm,
  useCloneVariantForm,
  useRenameVariantForm,
  VariantsFieldArray,
} from 'core/dietForm'
import { useRef, useState } from 'react'

type Params = {
  variantsFieldArray: VariantsFieldArray
}

function useAddOrEditVariant({ variantsFieldArray }: Params) {
  const variantNameModalDisclosure = useDisclosure()
  const onModalSaveRef = useRef<(name: string) => void>(() => {})
  const appendVariantForm = useAppendVariantForm({ variantsFieldArray })
  const cloneVariantForm = useCloneVariantForm({ variantsFieldArray })
  const renameVariantForm = useRenameVariantForm()
  const { variantsFields } = variantsFieldArray
  const [modalTitle, setModalTitle] = useState('')

  function onAppend() {
    variantNameModalDisclosure.onOpen()
    setModalTitle('Add Variant')

    onModalSaveRef.current = (name: string) => {
      variantNameModalDisclosure.onClose()
      appendVariantForm.onAppend(name)
    }
  }

  function onClone(index: number) {
    variantNameModalDisclosure.onOpen()
    const variantField = variantsFields[index]
    setModalTitle(`Clone ${variantField.name as string}`)

    onModalSaveRef.current = (name: string) => {
      variantNameModalDisclosure.onClose()
      cloneVariantForm.onClone(name, index)
    }
  }

  function onRename(index: number) {
    const variantField = variantsFields[index]
    setModalTitle(`Edit ${variantField.name as string}`)
    variantNameModalDisclosure.onOpen()

    onModalSaveRef.current = (name: string) => {
      variantNameModalDisclosure.onClose()
      renameVariantForm.onRename(name, index)
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
