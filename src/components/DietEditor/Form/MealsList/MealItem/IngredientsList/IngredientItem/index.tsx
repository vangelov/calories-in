import { Flex } from '@chakra-ui/react'
import { IngredientForm } from 'core/diets'
import { Draggable } from 'react-beautiful-dnd'
import { memo } from 'react'
import { FoodInfo } from 'components/foods'
import { FoodAmountInput } from 'components/foods'
import StatsLayout from 'components/stats/StatsLayout'
import Stat from 'components/stats/Stat'
import RightAligned from 'components/general/RightAligned'
import Menu from './Menu'
import { useFoods } from 'core/foods'
import { useScreenSize } from 'components/general/ScreenSizeProvider'
import { Stats } from 'core/stats'
import PresenceAnimation from './PresenceAnimation'
import useActions from './useActions'

type Props = {
  variantIndex: number
  mealIndex: number
  index: number
  ingredientForm: IngredientForm
  ingredientStats: Stats
  onRemove: (variantIndex: number, mealIndex: number, index: number) => void
}

function IngredientItem({
  variantIndex,
  mealIndex,
  index,
  ingredientForm,
  ingredientStats,
  onRemove,
}: Props) {
  const actions = useActions({
    variantIndex,
    mealIndex,
    index,
    onRemove,
    ingredientForm,
  })
  const amountInputSize = useScreenSize() >= 2 ? 'sm' : 'md'
  const { foodsById } = useFoods()
  const food = foodsById[ingredientForm.foodId]

  return (
    <Draggable
      key={ingredientForm.fieldId}
      draggableId={ingredientForm.fieldId as string}
      index={index}
    >
      {(provided, snapshot) => (
        <PresenceAnimation
          shouldAnimate={actions.shouldAnimate}
          onAnimationComplete={actions.onAnimationComplete}
          isVisible={actions.isVisible}
        >
          <Flex
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
            boxShadow={snapshot.isDragging ? 'lg' : undefined}
            bg={snapshot.isDragging ? 'white' : undefined}
            alignItems="center"
            position="relative"
            py={2}
            _hover={{ backgroundColor: 'gray.50' }}
          >
            <StatsLayout
              prefersAmount={true}
              nameElement={
                <FoodInfo
                  ml={3}
                  fontSize={{ base: 'sm', md: 'md' }}
                  food={food}
                />
              }
              amountElement={
                <RightAligned>
                  <FoodAmountInput
                    size={amountInputSize}
                    onChange={actions.onAmountChange}
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
              carbsElement={
                <Stat type="ingredient" value={ingredientStats.carbs} />
              }
              fatElement={
                <Stat type="ingredient" value={ingredientStats.fat} />
              }
              menuElement={<Menu mr={3} onRemove={actions.onRemoveRequest} />}
            />
          </Flex>
        </PresenceAnimation>
      )}
    </Draggable>
  )
}

export default memo(IngredientItem)
