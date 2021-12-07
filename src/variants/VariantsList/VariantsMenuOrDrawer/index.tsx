import { useScreenSize, ScreenSize } from 'general'
import Drawer from './Drawer'
import Trigger from './Trigger'
import { useDisclosure } from '@chakra-ui/hooks'
import Menu from './Menu'
import { useDietFormActions } from 'diets'
import { VariantForm } from 'variants'

type Props = {
  onVariantFormSelect: (variantForm: VariantForm, index: number) => void
}

function VariantsMenuOrDrawer({ onVariantFormSelect }: Props) {
  const screenSize = useScreenSize()
  const modalDisclosure = useDisclosure()
  const dietActions = useDietFormActions()

  function onSelect(variantForm: VariantForm, index: number) {
    dietActions.setSelectedVariantFormIndex(index)
    onVariantFormSelect(variantForm, index)
  }

  if (screenSize < ScreenSize.Medium) {
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
