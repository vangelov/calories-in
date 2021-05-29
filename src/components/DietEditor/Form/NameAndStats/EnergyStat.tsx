import { chakra } from '@chakra-ui/react'
import { Stat } from 'components/general'
import { ArrowUpCircle, ArrowDownCircle } from 'react-feather'
import { useInitialEnergyState } from 'core/stats/InitialEnergyProvider'
import { useSameOrPreviousValue } from 'core/utils'

const ArrowUpCircleStyled = chakra(ArrowUpCircle)
const ArrowDownCircleStyled = chakra(ArrowDownCircle)

type Props = {
  energy: number
  isEditingExistingDiet: boolean
}

function EnergyStat({ isEditingExistingDiet, energy }: Props) {
  const initialEnergy = useInitialEnergyState()
  const energyDelta = isEditingExistingDiet ? energy - initialEnergy.current : 0
  const energyValueDetail = `${Math.abs(energyDelta)}kcal`
  const previousOrSameEnergyValueDetail = useSameOrPreviousValue(
    energyValueDetail
  )

  return (
    <Stat
      justifyContent="flex-start"
      type="dietEnergy"
      label="Energy"
      value={energy}
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