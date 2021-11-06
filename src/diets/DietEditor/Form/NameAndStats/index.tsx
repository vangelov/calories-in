import { Flex, useDisclosure } from '@chakra-ui/react'
import { RightAligned } from 'layout'
import Name from './Name'
import { ScreenSize, useScreenSize } from 'general'
import { memo } from 'react'
import {
  useVariantStats,
  EnergyStat,
  StatsLayout,
  Stat,
  StatValueDetail,
} from 'stats'
import { VariantForm, VariantsDetailsModal } from 'variants'
import { UndoRedoButtons, useKeyboard } from 'undoRedo'
import { getDietForm, useDietFormActions } from 'diets'
import { useImportDietForm, ExportModal } from 'diets/persistence'
import {
  FoodsListModal,
  MissingFoodsModal,
  useImportFoods,
} from 'foods/persistence'
import { FoodsDrawer } from 'foods'
import MenuButtons from './MenuButtons'

type Props = {
  selectedVariantForm: VariantForm
  canExport: boolean
}

function NameAndStats({ selectedVariantForm, canExport }: Props) {
  const {
    variantStats,
    proteinPercent,
    carbsPercent,
    fatPercent,
    energyDiff,
  } = useVariantStats({ variantFormFieldId: selectedVariantForm.fieldId })
  const screenSize = useScreenSize()
  const modalDisclosure = useDisclosure()
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
    <Flex py={3} bg="white" width="100%">
      <StatsLayout
        nameElement={
          <Name canExport={canExport} onExport={exportModalDisclosure.onOpen} />
        }
        energyElement={
          <EnergyStat energy={variantStats.energy} energyDiff={energyDiff} />
        }
        proteinElement={
          <Stat
            justifyContent="flex-start"
            type="diet"
            label="Protein"
            value={variantStats.protein}
            valueDetailElement={
              <StatValueDetail
                label={`${proteinPercent}%`}
                tooltipLabel={'% energy from protein'}
              />
            }
          />
        }
        amountElement={
          screenSize >= ScreenSize.Medium ? (
            <Flex height="100%" alignItems="center" justifyContent="flex-start">
              <UndoRedoButtons />
            </Flex>
          ) : undefined
        }
        carbsElement={
          <Stat
            justifyContent="flex-start"
            type="diet"
            label="Carbs"
            value={variantStats.carbs}
            valueDetailElement={
              <StatValueDetail
                label={`${carbsPercent}%`}
                tooltipLabel={'% energy from carbs'}
              />
            }
          />
        }
        fatElement={
          <Stat
            justifyContent="flex-start"
            type="diet"
            label="Fat"
            value={variantStats.fat}
            valueDetailElement={
              <StatValueDetail
                label={`${fatPercent}%`}
                tooltipLabel={'% energy from fats'}
              />
            }
          />
        }
        menuElement={
          <RightAligned>
            <MenuButtons
              onVariantDetails={modalDisclosure.onOpen}
              onImport={onLoadFromFile}
              onClear={onClear}
              onViewFoods={foodsDrawerDisclosure.onOpen}
            />
          </RightAligned>
        }
      />

      <VariantsDetailsModal
        isOpen={modalDisclosure.isOpen}
        onClose={modalDisclosure.onClose}
        initialVariantForm={selectedVariantForm}
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

      <ExportModal
        isOpen={exportModalDisclosure.isOpen}
        onClose={exportModalDisclosure.onClose}
      />
    </Flex>
  )
}

export default memo(NameAndStats)
