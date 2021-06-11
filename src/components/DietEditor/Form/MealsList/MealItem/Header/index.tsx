import { Flex } from '@chakra-ui/react'
import { MealField } from 'core/dietForm'
import { useMealStats, useUpdateMealStats } from 'core/stats'
import { Stat, StatsLayout } from 'components/general'
import { RefObject } from 'react'
import Name from './Name'
import Menu from './Menu'

type Props = {
  mealField: MealField

  index: number
  onAddIngredient: (index: number) => void
  onRemove: (index: number) => void
  getMealNameInputRefById: (id: string) => RefObject<HTMLDivElement>
}

function Header({
  mealField,
  index,
  onRemove,
  onAddIngredient,

  getMealNameInputRefById,
}: Props) {
  const { mealStats } = useMealStats(index, mealField)

  useUpdateMealStats(index, mealStats)

  return (
    <Flex
      bg="gray.50"
      py={3}
      borderTopRadius={10}
      borderBottomWidth={1}
      justifyContent="space-between"
    >
      <StatsLayout
        nameElement={
          <Name
            mealField={mealField}
            getMealNameInputRefById={getMealNameInputRefById}
            index={index}
          />
        }
        amountElement={
          <Stat type="meal" label="Amount" value={mealStats.amountInGrams} />
        }
        energyElement={
          <Stat type="mealEnergy" label="Energy" value={mealStats.energy} />
        }
        proteinElement={
          <Stat type="meal" label="Protein" value={mealStats.protein} />
        }
        carbsElement={
          <Stat type="meal" label="Carbs" value={mealStats.carbs} />
        }
        fatElement={<Stat type="meal" label="Fat" value={mealStats.fat} />}
        menuElement={
          <Menu
            mealField={mealField}
            index={index}
            onAddIngredient={() => onAddIngredient(index)}
            onRemove={() => onRemove(index)}
          />
        }
      />
    </Flex>
  )
}

export default Header
