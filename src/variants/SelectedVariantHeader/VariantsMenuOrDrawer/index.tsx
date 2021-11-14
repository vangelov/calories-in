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
  canReorder: boolean
}

function VariantsMenuOrDrawer({
  onSelect,
  onCreate,
  onReorder,
  canReorder,
}: Props) {
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
          canReorder={canReorder}
          isOpen={modalDisclosure.isOpen}
          onClose={modalDisclosure.onClose}
        />
      </>
    )
  }

  return (
    <Menu
      canReorder={canReorder}
      onSelect={onSelect}
      onCreate={onCreate}
      onReorder={onReorder}
    />
  )
}

export default VariantsMenuOrDrawer
