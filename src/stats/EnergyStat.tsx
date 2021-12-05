import Stat, { StatProps } from './Stat'
import { ArrowUpCircle, ArrowDownCircle } from 'react-feather'
import { useSameOrPreviousValue } from 'general'
import StatValueDetail from './StatValueDetail'

type Props = {
  energy: number
  energyDiff: number
} & StatProps

function EnergyStat({ energy, energyDiff, ...rest }: Props) {
  const energyValueDetail = `${Math.abs(energyDiff)}kcal`
  const previousOrSameEnergyValueDetail = useSameOrPreviousValue(
    energyValueDetail
  )

  return (
    <Stat
      justifyContent="flex-start"
      type="dietEnergy"
      label="Calories"
      value={energy}
      valueDetailElement={
        energyDiff !== 0 ? (
          <StatValueDetail
            label={
              energyDiff !== 0
                ? energyValueDetail
                : previousOrSameEnergyValueDetail
            }
            tooltipLabel={'Energy change'}
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
      {...rest}
    />
  )
}

export default EnergyStat
