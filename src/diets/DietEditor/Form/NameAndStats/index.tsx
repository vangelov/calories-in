import { Flex, chakra, useDisclosure } from '@chakra-ui/react'
import { Info } from 'react-feather'
import { RightAligned } from 'layout'
import Name from './Name'
import { ResponsiveIconButton } from 'general'
import { memo } from 'react'
import {
  useVariantStats,
  EnergyStat,
  StatsLayout,
  Stat,
  StatValueDetail,
} from 'stats'
import { VariantForm, VariantsDetailsModal } from 'variants'
import Tooltip from 'general/Tooltip'

const IntoStyled = chakra(Info)

type Props = {
  isEditingExistingDiet: boolean
  selectedVariantForm: VariantForm
}

function NameAndStats({ selectedVariantForm }: Props) {
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
            <Tooltip label="Meal plan details">
              <ResponsiveIconButton
                aria-label="Nutrition details"
                icon={<IntoStyled size={20} pointerEvents="none" />}
                variant="ghost"
                onClick={modalDisclosure.onOpen}
              />
            </Tooltip>
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
