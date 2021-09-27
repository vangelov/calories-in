import { Modal, ModalOverlay, useToast } from '@chakra-ui/react'
import { Food, FoodsStoreProvider, useFoods, useFoodsActions } from 'foods'
import { DEFAULT_FILTER, FoodsFilterStoreProvider } from 'foods-filters'
import Content from './Content'

type Props = {
  onClose: () => void
  isOpen: boolean
  foodsToImport?: Food[]
}

function FoodsListModal({ onClose, isOpen, foodsToImport }: Props) {
  const title = foodsToImport ? 'Import Foods' : 'Export Foods'
  const { userFoods } = useFoods()
  const foodsActions = useFoodsActions()
  const toast = useToast()
  const foods = foodsToImport || userFoods

  function onImport() {
    if (foodsToImport) {
      foodsActions.setFoods(foodsToImport)
      toast({
        position: 'top',
        status: 'success',
        title: 'Foods imported',
        isClosable: true,
      })
      onClose()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      preserveScrollBarGap={true}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />

      <FoodsFilterStoreProvider
        initialFilter={{ ...DEFAULT_FILTER, onlyFoodsAddedByUser: true }}
        shouldSaveFilter={false}
      >
        <FoodsStoreProvider initialFoods={foods}>
          <Content
            onClose={onClose}
            title={title}
            onImport={onImport}
            action={foodsToImport ? 'import' : 'export'}
          />
        </FoodsStoreProvider>
      </FoodsFilterStoreProvider>
    </Modal>
  )
}

export type { Props }

export default FoodsListModal
