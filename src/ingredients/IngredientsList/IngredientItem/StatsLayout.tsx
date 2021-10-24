import { IngredientForm } from 'ingredients'
import { Food, FoodInfo } from 'foods'
import { StatsLayout as StatsLayoutBase, Stat, AmountInput } from 'stats'
import { useScreenSize, ScreenSize } from 'general'
import { ChangeEvent, ReactElement, ReactNode } from 'react'
import { PortionsMenuOrDrawer } from 'portions'

type Props = {
  energy: number
  protein: number
  carbs: number
  fat: number
  ingredientForm: IngredientForm
  onAmountChange: (event: ChangeEvent<HTMLInputElement>) => void
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
  menuElement,
  food,
  notes,
  children,
}: Props) {
  const amountInputSize = useScreenSize() >= ScreenSize.Medium ? 'sm' : 'md'

  return (
    <StatsLayoutBase
      prefersAmount={true}
      nameElement={
        <FoodInfo
          width="85%"
          ml={3}
          fontSize={{ base: 'sm', md: 'md' }}
          food={food}
          notes={notes}
        >
          {children}
        </FoodInfo>
      }
      amountElement={
        <AmountInput
          size={amountInputSize}
          onChange={onAmountChange}
          value={ingredientForm.amount}
        >
          <PortionsMenuOrDrawer
            selectedPortionId="grams"
            onPortionSelect={() => {}}
          />
        </AmountInput>
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
