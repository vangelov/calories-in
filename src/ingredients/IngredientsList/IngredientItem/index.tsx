import { IngredientForm } from 'ingredients'
import { Draggable } from 'react-beautiful-dnd'
import { memo } from 'react'
import { FoodModal, useFoods } from 'foods'
import { ContextMenuFlex } from 'general'
import PresenceAnimation from './PresenceAnimation'
import useIngredientsEvents from './useIngredientsEvents'
import getMenuOrDrawerItems from './getMenuOrDrawerItems'
import StatsLayout from './StatsLayout'
import MissingStatsLayout from './MissingStatsLayout'
import { useDisclosure } from '@chakra-ui/react'
import { EditNotesModal } from 'notes'
import useNotesEvents from './useNotesEvents'
import Notes from './Notes'
import MenuOrDrawer from './MenuOrDrawer'

type Props = {
  variantIndex: number
  mealIndex: number
  index: number
  ingredientForm: IngredientForm
  energy: number
  protein: number
  carbs: number
  fat: number
  onRemove: (variantIndex: number, mealIndex: number, index: number) => void
  shouldAddRadiusToLastBottomBorder: boolean
  isLast: boolean
  isDraggingOver: boolean
}

function IngredientItem({
  variantIndex,
  mealIndex,
  index,
  ingredientForm,
  energy,
  protein,
  carbs,
  fat,
  onRemove,
  shouldAddRadiusToLastBottomBorder,
  isLast,
  isDraggingOver,
  ...rest
}: Props) {
  const { foodsById } = useFoods()
  const food = foodsById[ingredientForm.foodId]

  const ingredientEvents = useIngredientsEvents({
    variantIndex,
    mealIndex,
    index,
    onRemove,
    ingredientForm,
    food,
  })

  const notesEvents = useNotesEvents({
    variantIndex,
    mealIndex,
    index,
    ingredientForm,
  })

  const foodModalDisclosure = useDisclosure()
  const editNotesModalDisclosure = useDisclosure()

  const menuOrDrawerItems = getMenuOrDrawerItems({
    onEditNotes: editNotesModalDisclosure.onOpen,
    onRemove: ingredientEvents.onRemoveRequest,
    onViewFoodDetails: foodModalDisclosure.onOpen,
    ingredientForm,
  })

  // console.log('ingredient', variantIndex, mealIndex, index)

  return (
    <Draggable
      key={ingredientForm.fieldId}
      draggableId={ingredientForm.fieldId as string}
      index={index}
    >
      {(provided, { isDragging }) => (
        <PresenceAnimation
          shouldAnimate={ingredientEvents.shouldAnimate}
          onAnimationComplete={ingredientEvents.onAnimationComplete}
          isVisible={ingredientEvents.isVisible}
          isDraggingOver={isDraggingOver}
        >
          <ContextMenuFlex
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
            boxShadow={
              isDragging
                ? 'rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px'
                : undefined
            }
            bg={isDragging ? 'gray.50' : undefined}
            alignItems="center"
            position="relative"
            py={3}
            _hover={{ backgroundColor: 'gray.50' }}
            borderBottomRadius={
              !isDragging && isLast && shouldAddRadiusToLastBottomBorder
                ? 10
                : 0
            }
            overflow="hidden"
            menuOrDrawerItems={menuOrDrawerItems}
            {...rest}
          >
            {food ? (
              <StatsLayout
                ingredientForm={ingredientForm}
                energy={energy}
                protein={protein}
                carbs={carbs}
                fat={fat}
                onAmountChange={ingredientEvents.onAmountChange}
                onPortionChange={ingredientEvents.onPortionChange}
                menuElement={<MenuOrDrawer>{menuOrDrawerItems}</MenuOrDrawer>}
                food={food}
                notes={ingredientForm.notes}
              >
                {ingredientForm.notes && (
                  <Notes
                    ingredientForm={ingredientForm}
                    notesEvents={notesEvents}
                  />
                )}
              </StatsLayout>
            ) : (
              <MissingStatsLayout
                onRemoveRequest={ingredientEvents.onRemoveRequest}
              />
            )}
          </ContextMenuFlex>

          {food && (
            <FoodModal
              isOpen={foodModalDisclosure.isOpen}
              onClose={foodModalDisclosure.onClose}
              onFoodCreatedOrUpdated={ingredientEvents.onFoodUpdated}
              food={food}
            />
          )}

          {food && (
            <EditNotesModal
              isOpen={editNotesModalDisclosure.isOpen}
              onClose={editNotesModalDisclosure.onClose}
              notes={ingredientForm.notes}
              onEditNotes={notesEvents.onEditNotes}
              fieldId={ingredientForm.fieldId}
              ownerName={food.name}
            />
          )}
        </PresenceAnimation>
      )}
    </Draggable>
  )
}

export default memo(IngredientItem)
