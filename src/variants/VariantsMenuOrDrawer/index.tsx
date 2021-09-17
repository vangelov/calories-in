import { useScreenSize } from 'general'
import Drawer from './Drawer'
import Trigger from './Trigger'
import { useDisclosure } from '@chakra-ui/hooks'
import Menu from './Menu'
import { useDietFormActions } from 'diets'
import { RefObject } from 'react'
import { isSafari } from 'react-device-detect'
import { VariantForm } from 'variants'

type Props = {
  getVariantItemRefById: (field: string) => RefObject<HTMLDivElement>
  onVariantFormSelect: (variantForm: VariantForm, index: number) => void
}

function VariantsMenuOrDrawer({
  getVariantItemRefById,
  onVariantFormSelect,
}: Props) {
  const screenSize = useScreenSize()
  const modalDisclosure = useDisclosure()
  const dietActions = useDietFormActions()

  function onSelect(variantForm: VariantForm, index: number) {
    const variantRef = getVariantItemRefById(variantForm.fieldId)

    setTimeout(() => {
      variantRef.current?.scrollIntoView(
        isSafari
          ? undefined
          : {
              block: 'center',
              behavior: 'smooth',
            }
      )
    }, 200)

    dietActions.setSelectedVariantFormIndex(index)
    onVariantFormSelect(variantForm, index)
  }

  if (screenSize < 2) {
    return (
      <>
        <Trigger onClick={modalDisclosure.onOpen} />
        <Drawer
          onSelect={onSelect}
          isOpen={modalDisclosure.isOpen}
          onClose={modalDisclosure.onClose}
        />
      </>
    )
  }

  return <Menu onSelect={onSelect} />
}

export default VariantsMenuOrDrawer
