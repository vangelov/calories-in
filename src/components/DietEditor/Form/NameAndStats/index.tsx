import { Flex, chakra } from '@chakra-ui/react'
import StatsLayout from 'components/stats/StatsLayout'
import Stat from 'components/stats/Stat'
import { Info } from 'react-feather'
import RightAligned from 'components/general/RightAligned'
import Name from './Name'
import EnergyStat from './EnergyStat'
import ResponsiveIconButton from 'components/general/ResponsiveIconButton'
import { memo } from 'react'
import { useDerivedMealsStats } from 'core/stats'
import { VariantForm } from 'core/diets'

const IntoStyled = chakra(Info)

type Props = {
  isEditingExistingDiet: boolean
  selectedVariantForm: VariantForm
}

function NameAndStats({ isEditingExistingDiet, selectedVariantForm }: Props) {
  const {
    mealsStatsSum,
    proteinPercent,
    carbsPercent,
    fatPercent,
    energyDiff,
  } = useDerivedMealsStats({ selectedVariantForm })

  return (
    <Flex
      pb={2}
      borderBottomWidth={1}
      borderBottomColor="gray.100"
      width="100%"
    >
      <StatsLayout
        nameElement={<Name energyDiff={energyDiff} />}
        energyElement={
          <EnergyStat
            energy={mealsStatsSum.energy}
            isEditingExistingDiet={isEditingExistingDiet}
          />
        }
        proteinElement={
          <Stat
            justifyContent="flex-start"
            type="diet"
            label="Protein"
            value={mealsStatsSum.protein}
            valueDetail={`${proteinPercent}%`}
            showsValueDetail={true}
          />
        }
        carbsElement={
          <Stat
            justifyContent="flex-start"
            type="diet"
            label="Carbs"
            value={mealsStatsSum.carbs}
            valueDetail={`${carbsPercent}%`}
            showsValueDetail={true}
          />
        }
        fatElement={
          <Stat
            justifyContent="flex-start"
            type="diet"
            label="Fat"
            value={mealsStatsSum.fat}
            valueDetail={`${fatPercent}%`}
            showsValueDetail={true}
          />
        }
        menuElement={
          <RightAligned>
            <ResponsiveIconButton
              isDisabled={true}
              aria-label="Nutrition details"
              icon={<IntoStyled size={20} pointerEvents="none" />}
              variant="ghost"
            />
          </RightAligned>
        }
      />
    </Flex>
  )
}

export default memo(NameAndStats)
