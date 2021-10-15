import { IngredientForm } from 'ingredients'
import { Draggable } from 'react-beautiful-dnd'
import { memo } from 'react'
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
import { EditNotesModal } from 'notes'
import useNotesEvents from './useNotesEvents'
import { Box, Text } from '@chakra-ui/react'

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

  const notesEvents = useNotesEvents({
    variantIndex,
    mealIndex,
    index,
    ingredientForm,
  })

  const { foodsById } = useFoods()
  const food = foodsById[ingredientForm.foodId]
  const foodModalDisclosure = useDisclosure()
  const editNotesModalDisclosure = useDisclosure()

  const menuItems = getMenuItems({
    onEditNotes: editNotesModalDisclosure.onOpen,
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
            borderBottomRadius={isLast ? 10 : 0}
            overflow="hidden"
            menuItems={menuItems}
          >
            {food ? (
              <StatsLayout
                ingredientForm={ingredientForm}
                ingredientStats={ingredientStats}
                onAmountChange={ingredientEvents.onAmountChange}
                menuElement={<Menu mr={3} items={menuItems} />}
                food={food}
                notes={ingredientForm.notes}
              >
                {ingredientForm.notes && (
                  <PresenceAnimation
                    shouldAnimate={notesEvents.shouldAnimateNotes}
                    isVisible={notesEvents.areNotesVisible}
                    onAnimationComplete={notesEvents.onNotesAnimationComplete}
                  >
                    <Box width="100%">
                      <Text fontSize="sm" textColor="gray.400">
                        {ingredientForm.notes}
                      </Text>
                    </Box>
                  </PresenceAnimation>
                )}
              </StatsLayout>
            ) : (
              <MissingStatsLayout
                onRemoveRequest={ingredientEvents.onRemoveRequest}
              />
            )}
          </ContextMenuFlex>

          <FoodModal
            isOpen={foodModalDisclosure.isOpen}
            onClose={foodModalDisclosure.onClose}
            onFoodCreatedOrUpdated={ingredientEvents.onFoodUpdated}
            food={food}
          />

          <EditNotesModal
            isOpen={editNotesModalDisclosure.isOpen}
            onClose={editNotesModalDisclosure.onClose}
            notes={ingredientForm.notes}
            onEditNotes={notesEvents.onEditNotes}
            fieldId={ingredientForm.fieldId}
          />
        </PresenceAnimation>
      )}
    </Draggable>
  )
}

export default memo(IngredientItem)
