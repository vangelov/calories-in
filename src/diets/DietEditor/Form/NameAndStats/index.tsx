import { Flex, chakra, useDisclosure } from '@chakra-ui/react'
import { Info } from 'react-feather'
import { RightAligned } from 'layout'
import Name from './Name'
import { ResponsiveIconButton } from 'general'
import { memo } from 'react'
import { useVariantStats, EnergyStat, StatsLayout, Stat } from 'stats'
import { VariantForm, VariantsDetailsModal } from 'variants'

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
    <Flex
      pb={2}
      borderBottomWidth={1}
      borderBottomColor="gray.100"
      width="100%"
    >
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
            valueDetail={`${proteinPercent}%`}
            showsValueDetail={true}
          />
        }
        carbsElement={
          <Stat
            justifyContent="flex-start"
            type="diet"
            label="Carbs"
            value={variantStats.carbs}
            valueDetail={`${carbsPercent}%`}
            showsValueDetail={true}
          />
        }
        fatElement={
          <Stat
            justifyContent="flex-start"
            type="diet"
            label="Fat"
            value={variantStats.fat}
            valueDetail={`${fatPercent}%`}
            showsValueDetail={true}
          />
        }
        menuElement={
          <RightAligned>
            <ResponsiveIconButton
              aria-label="Nutrition details"
              icon={<IntoStyled size={20} pointerEvents="none" />}
              variant="ghost"
              onClick={modalDisclosure.onOpen}
            />
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
