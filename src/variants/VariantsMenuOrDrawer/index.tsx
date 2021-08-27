import { useScreenSize } from 'general'
import Drawer from './Drawer'
import Trigger from './Trigger'
import { useDisclosure } from '@chakra-ui/hooks'
import Menu from './Menu'
import { useDietFormActions } from 'diets'

function FoodsFilterPopoverOrModal() {
  const screenSize = useScreenSize()
  const modalDisclosure = useDisclosure()
  const dietActions = useDietFormActions()

  function onSelect(index: number) {
    dietActions.updateDietForm({ selectedVariantFormIndex: index })
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

export default FoodsFilterPopoverOrModal
