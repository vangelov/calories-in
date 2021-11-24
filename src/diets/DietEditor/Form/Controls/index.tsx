import { Flex, useDisclosure, Button, IconButton } from '@chakra-ui/react'
import { UndoRedoButtons, useKeyboard } from 'undoRedo'
import { getDietForm, useDietForm, useDietFormActions } from 'diets'
import {
  useImportDietForm,
  ExportModal,
  canExportDietForm,
} from 'diets/persistence'
import {
  FoodsListModal,
  MissingFoodsModal,
  useImportFoods,
} from 'foods/persistence'
import { FoodsDrawer } from 'foods'
import { Share } from 'react-feather'
import MenuButtons from './MenuButtons'
import Name from './Name'
import { ScreenSize, useScreenSize } from 'general'

function Controls() {
  const dietForm = useDietForm()
  const dietFormActions = useDietFormActions()
  const exportModalDisclosure = useDisclosure()
  const missingFoodsModalDisclosure = useDisclosure()
  const { onLoadFromFile } = useImportDietForm({ missingFoodsModalDisclosure })
  const foodsListModalDisclosure = useDisclosure()
  const importFoods = useImportFoods({ foodsListModalDisclosure })
  const foodsDrawerDisclosure = useDisclosure()
  const canExport = canExportDietForm(dietForm)
  const screenSize = useScreenSize()

  useKeyboard()

  function onClear() {
    dietFormActions.setDietForm(getDietForm())
  }

  return (
    <Flex px={3} width="100%" alignItems="center">
      <Flex flex={1} mr={3}>
        <UndoRedoButtons />
      </Flex>

      <Flex flexShrink={1} justifyContent="center" flex={4}>
        <Name />
      </Flex>

      <Flex ml={3} justifyContent="flex-end" spacing={3} flex={1}>
        <MenuButtons
          onImport={onLoadFromFile}
          onClear={onClear}
          onViewFoods={foodsDrawerDisclosure.onOpen}
        />
        {screenSize >= ScreenSize.Medium ? (
          <Button
            isDisabled={!canExport}
            leftIcon={<Share size={16} pointerEvents="none" />}
            variant="solid"
            colorScheme="teal"
            onClick={exportModalDisclosure.onOpen}
            size="sm"
          >
            Export
          </Button>
        ) : (
          <IconButton
            aria-label="Export"
            colorScheme="teal"
            size="md"
            icon={<Share size={16} pointerEvents="none" />}
          />
        )}
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
