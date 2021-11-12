import { useScreenSize, ScreenSize } from 'general'
import Drawer from './Drawer'
import Trigger from './Trigger'
import { useDisclosure } from '@chakra-ui/hooks'
import Menu from './Menu'
import { useDietFormActions } from 'diets'
import { VariantForm } from 'variants'

type Props = {
  onVariantFormSelect: (variantForm: VariantForm, index: number) => void
  onVariantFormCreate: () => void
}

function VariantsMenuOrDrawer({
  onVariantFormSelect,
  onVariantFormCreate,
}: Props) {
  const screenSize = useScreenSize()
  const modalDisclosure = useDisclosure()
  const dietActions = useDietFormActions()

  function onSelect(variantForm: VariantForm, index: number) {
    dietActions.setSelectedVariantFormIndex(index)
    onVariantFormSelect(variantForm, index)
  }

  function onCreate() {
    setTimeout(() => {
      dietActions.appendVariantForm()
      onVariantFormCreate()
    }, 200)
  }

  if (screenSize < ScreenSize.Medium) {
    return (
      <>
        <Trigger onClick={modalDisclosure.onOpen} />
        <Drawer
          onSelect={onSelect}
          onCreate={onCreate}
          isOpen={modalDisclosure.isOpen}
          onClose={modalDisclosure.onClose}
        />
      </>
    )
  }

  return <Menu onSelect={onSelect} onCreate={onCreate} />
}

export default VariantsMenuOrDrawer
