import { Flex, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useDietStats } from 'core/stats'
import StatsLayout from 'components/general/StatsLayout'
import { Stat } from 'components/general'
import { Info } from 'react-feather'
import RightAligned from 'components/general/RightAligned'
import Name from './Name'
import EnergyStat from './EnergyStat'
import { ResponsiveIconButton } from 'components/general'

type Props = {
  isEditingExistingDiet: boolean
}

function NameAndStats({ isEditingExistingDiet }: Props) {
  const { register } = useFormContext()
  const dietStats = useDietStats()

  return (
    <Flex
      pb={2}
      borderBottomWidth={1}
      borderBottomColor="gray.100"
      width="100%"
    >
      <Input type="hidden" {...register('formId')} />

      <StatsLayout
        nameElement={<Name />}
        energyElement={
          <EnergyStat
            energy={dietStats.energy}
            isEditingExistingDiet={isEditingExistingDiet}
          />
        }
        proteinElement={
          <Stat
            justifyContent="flex-start"
            type="diet"
            label="Protein"
            value={dietStats.protein}
            valueDetail="25%"
            showsValueDetail={true}
          />
        }
        carbsElement={
          <Stat
            justifyContent="flex-start"
            type="diet"
            label="Carbs"
            value={dietStats.carbs}
            valueDetail="55%"
            showsValueDetail={true}
          />
        }
        fatElement={
          <Stat
            justifyContent="flex-start"
            type="diet"
            label="Fat"
            value={dietStats.fat}
            valueDetail="20%"
            showsValueDetail={true}
          />
        }
        menuElement={
          <RightAligned>
            <ResponsiveIconButton
              aria-label="Nutrition details"
              icon={<Info size={20} color="gray" pointerEvents="none" />}
              variant="ghost"
            />
          </RightAligned>
        }
      />
    </Flex>
  )
}

export default NameAndStats
