import { IngredientForm } from 'ingredients'
import { Draggable } from 'react-beautiful-dnd'
import { memo } from 'react'
import { FoodModal, useFoods } from 'foods'
import { ContextMenuFlex } from 'general'
import PresenceAnimation from './PresenceAnimation'
import useIngredientsEvents from './useIngredientsEvents'
import getMenuItems from './getMenuItems'
import StatsLayout from './StatsLayout'
import MissingStatsLayout from './MissingStatsLayout'
import Menu from './Menu'
import { useDisclosure } from '@chakra-ui/hooks'
import { EditNotesModal } from 'notes'
import useNotesEvents from './useNotesEvents'
import Notes from './Notes'

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

  const menuItems = getMenuItems({
    onEditNotes: editNotesModalDisclosure.onOpen,
    onRemove: ingredientEvents.onRemoveRequest,
    onViewFoodDetails: foodModalDisclosure.onOpen,
    ingredientForm,
  })

  console.log('ingredient', variantIndex, mealIndex, index)

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
            boxShadow={
              snapshot.isDragging
                ? 'rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px'
                : undefined
            }
            bg={snapshot.isDragging ? 'white' : undefined}
            alignItems="center"
            position="relative"
            py={2}
            _hover={{ backgroundColor: 'gray.50' }}
            borderBottomRadius={
              isLast && shouldAddRadiusToLastBottomBorder ? 10 : 0
            }
            overflow="hidden"
            menuItems={menuItems}
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
                menuElement={<Menu mr={3} items={menuItems} />}
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
