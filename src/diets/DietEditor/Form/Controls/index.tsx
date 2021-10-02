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
import { FoodsDrawer } from 'foods'

type Props = {
  canExport: boolean
}

function Controls({ canExport }: Props) {
  const dietFormActions = useDietFormActions()
  const exportModalDisclosure = useDisclosure()
  const missingFoodsModalDisclosure = useDisclosure()
  const { onLoadFromFile } = useImportDietForm({ missingFoodsModalDisclosure })
  const foodsListModalDisclosure = useDisclosure()
  const importFoods = useImportFoods({ foodsListModalDisclosure })
  const foodsDrawerDisclosure = useDisclosure()

  useKeyboard()

  function onClear() {
    dietFormActions.setDietForm(getDietForm())
  }

  return (
    <Flex bg="white" width="100%" py={3} alignItems="center">
      <Flex flex="4" justifyContent="space-between">
        <UndoRedoButtons />
      </Flex>

      <Flex flex="6" justifyContent="flex-end">
        <MenuButtons
          onImport={onLoadFromFile}
          onClear={onClear}
          onViewFoods={foodsDrawerDisclosure.onOpen}
        />

        <MainButtons
          onMealAdd={dietFormActions.appendMealForm}
          onExport={exportModalDisclosure.onOpen}
          canExport={canExport}
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

        <FoodsDrawer
          isOpen={foodsDrawerDisclosure.isOpen}
          onClose={foodsDrawerDisclosure.onClose}
          canSelect={false}
        />
      </Flex>
    </Flex>
  )
}

export default Controls
