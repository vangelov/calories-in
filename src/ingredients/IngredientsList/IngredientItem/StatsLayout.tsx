import { IngredientForm } from 'ingredients'
import { Food, FoodInfo } from 'foods'
import { StatsLayout as StatsLayoutBase, Stat, AmountInput } from 'stats'
import { ChangeEvent, ReactElement, ReactNode } from 'react'
import { Portion, PortionsMenuOrDrawer } from 'portions'
import { Flex } from '@chakra-ui/react'

type Props = {
  energy: number
  protein: number
  carbs: number
  fat: number
  ingredientForm: IngredientForm
  onAmountChange: (event: ChangeEvent<HTMLInputElement>) => void
  onPortionChange: (portion: Portion) => void
  menuElement: ReactElement
  food: Food
  notes?: string
  children: ReactNode
}

function StatsLayout({
  energy,
  protein,
  carbs,
  fat,
  ingredientForm,
  onAmountChange,
  onPortionChange,
  menuElement,
  food,
  notes,
  children,
}: Props) {
  const acceptsFractions = ['teaspoons', 'tablespoons', 'cups'].includes(
    ingredientForm.portionId
  )

  return (
    <StatsLayoutBase
      prefersAmount={true}
      nameElement={
        <FoodInfo mx={2} food={food} notes={notes} canBeLink={true}>
          {children}
        </FoodInfo>
      }
      amountElement={
        <Flex height="100%" alignItems="center">
          <AmountInput
            ml={3}
            size="sm"
            onChange={onAmountChange}
            value={ingredientForm.amount}
            mr="-1px"
            zIndex={1}
            position="relative"
            borderTopLeftRadius={6}
            borderBottomLeftRadius={6}
            borderTopRightRadius={0}
            borderBottomRightRadius={0}
            acceptsFractions={acceptsFractions}
          >
            <PortionsMenuOrDrawer
              selectedPortionId={ingredientForm.portionId}
              onPortionChange={onPortionChange}
              food={food}
            />
          </AmountInput>
        </Flex>
      }
      energyElement={<Stat type="ingredientEnergy" value={energy} />}
      proteinElement={<Stat type="ingredient" value={protein} />}
      carbsElement={<Stat type="ingredient" value={carbs} />}
      fatElement={<Stat type="ingredient" value={fat} />}
      menuElement={menuElement}
    />
  )
}

export default StatsLayout
