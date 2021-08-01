import { BoxProps, Flex } from '@chakra-ui/react'
import { MealForm } from 'core/diets'
import StatsLayout from 'components/stats/StatsLayout'
import Stat from 'components/stats/Stat'
import { RefObject } from 'react'
import Name from './Name'
import Menu from './Menu'
import { Stats } from 'core/stats'

type Props = {
  mealForm: MealForm
  variantIndex: number
  index: number
  onAddIngredient: (index: number) => void
  onRemove: (index: number) => void
  getMealNameInputRefById: (id: string) => RefObject<HTMLInputElement>
  ingredientsStatsSum: Stats
} & BoxProps

function Header({
  mealForm,
  variantIndex,
  index,
  onRemove,
  onAddIngredient,
  getMealNameInputRefById,
  ingredientsStatsSum,
  ...rest
}: Props) {
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
            mealForm={mealForm}
            getMealNameInputRefById={getMealNameInputRefById}
            index={index}
          />
        }
        amountElement={
          <Stat
            type="meal"
            label="Amount"
            value={ingredientsStatsSum.amountInGrams}
          />
        }
        energyElement={
          <Stat
            type="mealEnergy"
            label="Energy"
            value={ingredientsStatsSum.energy}
          />
        }
        proteinElement={
          <Stat
            type="meal"
            label="Protein"
            value={ingredientsStatsSum.protein}
          />
        }
        carbsElement={
          <Stat type="meal" label="Carbs" value={ingredientsStatsSum.carbs} />
        }
        fatElement={
          <Stat type="meal" label="Fat" value={ingredientsStatsSum.fat} />
        }
        menuElement={
          <Menu
            mr={3}
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
