import { IngredientForm } from 'ingredients'
import { FoodInfo, useFoods } from 'foods'
import { StatsLayout as StatsLayoutBase, Stat, AmountInput } from 'stats'
import { RightAligned } from 'layout'
import Menu from './Menu'
import { Stats } from 'stats'
import { useScreenSize } from 'general'
import { ChangeEvent } from 'react'

type Props = {
  ingredientStats: Stats
  ingredientForm: IngredientForm
  onRemoveRequest: () => void
  onAmountChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function StatsLayout({
  ingredientStats,
  ingredientForm,
  onRemoveRequest,
  onAmountChange,
}: Props) {
  const amountInputSize = useScreenSize() >= 2 ? 'sm' : 'md'
  const { foodsById } = useFoods()
  const food = foodsById[ingredientForm.foodId]

  return (
    <StatsLayoutBase
      prefersAmount={true}
      nameElement={
        <FoodInfo ml={3} fontSize={{ base: 'sm', md: 'md' }} food={food} />
      }
      amountElement={
        <RightAligned>
          <AmountInput
            size={amountInputSize}
            onChange={onAmountChange}
            value={ingredientForm.amountInGrams}
          />
        </RightAligned>
      }
      energyElement={
        <Stat type="ingredientEnergy" value={ingredientStats.energy} />
      }
      proteinElement={
        <Stat type="ingredient" value={ingredientStats.protein} />
      }
      carbsElement={<Stat type="ingredient" value={ingredientStats.carbs} />}
      fatElement={<Stat type="ingredient" value={ingredientStats.fat} />}
      menuElement={<Menu mr={3} onRemove={onRemoveRequest} />}
    />
  )
}

export default StatsLayout
