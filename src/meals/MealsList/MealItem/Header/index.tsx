import { BoxProps } from '@chakra-ui/react'
import { MealForm } from 'meals'
import { Stat, StatsLayout } from 'stats'
import { RefObject } from 'react'
import Name from './Name'
import MenuOrDrawer from './MenuOrDrawer'
import { Stats } from 'stats'
import { ContextMenuFlex } from 'general'
import getMenuOrDrawerItems from './getMenuOrDrawerItems'

type Props = {
  mealForm: MealForm
  variantIndex: number
  index: number
  onAddIngredient: () => void
  onRemove: () => void
  onClone: () => void
  onEditNotes: () => void
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
  onEditNotes,
  getMealNameInputRefById,
  ingredientsStatsSum,
  ...rest
}: Props) {
  const menuOrDrawerItems = getMenuOrDrawerItems({
    onAddIngredient,
    onRemove,
    onClone,
    onEditNotes,
    mealForm,
  })

  return (
    <ContextMenuFlex
      bg="white"
      py={3}
      borderTopRadius={10}
      justifyContent="space-between"
      _hover={{ backgroundColor: 'gray.100' }}
      menuOrDrawerItems={menuOrDrawerItems}
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
            label="Calories"
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
        menuElement={<MenuOrDrawer>{menuOrDrawerItems}</MenuOrDrawer>}
      />
    </ContextMenuFlex>
  )
}

export default Header
