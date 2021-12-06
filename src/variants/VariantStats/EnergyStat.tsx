import { BoxProps } from '@chakra-ui/layout'
import VariantStat from './VariantStat'

type Props = {
  energy: number
  energyDiff: number
  hasAtLeastOneMeal: boolean
} & BoxProps

function getEnergyDiffDetail(energyDiff: number) {
  const sign = energyDiff > 0 ? '+' : '-'
  return `${sign}${Math.abs(energyDiff)}kcal`
}

function EnergyStat({ energy, energyDiff, hasAtLeastOneMeal, ...rest }: Props) {
  return (
    <VariantStat
      label="Calories"
      value={energy}
      detail={energyDiff !== 0 ? getEnergyDiffDetail(energyDiff) : undefined}
      type="energy"
      isDisabled={!hasAtLeastOneMeal}
      {...rest}
    />
  )
}

export default EnergyStat
