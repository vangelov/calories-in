import { Flex, useDisclosure, Button } from '@chakra-ui/react'
import { UndoRedoButtons, useKeyboard } from 'undoRedo'
import { getDietForm, useDietFormActions } from 'diets'
import { useImportDietForm, ExportModal } from 'diets/persistence'
import {
  FoodsListModal,
  MissingFoodsModal,
  useImportFoods,
} from 'foods/persistence'
import { FoodsDrawer } from 'foods'
import { Trash } from 'react-feather'
import MenuOrDrawer from './MenuOrDrawer'
import Name from './Name'
import { ScreenSize, useScreenSize } from 'general'
import ExportButton from './ExportButton'

function Controls() {
  const dietFormActions = useDietFormActions()
  const exportModalDisclosure = useDisclosure()
  const missingFoodsModalDisclosure = useDisclosure()
  const { onLoadFromFile } = useImportDietForm({ missingFoodsModalDisclosure })
  const foodsListModalDisclosure = useDisclosure()
  const importFoods = useImportFoods({ foodsListModalDisclosure })
  const foodsDrawerDisclosure = useDisclosure()
  const screenSize = useScreenSize()

  useKeyboard()

  function onClear() {
    dietFormActions.setDietForm(getDietForm())
  }

  return (
    <Flex width="100%" alignItems="center">
      <Flex flex={1} mr={2}>
        <UndoRedoButtons />
      </Flex>

      <Flex flexShrink={1} justifyContent="center" flex={4}>
        <Name />
      </Flex>

      <Flex ml={2} justifyContent="flex-end" spacing={3} flex={1}>
        <MenuOrDrawer
          onImport={onLoadFromFile}
          onClear={onClear}
          onViewFoods={foodsDrawerDisclosure.onOpen}
        />

        {screenSize >= ScreenSize.Medium && (
          <Button
            leftIcon={<Trash size={16} />}
            size="md"
            onClick={onClear}
            mr={2}
          >
            Clear
          </Button>
        )}

        <ExportButton onClick={exportModalDisclosure.onOpen} />
      </Flex>

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

      <ExportModal
        isOpen={exportModalDisclosure.isOpen}
        onClose={exportModalDisclosure.onClose}
      />
    </Flex>
  )
}

export default Controls
