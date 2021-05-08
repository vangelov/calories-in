import { Flex } from '@chakra-ui/react'
import { MealField } from 'core/dietForm'
import { useMealStats, useUpdateMealStats } from 'core/stats'
import { Stat, StatsLayout } from 'components/general'
import { RefObject, useState } from 'react'
import Name from './Name'
import Menu from './Menu'

type Props = {
  mealField: MealField
  zIndex: number
  index: number
  onRemove: (index: number) => void
  getMealNameInputRefById: (id: string) => RefObject<HTMLDivElement>
}

function Header({
  mealField,
  index,
  onRemove,

  zIndex,
  getMealNameInputRefById,
}: Props) {
  const { mealStats } = useMealStats(index, mealField)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useUpdateMealStats(index, mealStats)

  const amountInGrams = mealStats.amountInGrams

  return (
    <Flex
      position="sticky"
      top="0"
      bg="gray.50"
      py={4}
      px={6}
      zIndex={isMenuOpen ? 1000 : zIndex}
      justifyContent="space-between"
      borderBottomWidth={1}
      borderBottomColor="gray.200"
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
          <Stat type="meal" label="Amount" value={`${amountInGrams}g`} />
        }
        energyElement={
          <Stat
            type="mealEnergy"
            label="Energy"
            value={`${amountInGrams * 10}kcal`}
          />
        }
        proteinElement={
          <Stat type="meal" label="Protein" value={`${amountInGrams * 2}g`} />
        }
        carbsElement={
          <Stat type="meal" label="Carbs" value={`${amountInGrams * 2.5}g`} />
        }
        fatElement={
          <Stat type="meal" label="Fat" value={`${amountInGrams * 1.5}g`} />
        }
        menuElement={
          <Menu
            mealField={mealField}
            index={index}
            onRemove={() => onRemove(index)}
            setIsMenuOpen={setIsMenuOpen}
          />
        }
      />
    </Flex>
  )
}

export default Header
