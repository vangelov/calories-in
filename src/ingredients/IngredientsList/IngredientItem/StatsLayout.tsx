import { IngredientForm } from 'ingredients'
import { Food, FoodInfo } from 'foods'
import { StatsLayout as StatsLayoutBase, Stat, AmountInput, Stats } from 'stats'
import { RightAligned } from 'layout'
import { useScreenSize, ScreenSize } from 'general'
import { ChangeEvent, ReactElement } from 'react'
import { Text, Box } from '@chakra-ui/react'
import PresenceAnimation from './PresenceAnimation'

type Props = {
  ingredientStats: Stats
  ingredientForm: IngredientForm
  onAmountChange: (event: ChangeEvent<HTMLInputElement>) => void
  menuElement: ReactElement
  food: Food
  notes?: string
  showsNotes?: boolean
  onNotesAnimationComplete: () => void
}

function StatsLayout({
  ingredientStats,
  ingredientForm,
  onAmountChange,
  menuElement,
  food,
  notes,
  showsNotes = true,
  onNotesAnimationComplete,
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
          <PresenceAnimation
            shouldAnimate={true}
            isVisible={showsNotes}
            onAnimationComplete={onNotesAnimationComplete}
          >
            <Box width="100%">
              <Text fontSize="sm" textColor="gray.400">
                {notes}
              </Text>
            </Box>
          </PresenceAnimation>
        </FoodInfo>
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
