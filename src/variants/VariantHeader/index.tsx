import { Flex, useDisclosure } from '@chakra-ui/react'
import { RightAligned } from 'layout'
import Name from './Name'
import { memo } from 'react'
import {
  useVariantStats,
  EnergyStat,
  StatsLayout,
  Stat,
  StatValueDetail,
} from 'stats'
import { VariantForm, VariantsDetailsModal, VariantsOrderModal } from 'variants'
import MenuButtons from './MenuButtons'

type Props = {
  selectedVariantForm: VariantForm
  onVariantFormSelect: (variantForm: VariantForm, index: number) => void
}

function VariantHeader({ selectedVariantForm, onVariantFormSelect }: Props) {
  const {
    variantStats,
    proteinPercent,
    carbsPercent,
    fatPercent,
    energyDiff,
  } = useVariantStats({ variantFormFieldId: selectedVariantForm.fieldId })
  const variantsDetailsModalDisclosure = useDisclosure()
  const variantsOrModalDisclosure = useDisclosure()

  return (
    <Flex py={3} bg="white" width="100%">
      <StatsLayout
        nameElement={
          <Name
            onReorder={variantsOrModalDisclosure.onOpen}
            onVariantFormSelect={onVariantFormSelect}
          />
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
              onVariantDetails={variantsDetailsModalDisclosure.onOpen}
            />
          </RightAligned>
        }
      />

      <VariantsOrderModal
        isOpen={variantsOrModalDisclosure.isOpen}
        onClose={variantsOrModalDisclosure.onClose}
      />

      <VariantsDetailsModal
        isOpen={variantsDetailsModalDisclosure.isOpen}
        onClose={variantsDetailsModalDisclosure.onClose}
        initialVariantForm={selectedVariantForm}
      />
    </Flex>
  )
}

export default memo(VariantHeader)
