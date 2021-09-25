import { Flex, useDisclosure } from '@chakra-ui/react'
import UndoRedoButtons from './UndoRedoButtons'
import MenuButtons from './MenuButtons'
import MainButtons from './MainButtons'
import { getDietForm, useDietFormActions } from 'diets'
import useKeyboard from './useKeyboard'
import { ExportModal, useImportDietForm } from 'diets/persistence'
import {
  FoodsListModal,
  MissingFoodsModal,
  useImportFoods,
} from 'foods/persistence'

function Controls() {
  const dietFormActions = useDietFormActions()
  const exportModalDisclosure = useDisclosure()
  const missingFoodsModalDisclosure = useDisclosure()
  const { onLoadFromFile } = useImportDietForm({ missingFoodsModalDisclosure })
  const foodsListModalDisclosure = useDisclosure()
  const importFoods = useImportFoods({ foodsListModalDisclosure })

  useKeyboard()

  function onClear() {
    dietFormActions.setDietForm(getDietForm())
  }

  return (
    <Flex width="100%" pt={3} alignItems="center">
      <Flex flex="4" justifyContent="space-between">
        <UndoRedoButtons />
      </Flex>

      <Flex flex="6" justifyContent="flex-end">
        <MenuButtons onImport={onLoadFromFile} onClear={onClear} />

        <MainButtons
          onMealAdd={dietFormActions.appendMealForm}
          onExport={exportModalDisclosure.onOpen}
        />

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
      </Flex>
    </Flex>
  )
}

export default Controls
