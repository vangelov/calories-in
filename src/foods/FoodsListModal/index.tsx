import { Modal, ModalOverlay } from '@chakra-ui/react'
import { DEFAULT_FILTER, FoodsFilterStoreProvider } from 'foods-filters'
import Content from './Content'
import { Action } from './types'

type Props = {
  onClose: () => void
  isOpen: boolean
  action: Action
}

function FoodsListModal({ onClose, isOpen, action }: Props) {
  const title = action === 'export' ? 'Export Foods' : 'Import Foods'
  return (
    <Modal
      isOpen={isOpen}
      preserveScrollBarGap={true}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />

      <FoodsFilterStoreProvider
        initialFilter={{ ...DEFAULT_FILTER, onlyFoodsAddedbyUser: true }}
        shouldSaveFilter={false}
      >
        <Content onClose={onClose} title={title} />
      </FoodsFilterStoreProvider>
    </Modal>
  )
}

export type { Props }

export { default as useFoodsListModalDisclosure } from './useFoodsListModalDisclosure'

export default FoodsListModal
