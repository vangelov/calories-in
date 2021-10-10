import Stat from './Stat'
import { ArrowUpCircle, ArrowDownCircle } from 'react-feather'
import { useSameOrPreviousValue } from 'general'
import StatValueDetail from './StatValueDetail'

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
      valueDetailElement={
        energyDiff !== 0 ? (
          <StatValueDetail
            label={
              energyDiff !== 0
                ? energyValueDetail
                : previousOrSameEnergyValueDetail
            }
            tooltipLabel={'% energy from carbs'}
            leftIcon={
              energyDiff > 0 ? (
                <ArrowUpCircle width="15px" height="15px" />
              ) : (
                <ArrowDownCircle width="15px" height="15px" />
              )
            }
          />
        ) : undefined
      }
    />
  )
}

export default EnergyStat
