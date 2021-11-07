import { Flex, useDisclosure, Button } from '@chakra-ui/react'
import { useKeyboard, UndoRedoButtons } from 'undoRedo'
import { ExportModal } from 'diets/persistence'
import {
  FoodsListModal,
  MissingFoodsModal,
  useImportFoods,
} from 'foods/persistence'
import { FoodsDrawer } from 'foods'
import { Share } from 'react-feather'

type Props = {
  canExport: boolean
}

function Controls({ canExport }: Props) {
  const exportModalDisclosure = useDisclosure()
  const missingFoodsModalDisclosure = useDisclosure()
  const foodsListModalDisclosure = useDisclosure()
  const importFoods = useImportFoods({ foodsListModalDisclosure })
  const foodsDrawerDisclosure = useDisclosure()

  useKeyboard()

  return (
    <Flex
      width="100%"
      py={3}
      alignItems="center"
      justifyContent="space-between"
    >
      <UndoRedoButtons />

      <Button
        isDisabled={!canExport}
        leftIcon={<Share size={20} pointerEvents="none" />}
        variant="solid"
        colorScheme="teal"
        onClick={exportModalDisclosure.onOpen}
        size="sm"
      >
        Export
      </Button>

      <ExportModal
        isOpen={exportModalDisclosure.isOpen}
        onClose={exportModalDisclosure.onClose}
      />

      <MissingFoodsModal
        isOpen={missingFoodsModalDisclosure.isOpen}
        onClose={missingFoodsModalDisclosure.onClose}
        onImport={importFoods.onImport}
      />

      <FoodsListModal
        isOpen={foodsListModalDisclosure.isOpen}
        onClose={foodsListModalDisclosure.onClose}
        foodsToImport={importFoods.foodsToImport}
      />

      <FoodsDrawer
        isOpen={foodsDrawerDisclosure.isOpen}
        onClose={foodsDrawerDisclosure.onClose}
        canSelect={false}
      />
    </Flex>
  )
}

export default Controls
