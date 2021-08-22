import Stat from './Stat'
import { ArrowUpCircle, ArrowDownCircle } from 'react-feather'
import { useSameOrPreviousValue } from 'general'

type Props = {
  energy: number
  energyDiff: number
}

function EnergyStat({ energy, energyDiff }: Props) {
  const energyValueDetail = `${Math.abs(energyDiff)}kcal`
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
        energyDiff !== 0 ? energyValueDetail : previousOrSameEnergyValueDetail
      }
      valueDetailLeftIcon={
        energyDiff > 0 ? (
          <ArrowUpCircle width="15px" height="15px" />
        ) : (
          <ArrowDownCircle width="15px" height="15px" />
        )
      }
      showsValueDetail={energyDiff !== 0}
    />
  )
}

export default EnergyStat
