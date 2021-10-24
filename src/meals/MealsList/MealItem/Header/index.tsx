import { BoxProps } from '@chakra-ui/react'
import { MealForm } from 'meals'
import { Stat, StatsLayout } from 'stats'
import { RefObject } from 'react'
import Name from './Name'
import Menu from './Menu'
import { Stats } from 'stats'
import { ContextMenuFlex } from 'general'
import getMenuItems from './getMenuItems'

type Props = {
  mealForm: MealForm
  variantIndex: number
  index: number
  onAddIngredient: (index: number) => void
  onRemove: (index: number) => void
  onClone: (index: number) => void
  getMealNameInputRefById: (id: string) => RefObject<HTMLInputElement>
  ingredientsStatsSum: Stats
} & BoxProps

function Header({
  mealForm,
  variantIndex,
  index,
  onRemove,
  onClone,
  onAddIngredient,
  getMealNameInputRefById,
  ingredientsStatsSum,
  ...rest
}: Props) {
  const menuItems = getMenuItems({
    onAddIngredient: () => onAddIngredient(index),
    onRemove: () => onRemove(index),
    onClone: () => onClone(index),
  })

  return (
    <ContextMenuFlex
      bg="gray.50"
      py={3}
      borderTopRadius={10}
      borderBottomWidth={1}
      justifyContent="space-between"
      _hover={{ backgroundColor: 'gray.100' }}
      menuItems={menuItems}
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
        menuElement={<Menu mr={3} items={menuItems} />}
      />
    </ContextMenuFlex>
  )
}

export default Header
