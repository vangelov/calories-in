import { BoxProps } from '@chakra-ui/react'
import { MealForm } from 'meals'
import { Stat, StatsLayout } from 'stats'
import { Stats } from 'stats'
import { Flex } from '@chakra-ui/react'
import Servings from './Servings'

type Props = {
  mealForm: MealForm
  variantIndex: number
  index: number
  ingredientsStatsSum: Stats
  onServingsChange: (value: string) => void
} & BoxProps

function Footer({
  mealForm,
  variantIndex,
  index,
  ingredientsStatsSum,
  onServingsChange,
  ...rest
}: Props) {
  return (
    <Flex py={3} justifyContent="space-between" {...rest}>
      <StatsLayout
        nameElement={
          <Flex ml={3} alignItems="center" height="100%">
            <Servings mealForm={mealForm} onChange={onServingsChange} />
          </Flex>
        }
        energyElement={
          <Stat type="mealEnergy" value={ingredientsStatsSum.energy} />
        }
        proteinElement={
          <Stat type="meal" value={ingredientsStatsSum.protein} />
        }
        carbsElement={<Stat type="meal" value={ingredientsStatsSum.carbs} />}
        fatElement={<Stat type="meal" value={ingredientsStatsSum.fat} />}
        menuElement={<div />}
      />
    </Flex>
  )
}

export default Footer
