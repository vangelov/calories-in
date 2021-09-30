import { IngredientForm } from 'ingredients'
import { FoodInfo, useFoods } from 'foods'
import { StatsLayout as StatsLayoutBase, Stat, AmountInput } from 'stats'
import { RightAligned } from 'layout'
import { Stats } from 'stats'
import { useScreenSize } from 'general'
import { ChangeEvent, ReactElement } from 'react'
import {
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

type Props = {
  ingredientStats: Stats
  ingredientForm: IngredientForm
  isHovered: boolean
  onAmountChange: (event: ChangeEvent<HTMLInputElement>) => void
  menuElement: ReactElement
}

function StatsLayout({
  ingredientStats,
  ingredientForm,
  onAmountChange,
  menuElement,
  isHovered,
}: Props) {
  const amountInputSize = useScreenSize() >= 2 ? 'sm' : 'md'
  const { foodsById } = useFoods()
  const food = foodsById[ingredientForm.foodId]

  const test = (
    <NumberInput size="sm" defaultValue={15} min={10} max={20}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )

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
      menuElement={menuElement}
    />
  )
}

export default StatsLayout
