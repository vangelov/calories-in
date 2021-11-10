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
import { VariantForm, VariantsDetailsModal } from 'variants'
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
  const modalDisclosure = useDisclosure()

  return (
    <Flex py={3} bg="white" width="100%">
      <StatsLayout
        nameElement={<Name />}
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
            <MenuButtons onVariantDetails={modalDisclosure.onOpen} />
          </RightAligned>
        }
      />

      <VariantsDetailsModal
        isOpen={modalDisclosure.isOpen}
        onClose={modalDisclosure.onClose}
        initialVariantForm={selectedVariantForm}
      />
    </Flex>
  )
}

export default memo(NameAndStats)
