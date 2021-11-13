import { Flex, useDisclosure } from '@chakra-ui/react'
import { RightAligned } from 'layout'
import Name from './Name'
import { useRef } from 'react'
import {
  useVariantStats,
  EnergyStat,
  StatsLayout,
  Stat,
  StatValueDetail,
} from 'stats'
import { VariantsDetailsModal, VariantsOrderModal } from 'variants'
import MenuButtons from './MenuButtons'
import VariantsMenuOrDrawer from './VariantsMenuOrDrawer'
import useVariantFormEvents from './useVariantFormEvents'
import { useDietForm, ScrollManager } from 'diets'

type Props = {
  scrollManager: ScrollManager
}

function SelectedVariantHeader({ scrollManager }: Props) {
  const dietForm = useDietForm()
  const { variantsForms, selectedVariantFormIndex } = dietForm
  const selectedVariantForm = variantsForms[selectedVariantFormIndex]

  const {
    variantStats,
    proteinPercent,
    carbsPercent,
    fatPercent,
    energyDiff,
  } = useVariantStats({ variantFormFieldId: selectedVariantForm.fieldId })
  const variantsDetailsModalDisclosure = useDisclosure()
  const variantsOrderModalDisclosure = useDisclosure()
  const nameInputRef = useRef<HTMLInputElement>(null)

  const variantFormEvents = useVariantFormEvents({
    nameInputRef,
    scrollManager,
    selectedVariantFormIndex,
  })

  console.log('header')

  return (
    <Flex py={3} bg="white" width="100%">
      <StatsLayout
        nameElement={
          <Flex position="relative" height="100%" alignItems="center">
            <Name
              ref={nameInputRef}
              name={selectedVariantForm.name}
              onNameChange={variantFormEvents.onNameChange}
            />
            <VariantsMenuOrDrawer
              onCreate={variantFormEvents.onCreate}
              onSelect={variantFormEvents.onSelect}
              onReorder={variantsOrderModalDisclosure.onOpen}
            />
          </Flex>
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
              onDetails={variantsDetailsModalDisclosure.onOpen}
              onCopy={variantFormEvents.onCopy}
              onRemove={variantFormEvents.onRemove}
              canRemove={variantsForms.length > 1}
            />
          </RightAligned>
        }
      />

      <VariantsOrderModal
        isOpen={variantsOrderModalDisclosure.isOpen}
        onClose={variantsOrderModalDisclosure.onClose}
      />

      <VariantsDetailsModal
        isOpen={variantsDetailsModalDisclosure.isOpen}
        onClose={variantsDetailsModalDisclosure.onClose}
        initialVariantForm={selectedVariantForm}
      />
    </Flex>
  )
}

export default SelectedVariantHeader
