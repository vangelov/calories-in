import { IngredientForm } from 'ingredients'
import { Draggable } from 'react-beautiful-dnd'
import { memo } from 'react'
import { FoodInfo } from 'foods'
import { StatsLayout, Stat, AmountInput } from 'stats'
import { RightAligned } from 'layout'
import Menu from './Menu'
import { useFoods } from 'foods'
import { useScreenSize, ContextMenuFlex } from 'general'
import { Stats } from 'stats'
import PresenceAnimation from './PresenceAnimation'
import useActions from './useActions'
import getMenuItems from './getMenuItems'

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
  const menuItems = getMenuItems({ onRemove: actions.onRemoveRequest })
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
          <ContextMenuFlex
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
            menuItems={menuItems}
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
                  <AmountInput
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
          </ContextMenuFlex>
        </PresenceAnimation>
      )}
    </Draggable>
  )
}

export default memo(IngredientItem)
