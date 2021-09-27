import { IngredientForm } from 'ingredients'
import { Draggable } from 'react-beautiful-dnd'
import { memo, useState } from 'react'
import { FoodModal, useFoods } from 'foods'
import { ContextMenuFlex } from 'general'
import { Stats } from 'stats'
import PresenceAnimation from './PresenceAnimation'
import useIngredientsEvents from './useIngredientsEvents'
import getMenuItems from './getMenuItems'
import StatsLayout from './StatsLayout'
import MissingStatsLayout from './MissingStatsLayout'
import Menu from './Menu'
import { useDisclosure } from '@chakra-ui/hooks'

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
  const ingredientEvents = useIngredientsEvents({
    variantIndex,
    mealIndex,
    index,
    onRemove,
    ingredientForm,
  })

  const { foodsById } = useFoods()
  const food = foodsById[ingredientForm.foodId]
  const foodModalDisclosure = useDisclosure()
  const [isHovered, setIsHovered] = useState(false)

  const menuItems = getMenuItems({
    onRemove: ingredientEvents.onRemoveRequest,
    onViewFoodDetails: foodModalDisclosure.onOpen,
  })

  return (
    <Draggable
      key={ingredientForm.fieldId}
      draggableId={ingredientForm.fieldId as string}
      index={index}
    >
      {(provided, snapshot) => (
        <PresenceAnimation
          shouldAnimate={ingredientEvents.shouldAnimate}
          onAnimationComplete={ingredientEvents.onAnimationComplete}
          isVisible={ingredientEvents.isVisible}
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            borderBottomRadius={isLast ? 10 : 0}
            overflow="hidden"
            menuItems={menuItems}
          >
            {food ? (
              <StatsLayout
                isHovered={isHovered}
                ingredientForm={ingredientForm}
                ingredientStats={ingredientStats}
                onAmountChange={ingredientEvents.onAmountChange}
                menuElement={<Menu mr={3} items={menuItems} />}
              />
            ) : (
              <MissingStatsLayout
                onRemoveRequest={ingredientEvents.onRemoveRequest}
              />
            )}
          </ContextMenuFlex>

          <FoodModal
            isOpen={foodModalDisclosure.isOpen}
            onClose={foodModalDisclosure.onClose}
            food={food}
          />
        </PresenceAnimation>
      )}
    </Draggable>
  )
}

export default memo(IngredientItem)
