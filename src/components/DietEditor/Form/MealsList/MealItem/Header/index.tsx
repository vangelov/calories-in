import { BoxProps, Flex } from '@chakra-ui/react'
import { MealField } from 'core/diets'
import { useMealStats, useUpdateMealStats } from 'core/stats'
import StatsLayout from 'components/stats/StatsLayout'
import Stat from 'components/stats/Stat'
import { RefObject } from 'react'
import Name from './Name'
import Menu from './Menu'

type Props = {
  mealField: MealField
  variantIndex: number
  index: number
  onAddIngredient: (index: number) => void
  onRemove: (index: number) => void
  getMealNameInputRefById: (id: string) => RefObject<HTMLDivElement>
} & BoxProps

function Header({
  mealField,
  variantIndex,
  index,
  onRemove,
  onAddIngredient,
  getMealNameInputRefById,
  ...rest
}: Props) {
  const { mealStats } = useMealStats(variantIndex, index, mealField)

  useUpdateMealStats(index, mealStats)

  return (
    <Flex
      bg="gray.50"
      py={3}
      borderTopRadius={10}
      borderBottomWidth={1}
      justifyContent="space-between"
      _hover={{ backgroundColor: 'gray.100' }}
      {...rest}
    >
      <StatsLayout
        nameElement={
          <Name
            variantIndex={variantIndex}
            ml={3}
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
            mr={3}
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
