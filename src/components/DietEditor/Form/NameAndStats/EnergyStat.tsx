import { chakra } from '@chakra-ui/react'
import { Stat } from 'components/general'
import { ArrowUpCircle, ArrowDownCircle } from 'react-feather'
import { useInitialEnergyState } from 'core/stats/InitialEnergyProvider'
import { useSameOrPreviousValue } from 'core/utils'
import { Stats } from 'core/stats'

const ArrowUpCircleStyled = chakra(ArrowUpCircle)
const ArrowDownCircleStyled = chakra(ArrowDownCircle)

type Props = {
  dietStats: Stats
  isEditingExistingDiet: boolean
}

function EnergyStat({ isEditingExistingDiet, dietStats }: Props) {
  const initialEnergy = useInitialEnergyState()
  const amountInGrams = dietStats.amountInGrams
  const energyDelta = isEditingExistingDiet
    ? dietStats.amountInGrams * 10 - initialEnergy.current
    : 0
  const energyValueDetail = `${Math.abs(energyDelta)}kcal`
  const previousOrSameEnergyValueDetail = useSameOrPreviousValue(
    energyValueDetail
  )

  return (
    <Stat
      justifyContent="flex-start"
      type="dietEnergy"
      label="Energy"
      value={`${amountInGrams * 10}kcal`}
      valueDetail={
        energyDelta !== 0 ? energyValueDetail : previousOrSameEnergyValueDetail
      }
      valueDetailLeftIcon={
        energyDelta > 0 ? (
          <ArrowUpCircleStyled color="gray.400" width="15px" height="15px" />
        ) : (
          <ArrowDownCircleStyled color="gray.400" width="15px" height="15px" />
        )
      }
      showsValueDetail={energyDelta !== 0}
    />
  )
}

export default EnergyStat
