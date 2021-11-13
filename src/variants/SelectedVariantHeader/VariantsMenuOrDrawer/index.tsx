import { useScreenSize, ScreenSize } from 'general'
import Drawer from './Drawer'
import Trigger from './Trigger'
import { useDisclosure } from '@chakra-ui/hooks'
import Menu from './Menu'
import { VariantForm } from 'variants'

type Props = {
  onSelect: (variantForm: VariantForm, index: number) => void
  onCreate: () => void
  onReorder: () => void
}

function VariantsMenuOrDrawer({ onSelect, onCreate, onReorder }: Props) {
  const screenSize = useScreenSize()
  const modalDisclosure = useDisclosure()

  if (screenSize < ScreenSize.Medium) {
    return (
      <>
        <Trigger onClick={modalDisclosure.onOpen} />
        <Drawer
          onSelect={onSelect}
          onCreate={onCreate}
          onReorder={onReorder}
          isOpen={modalDisclosure.isOpen}
          onClose={modalDisclosure.onClose}
        />
      </>
    )
  }

  return <Menu onSelect={onSelect} onCreate={onCreate} onReorder={onReorder} />
}

export default VariantsMenuOrDrawer
