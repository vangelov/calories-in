import { IngredientForm } from 'ingredients'
import { Draggable } from 'react-beautiful-dnd'
import { memo } from 'react'
import { useFoods } from 'foods'
import { ContextMenuFlex } from 'general'
import { Stats } from 'stats'
import PresenceAnimation from './PresenceAnimation'
import useActions from './useActions'
import getMenuItems from './getMenuItems'
import StatsLayout from './StatsLayout'
import MissingStatsLayout from './MissingStatsLayout'

type Props = {
  variantIndex: number
  mealIndex: number
  index: number
  ingredientForm: IngredientForm
  ingredientStats: Stats
  onRemove: (variantIndex: number, mealIndex: number, index: number) => void
  isLast: boolean
}

function IngredientItem({
  variantIndex,
  mealIndex,
  index,
  ingredientForm,
  ingredientStats,
  onRemove,
  isLast,
}: Props) {
  const actions = useActions({
    variantIndex,
    mealIndex,
    index,
    onRemove,
    ingredientForm,
  })
  const menuItems = getMenuItems({ onRemove: actions.onRemoveRequest })
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
            borderBottomRadius={isLast ? 10 : 0}
            overflow="hidden"
            menuItems={menuItems}
          >
            {food ? (
              <StatsLayout
                ingredientForm={ingredientForm}
                ingredientStats={ingredientStats}
                onRemoveRequest={actions.onRemoveRequest}
                onAmountChange={actions.onAmountChange}
              />
            ) : (
              <MissingStatsLayout onRemoveRequest={actions.onRemoveRequest} />
            )}
          </ContextMenuFlex>
        </PresenceAnimation>
      )}
    </Draggable>
  )
}

export default memo(IngredientItem)
